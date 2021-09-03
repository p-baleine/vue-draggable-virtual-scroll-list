import type { CreateElement, VNode, VueConstructor } from 'vue';
import { Prop, Inject, Component } from 'vue-property-decorator';
import DraggablePolicy, { Instruction, instructionNames as draggableEvents } from './draggable-policy';
import VirtualScrollListPolicy, { CustomDragEvent } from './virtual-scroll-list-policy';

export interface IDraggable<T> extends VueConstructor {
  props: {
    // Properties of vuedraggable
    // See: https://github.com/SortableJS/Vue.Draggable#props
    value: Array<T>;
    clone: (x: T) => T;
  };

  $emit(event: 'change', e: DraggableEvent<T>): void;
  $emit(event: keyof SortableEvents, e: Event): void;
}

export interface IVirtualList extends VueConstructor {
  options: {
    methods: {
      getRenderSlots(h: CreateElement): Array<VNode>,
    }
  };
}

export enum SortableEvents {
  start, add, remove, update, end,
  choose, unchoose, sort, filter, clone,
}

export enum VirtualScrollEvents {
  scroll, totop, tobottom, resized
}


type DraggableEvent<T> = Instruction<T> & Event;

const sortableEvents = Object.values(SortableEvents)
  .filter(x => typeof x === 'string');

const virtualScrollEvents = Object.values(VirtualScrollEvents)
  .filter(x => typeof x === 'string');

// A factory function which will return DraggableVirtualList constructor.
export default function createBroker(VirtualList: IVirtualList): IVirtualList {
  @Component
  class Broker<T> extends VirtualList {
    // Properties of vue-virtual-scroll-list
    // See: https://github.com/tangbc/vue-virtual-scroll-list#props-type
    @Prop() estimateSize?: number;
    @Prop() extraProps?: object;
    @Prop() move?: Function;
    @Prop() keeps!: number;
    @Prop() dataKey!: keyof T;
    @Prop() dataSources!: Array<T>;
    @Prop() dataComponent!: Vue;
    // Directly use draggable for the attrs will cause unexpected result (Whole list can be draggable)
    // so separate the draggable attributes to props
    @Prop() draggableAttrs!: object;

    @Inject() Draggable!: IDraggable<T>;
    @Inject() DraggablePolicy!: typeof DraggablePolicy;

    private range: { start: number };
    private vlsPolicy = new VirtualScrollListPolicy();
    private fromFirstChildIndex = 0;

    // Override
    //
    // Return the result of VirtualList.options.methods.getRenderSlots
    // which would be wrapped by Draggable.
    // Draggable's change events would be converted to input
    // events and emitted.
    getRenderSlots(h: CreateElement) {
      const { Draggable, DraggablePolicy } = this;
      const slots: VNode[] = VirtualList.options.methods.getRenderSlots.call(this, h);

      // Add index and class name on the slots
      slots.forEach((slot: VNode, index) => {
        slot.data.attrs = {
          'data-index': index + this.range.start
        }
        slot.data.class = ['item']
      })

      const draggablePolicy = new DraggablePolicy(
        this.dataKey, this.dataSources, this.range);

      if (this.vlsPolicy.draggingVNode) {
        // ドラッグ中の要素を vls に差し込む
        slots.splice(
          this.vlsPolicy.draggingIndex, 1, this.vlsPolicy.draggingVNode);
      }
      console.log(this.draggableAttrs)
      return [
        h(Draggable, {
          props: {
            value: this.dataSources,
            move: this.move,

            // policy will find the real item from x.
            clone: (x: T) => draggablePolicy.findRealItem(x),
          },
          on: {
            // Convert Draggable's change events to input events.
            change: (e: DraggableEvent<T>) => {
              if (draggableEvents.some(n => n in e)) {
                this.$emit('input', draggablePolicy.updatedSources(
                  e, this.vlsPolicy.draggingRealIndex));
              }
            },

            // Propagate Sortable events.
            ...sortableEventHandlers(this),

            start: (e: CustomDragEvent) => {
              this.vlsPolicy.onDragStart(e, this.range, slots);
              this.$emit('start', this.handleOnStartRealIndex(e));
            },

            end: (e: CustomDragEvent) => {
              this.vlsPolicy.onDragEnd();
              this.$emit('end', this.handleOnEndRealIndex(e));
            }
          },
          attrs: {
            ...this.$attrs,
            ...this.draggableAttrs,
          },
        }, slots),
      ];
    }

    handleOnStartRealIndex(event: CustomDragEvent) {
      const fromFirstChild = event.from?.firstElementChild as HTMLElement;
      this.fromFirstChildIndex = parseInt(fromFirstChild?.dataset?.index ?? '0');
      return event
    }

    handleOnEndRealIndex(event: CustomDragEvent) {
      const toFirstChild = event.to?.firstElementChild as HTMLElement;
      const toFirstIndex = parseInt(toFirstChild?.dataset?.index ?? '0');
      event.realOldIndex = this.fromFirstChildIndex + event.oldIndex
      event.realNewIndex = toFirstIndex + event.newIndex
      return event
    }
  }

  return Broker;
}

// Returns handlers which propagate virtual-list's events.
export function virtualScrollEventHandlers(context: Vue) {
  return virtualScrollEvents.reduce((acc, eventName) => ({
    ...acc,
    [eventName]: context.$emit.bind(context, eventName),
  }), {});
}


// Returns handlers which propagate sortable's events.
export function sortableEventHandlers(context: Vue) {
  return sortableEvents.reduce((acc, eventName) => ({
    ...acc,
    [eventName]: context.$emit.bind(context, eventName),
  }), {});
}
