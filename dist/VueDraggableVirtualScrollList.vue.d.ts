/// <reference types="types/vuedraggable" />
import VirtualScrollListProps from "./mixins/VirtualScrollListProps";
import DraggablePolicy from "./broker/draggable-policy";
export default class DraggableVirtualList<T> extends VirtualScrollListProps<T> {
    value: Array<T>;
    Draggable: import("vuedraggable").DraggableConstructor;
    DraggablePolicy: typeof DraggablePolicy;
    get filteredDatasources(): T[];
    get fullAttributes(): {
        dataSources: T[];
    };
    inheritListeners: {};
}
//# sourceMappingURL=VueDraggableVirtualScrollList.vue?rollup-plugin-vue=script.d.ts.map