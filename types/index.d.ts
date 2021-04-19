import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
import DraggablePolicy from './broker/draggable-policy';
export default class DraggableVirtualList<T> extends Vue {
    value: Array<T>;
    Draggable: import("vue").VueConstructor<{
        options: any;
        list: any[];
        value: any[];
        noTransitionOnDrag?: boolean;
        clone: any;
        tag?: string;
        move: any;
        componentData: any;
    } & Vue>;
    DraggablePolicy: typeof DraggablePolicy;
    $refs: any;
    render(h: CreateElement): import("vue").VNode;
    scrollToBottom(): void;
    scrollToIndex(index: number): void;
    scrollToOffset(offset: number): void;
}
