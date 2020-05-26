import { CreateElement } from 'vue'
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list'
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'

import createBroker, { sortableEventHandlers } from './broker'
import DraggablePolicy from './broker/draggable-policy'

const Broker = createBroker(VirtualList)

// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
@Component
export default class DraggableVirtualList<T> extends Vue {
  @Prop() value!: Array<T>
  @Prop() size?: number
  @Prop() keeps!: number
  @Prop() dataKey!: keyof T
  @Prop() dataSources!: Array<T>
  @Prop() dataComponent!: Vue
  @Prop({ default: '' }) itemClass?:
    | string
    | (<Source>(source: Source) => string)
  @Prop() disabled?: boolean
  @Provide() Draggable = Draggable
  @Provide() DraggablePolicy = DraggablePolicy
  @Prop() itemHidden?: (source: T) => boolean
  @Prop({ default: 'div' }) itemTag?: string
  @Prop() extraProps?: Record<string, any>
  @Prop() disableComputeMargin?: boolean

  public render(h: CreateElement) {
    return h(Broker, {
      props: this.$props,
      attrs: this.$attrs,
      on: {
        // Propagate VirtualList's input event.
        input: this.$emit.bind(this, 'input'),

        // Propagate draggable.sortable's events.
        ...sortableEventHandlers(this),
      },
    })
  }
}
