import { CreateElement, VueConstructor } from 'vue';
import { Vue } from 'vue-property-decorator';

import Policy from './policy';

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

export interface IVirtualList<T> extends VueConstructor {
  props: {
    // Properties of vue-virtual-scroll-list
    // See: https://github.com/tangbc/vue-virtual-scroll-list#props-type
    size?: number;
    keeps: number;
    dataKey: string;
    dataSources: Array<T>;
    dataComponent: Vue;
  };
}

export enum SortableEvents {
  start, add, remove, update, end,
  choose, unchoose, sort, filter, clone,
}

// TODO: Move DraggableEvent to policy.ts as Instructions.
export interface DraggableEvent<T> extends Event {
  moved?: {
    oldIndex: number;
    newIndex: number;
  };
  added?: {
    element: T;
    newIndex: number;
  };
  removed?: {
    element: T;
    oldIndex: number;
  };
}

const sortableEvents = Object.values(SortableEvents)
  .filter(x => typeof x === 'string');
const draggableEvents = ['moved', 'added', 'removed'];

// Inherits VirtualList and overrides getRenderSlots.
export default function createBroker<T>(
  Draggable: IDraggable<T>,
  VirtualList: IVirtualList<T>,
  PolicyCtr: typeof Policy) {
  return VirtualList.extend({
    inject: {
      Draggable: { from: 'Draggable', default: () => Draggable },
      VirtualList: { from: 'VirtualList', default: () => VirtualList },
      Policy: { from: 'Policy', default: () => PolicyCtr },
    },
    methods: {
      getRenderSlots,
    },
  });
}

// This function will override VirtualList.options.methods.getRenderSlots.
//
// Returns the result of VirtualList.options.methods.getRenderSlots
// which would be wrapped by Draggable.
// Draggable's change events would be converted to input events and emitted.
function getRenderSlots<T extends Record<string, T>>(h: CreateElement) {
  const { Draggable, VirtualList, Policy } = this;
  const { getRenderSlots: original } = VirtualList.options.methods;
  const slots = original.call(this, h);
  const policy = new Policy(this.dataKey, this.dataSources, this.range);

  return [
    h(Draggable, {
      props: {
        value: this.dataSources,
        // policy will find the real item from x.
        clone: (x: T) => policy.findRealItem(x),
      },
      on: {
        // Convert Draggable's change events to input events.
        change: (e: DraggableEvent<T>) => {
          if (draggableEvents.some(n => n in e)) {
            this.$emit('input', policy.updatedSources(e));
          }
        },
        // Propagate Sortable events.
        ...sortableEventHandlers(this),
      },
      attrs: this.$attrs,
    }, slots),
  ];
}

// Returns handlers which propagate sortable's events.
export function sortableEventHandlers(context: Vue) {
  return sortableEvents.reduce((acc, eventName) => ({
    ...acc,
    [eventName]: context.$emit.bind(context, eventName),
  }), {});
}
