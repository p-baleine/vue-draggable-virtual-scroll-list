import { CreateElement, VNode, VueConstructor } from 'vue';
import { Vue } from 'vue-property-decorator';
interface IVirtualList extends VueConstructor {
    options: {
        methods: {
            getRenderSlots(h: CreateElement): Array<VNode>;
        };
    };
    range: {
        start: number;
    };
}
interface IDraggable extends VueConstructor {
    $emit(eventName: 'change', event: DraggableMoveEvent): void;
}
interface DraggableMoveEvent extends Event {
    moved: {
        oldIndex: number;
        newIndex: number;
    };
}
export default class DraggableVirtualList<T> extends Vue {
    draggableCtor: IDraggable;
    virtualListCtor: IVirtualList;
    value: Array<T>;
    created(): void;
    render(h: CreateElement): VNode;
}
export {};
