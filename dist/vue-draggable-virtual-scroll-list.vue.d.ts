/// <reference path="types/vuedraggable.d.ts" />
import { Vue } from 'vue-property-decorator';
import { sortableEventHandlers } from './broker';
import DraggablePolicy from './broker/draggable-policy';
export default class DraggableVirtualList<T> extends Vue {
    value: Array<T>;
    size?: number;
    keeps: number;
    dataKey: keyof T;
    dataSources: Array<T>;
    dataComponent: Vue;
    itemClass?: string | (<Source>(source: Source) => string);
    disabled?: boolean;
    Draggable: import("vuedraggable").DraggableConstructor;
    DraggablePolicy: typeof DraggablePolicy;
    itemHidden?: (source: T) => boolean;
    itemTag?: string;
    extraProps?: Record<string, any>;
    disableComputeMargin?: boolean;
    get filteredDatasources(): T[];
    get fullAttributes(): {
        dataSources: T[];
    };
    sortableEventHandlers: typeof sortableEventHandlers;
}
