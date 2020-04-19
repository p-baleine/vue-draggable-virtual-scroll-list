import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
import Policy from './broker/policy';
export default class DraggableVirtualList<T> extends Vue {
    value: Array<T>;
    Policy: typeof Policy;
    render(h: CreateElement): import("vue").VNode;
}
