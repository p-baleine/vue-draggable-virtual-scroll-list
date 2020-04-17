import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DraggableVirtualList<T> extends Vue {
    value: Array<T>;
    render(h: CreateElement): import("vue").VNode;
}
