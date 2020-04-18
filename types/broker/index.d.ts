import { CreateElement, VueConstructor } from 'vue';
import { Vue } from 'vue-property-decorator';
import Policy from './policy';
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
export default function createBroker<T>(Draggable: IDraggable<T>, VirtualList: IVirtualList<T>, PolicyCtr: typeof Policy): import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getRenderSlots: typeof getRenderSlots;
}, unknown, Record<never, any>>;
declare function getRenderSlots<T extends Record<string, T>>(h: CreateElement): import("vue").VNode[];
export declare function sortableEventHandlers(context: Vue): {};
export {};
