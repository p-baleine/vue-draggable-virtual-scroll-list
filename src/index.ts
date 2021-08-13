import type { CreateElement } from 'vue';
import Draggable from 'vuedraggable';
import VirtualList from 'vue-virtual-scroll-list';
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';

import createBroker, { virtualScrollEventHandlers } from './broker';
import DraggablePolicy from './broker/draggable-policy';
import { sortableEventHandlers } from './broker';

const Broker = createBroker(VirtualList)

// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
@Component
export default class DraggableVirtualList<T> extends Vue {
  @Prop() value!: Array<T>;

  @Provide() Draggable = Draggable;
  @Provide() DraggablePolicy = DraggablePolicy;
  $refs: any
  public render(h: CreateElement) {
    return h(Broker, {
      ref: "broker",
      props: this.$props,
      attrs: this.$attrs,
      on: {
        // Propagate virtual-list's input event.
        input: this.$emit.bind(this, 'input'),
        // Propagate virtual-list's other events.
        ...virtualScrollEventHandlers(this),
        // Propagate draggable.sortable's events.
        ...sortableEventHandlers(this),
      },
    });
  }

  // Propagate virtual-list function from https://github.com/tangbc/vue-virtual-scroll-list
  public scrollToBottom() {
    this.$refs.broker?.scrollToBottom()
  }

  public scrollToIndex(index: number) {
    this.$refs.broker?.scrollToIndex(index)
  }

  public scrollToOffset(offset: number) {
    this.$refs.broker?.scrollToOffset(offset)
  }
}
