/// <reference path="vuedraggable.d.ts" />
import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
import DraggablePolicy from './broker/draggable-policy';
export default class DraggableVirtualList<T> extends Vue {
    value: Array<T>;
    Draggable: import("vuedraggable").DraggableConstructor;
    DraggablePolicy: typeof DraggablePolicy;
    render(h: CreateElement): import("vue").VNode;
}
