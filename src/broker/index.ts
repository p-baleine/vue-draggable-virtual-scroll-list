import { CreateElement, VueConstructor, VNode } from 'vue'
import { Vue, Component, Inject, Prop } from 'vue-property-decorator'

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

    @Inject() Draggable!: IDraggable<T>
    @Inject() DraggablePolicy!: typeof DraggablePolicyCtor

    private range: { start: number }
    private vlsPolicy = new VirtualScrollListPolicy()

    // Override
    //
    // Return the result of VirtualList.options.methods.getRenderSlots
    // which would be wrapped by Draggable.
    // Draggable's change events would be converted to input
    // events and emitted.
    getRenderSlots(h: CreateElement) {
      const { Draggable, DraggablePolicy } = this
      const slots = VirtualList.options.methods.getRenderSlots.call(this, h)
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
