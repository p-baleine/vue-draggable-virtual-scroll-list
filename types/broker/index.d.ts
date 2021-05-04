import { CreateElement, VueConstructor, VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import { Instruction } from './draggable-policy';
export interface IDraggable<T> extends VueConstructor {
  props: {
    value: Array<T>;
    clone: (x: T) => T;
  };
  $emit(event: 'change', e: DraggableEvent<T>): void;
  $emit(event: keyof SortableEvents, e: Event): void;
}
export interface IVirtualList extends VueConstructor {
  options: {
    methods: {
      getRenderSlots(h: CreateElement): Array<VNode>;
    };
  };
}
export declare enum SortableEvents {
  start = 0,
  add = 1,
  remove = 2,
  update = 3,
  end = 4,
  choose = 5,
  unchoose = 6,
  sort = 7,
  filter = 8,
  clone = 9
}
export declare enum VirtualScrollEvents {
  scroll = 0,
  totop = 1,
  tobottom = 2,
  resized = 3
}
declare type DraggableEvent<T> = Instruction<T> & Event;
export default function createBroker(VirtualList: IVirtualList): IVirtualList;
export declare function virtualScrollEventHandlers(context: Vue): {};
export declare function sortableEventHandlers(context: Vue): {};
export { };
