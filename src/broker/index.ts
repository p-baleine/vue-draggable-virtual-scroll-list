import { CreateElement, VueConstructor, VNode, VNodeData } from 'vue'
import { Vue, Component, Inject, Prop, Watch } from 'vue-property-decorator'
import { Item, Slot } from '../components/Item'
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

const EVENT_TYPE = {
  ITEM: 'item_resize',
  SLOT: 'slot_resize',
}

const SLOT_TYPE = {
  HEADER: 'header', // string value also use for aria role attribute.
  FOOTER: 'footer',
}

const NAME = 'virtual-list'
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

    @Prop({ default: '' }) itemClass?:
      | string
      | (<Source>(source: Source) => string)
    @Prop() disabled?: boolean
    @Prop() itemHidden?: (source: T) => boolean
    @Prop({ default: 'div' }) itemTag?: string
    @Prop() extraProps?: Record<string, any>
    @Prop() disableComputeMargin?: boolean

    @Inject() Draggable!: IDraggable<T>
    @Inject() DraggablePolicy!: typeof DraggablePolicyCtor

    @Watch('dataSources')
    onDataSourcesChanged(this: any, newValue: string, oldValue: string) {
      if (newValue.length !== oldValue.length) {
        this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources())
        this.virtual.handleDataSourcesChange()
      }
    }

    private range: {
      start: number
      end: number
    }

    private isHorizontal: boolean
    private vlsPolicy = new VirtualScrollListPolicy()

    _dataAdaptCondition(dataSource: T): boolean {
      if (!this.itemHidden) return true
      return !this.itemHidden(dataSource)
    }
    _getRenderSlots(h: CreateElement) {
      const slots = []
      const start = this.disabled ? 0 : this.range.start
      const end =
        this.disabled || this.range.end > this.dataSources.length
          ? this.dataSources.length - 1
          : this.range.end
      const sliceCount = end - start + 1
      let index = start
      let activeSlotCount = 0
      while (
        index <= this.dataSources.length - 1 &&
        activeSlotCount < sliceCount
      ) {
        const dataSource = this.dataSources[index]
        if (dataSource) {
          if (this._dataAdaptCondition(dataSource)) activeSlotCount++
          slots.push(
            h(Item, {
              class:
                typeof this.itemClass === 'function'
                  ? this.itemClass(dataSource)
                  : this.itemClass,
              props: {
                tag: this.itemTag,
                event: EVENT_TYPE.ITEM,
                horizontal: this.isHorizontal,
                uniqueKey: dataSource[this.dataKey],
                source: dataSource,
                extraProps: this.extraProps,
                component: this.dataComponent,
              },
            })
          )
        }
        index++
      }
      return slots
    }
    getRenderSlots(h: CreateElement) {
      const { Draggable, DraggablePolicy } = this
      const slots = this._getRenderSlots(h)
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

    _calcPadding(this: any) {
      if (this.disabled) return 0
      if (this.isHorizontal)
        return `0px ${this.range.padBehind}px 0px ${this.range.padFront}px`
      if (this.disableComputeMargin) return 0
      return `${this.range.padFront}px 0px ${this.range.padBehind}px`
    }
    render(this: any, h: CreateElement) {
      const { header, footer } = this.$slots
      const padding = this._calcPadding()
      return h(
        this.rootTag,
        {
          ref: 'root',
          on: {
            '&scroll': this.onScroll,
          },
        },
        [
          // header slot.
          header
            ? h(
                Slot,
                {
                  class: this.headerClass,
                  props: {
                    tag: this.headerTag,
                    event: EVENT_TYPE.SLOT,
                    uniqueKey: SLOT_TYPE.HEADER,
                  },
                },
                header
              )
            : null,

          // main list.
          h(
            this.wrapTag,
            {
              class: this.wrapClass,
              attrs: {
                role: 'group',
              },
              style: {
                padding: padding,
              },
            },
            this.getRenderSlots(h)
          ),

          // footer slot.
          footer
            ? h(
                Slot,
                {
                  class: this.footerClass,
                  props: {
                    tag: this.footerTag,
                    event: EVENT_TYPE.SLOT,
                    uniqueKey: SLOT_TYPE.FOOTER,
                  },
                },
                footer
              )
            : null,
        ]
      )
    }
  }

  return Broker
}

// Returns handlers which propagate sortable's events.
