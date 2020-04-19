import { VueConstructor } from 'vue';
import { Vue } from 'vue-property-decorator';
export interface IDraggable<T> extends VueConstructor {
    props: {
        value: Array<T>;
        clone: (x: T) => T;
    };
    $emit(event: 'change', e: DraggableEvent<T>): void;
    $emit(event: keyof SortableEvents, e: Event): void;
}
export interface IVirtualList<T> extends VueConstructor {
    props: {
        size?: number;
        keeps: number;
        dataKey: string;
        dataSources: Array<T>;
        dataComponent: Vue;
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
export default function createBroker<T>(): any;
export declare function sortableEventHandlers(context: Vue): {};
