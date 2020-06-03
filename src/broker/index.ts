import { CreateElement, VueConstructor } from 'vue'
import { Vue, Component, Inject, Watch, Mixins } from 'vue-property-decorator'
import { Item } from '../components/Item'
import VirtualScrollListProps from '~/mixins/VirtualScrollListProps'

import VirtualScrollListPolicy, {
  DragStartEvent,
} from './virtual-scroll-list-policy'
import VirtualList from 'vue-virtual-scroll-list'
import DraggablePolicyCtor, {
  Instruction,
  instructionNames as draggableEvents,
} from './draggable-policy'

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
@Component
export default class Broker<T> extends Mixins(
  VirtualList,
  VirtualScrollListProps
) {
  // Properties of vue-virtual-scroll-list
  // See: https://github.com/tangbc/vue-virtual-scroll-list#props-type

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

  _getRenderSlots(h: CreateElement): any[] {
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
        activeSlotCount++
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
  getRenderSlots(h: CreateElement): ReturnType<CreateElement>[] {
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
}

// Returns handlers which propagate sortable's events.
