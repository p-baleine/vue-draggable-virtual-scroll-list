import { CreateElement } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator'

import Broker from './broker'

// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
@Component
export default class DraggableVirtualList<T> extends Vue {
  @Prop() value!: Array<T>;

  public render(h: CreateElement) {
    return h(Broker, {
      props: this.$props,
      attrs: this.$attrs,
      on: {
        // Propagate VirtualLists' input event.
        input: this.$emit.bind(this, 'input'),
      }
    })
  }
}
