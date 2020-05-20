import { CreateElement, VueConstructor, VNode, VNodeData } from 'vue'
import { Vue, Component, Inject, Prop, Watch } from 'vue-property-decorator'

import logger from '../logger'
import DraggablePolicyCtor, {
  Instruction,
  instructionNames as draggableEvents,
} from './draggable-policy'
import VirtualScrollListPolicy, {
  DragStartEvent,
} from './virtual-scroll-list-policy'

export interface IDraggable<T> extends VueConstructor {
  props: {
    // Properties of vuedraggable
    // See: https://github.com/SortableJS/Vue.Draggable#props
    value: Array<T>
    clone: (x: T) => T
  }

  $emit(event: 'change', e: DraggableEvent<T>): void
  $emit(event: keyof SortableEvents, e: Event): void
}

export interface IVirtualList extends VueConstructor {
  options: {
    methods: {
      getRenderSlots(h: CreateElement): Array<VNode>
    }
  }
}

export enum SortableEvents {
  start,
  add,
  remove,
  update,
  end,
  choose,
  unchoose,
  sort,
  filter,
  clone,
}

type DraggableEvent<T> = Instruction<T> & Event

const sortableEvents = Object.values(SortableEvents).filter(
  (x) => typeof x === 'string'
)

export function sortableEventHandlers(context: Vue) {
  return sortableEvents.reduce(
    (acc, eventName) => ({
      ...acc,
      [eventName]: context.$emit.bind(context, eventName),
    }),
    {}
  )
}

// A fuctory function which will return DraggableVirtualList constructor.
export default function createBroker(VirtualList: IVirtualList): IVirtualList {
  @Component
  class Broker<T> extends VirtualList {
    // Properties of vue-virtual-scroll-list
    // See: https://github.com/tangbc/vue-virtual-scroll-list#props-type
    @Prop() size?: number
    @Prop() keeps!: number
    @Prop() dataKey!: keyof T
    @Prop() dataSources!: Array<T>
    @Prop() dataComponent!: Vue

    @Prop() itemClass?: string | (<Source>(source: Source) => string)

    @Inject() Draggable!: IDraggable<T>
    @Inject() DraggablePolicy!: typeof DraggablePolicyCtor

    @Watch('dataSources')
    onDataSourcesChanged(this: any,newValue: string, oldValue: string) {
      debugger
      if (newValue.length !== oldValue.length) {
        this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources())
        this.virtual.handleDataSourcesChange()
      }
    }

    private range: { start: number }
    private vlsPolicy = new VirtualScrollListPolicy()

    getRenderSlots(h: CreateElement) {
      const { Draggable, DraggablePolicy } = this
      const _ext_h = (tag: string, vNodeData: VNodeData): VNode => {
        return h(tag, {
          ...vNodeData,
          class: typeof this.itemClass === 'function' ? this.itemClass(vNodeData.props.source) : this.itemClass
        })
      }
      const slots = VirtualList.options.methods.getRenderSlots.call(this, _ext_h)
      const draggablePolicy = new DraggablePolicy(
        this.dataKey,
        this.dataSources,
        this.range
      )

      if (this.vlsPolicy.draggingVNode) {
        // ドラッグ中の要素を vls に差し込む
        slots.splice(
          this.vlsPolicy.draggingIndex,
          1,
          this.vlsPolicy.draggingVNode
        )
      }
      return [
        h(
          Draggable,
          {
            props: {
              value: this.dataSources,
              // policy will find the real item from x.
              clone: (x: T) => draggablePolicy.findRealItem(x),
            },
            on: {
              // Convert Draggable's change events to input events.
              change: (e: DraggableEvent<T>) => {
                if (draggableEvents.some((n) => n in e)) {
                  this.$emit(
                    'input',
                    draggablePolicy.updatedSources(
                      e,
                      this.vlsPolicy.draggingRealIndex
                    )
                  )
                }
              },

              // Propagate Sortable events.
              ...sortableEventHandlers(this),

              start: (e: DragStartEvent) => {
                this.vlsPolicy.onDragStart(e, this.range, slots)
                this.$emit('start', e)
              },

              end: (e: Event) => {
                this.vlsPolicy.onDragEnd()
                this.$emit('end', e)
              },
            },
            attrs: this.$attrs,
          },
          slots
        ),
      ]
    }
  }

  return Broker
}

// Returns handlers which propagate sortable's events.
