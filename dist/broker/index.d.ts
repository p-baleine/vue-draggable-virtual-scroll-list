import { CreateElement, VueConstructor } from 'vue';
import { Vue } from 'vue-property-decorator';
import VirtualScrollListProps from "../mixins/VirtualScrollListProps";
import VirtualList from 'vue-virtual-scroll-list';
import type { Instruction } from "./draggable-policy";
import DraggablePolicyCtor from "./draggable-policy";
export interface IDraggable<T> extends VueConstructor {
    props: {
        value: Array<T>;
        clone: (x: T) => T;
    };
    $emit(event: 'change', e: DraggableEvent<T>): void;
    $emit(event: keyof SortableEvents, e: Event): void;
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
declare type DraggableEvent<T> = Instruction<T> & Event;
export declare function sortableEventHandlers(context: Vue): {};
declare const Broker_base: import("vue-class-component/lib/declarations").VueClass<VirtualList & VirtualScrollListProps<unknown>>;
export default class Broker<T> extends Broker_base {
    Draggable: IDraggable<T>;
    DraggablePolicy: typeof DraggablePolicyCtor;
    onDataSourcesChanged(this: any, newValue: T[], oldValue: T[]): void;
    indexMap: {
        [id: string]: number;
    };
    orgDataSources: T[];
    private range;
    private isHorizontal;
    private vlsPolicy;
    _getRenderSlots(h: CreateElement): any[];
    getRenderSlots(h: CreateElement): ReturnType<CreateElement>[];
}
export {};
//# sourceMappingURL=index.d.ts.map