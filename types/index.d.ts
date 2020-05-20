/// <reference path="vuedraggable.d.ts" />
import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
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
    render(h: CreateElement): import("vue").VNode;
}
