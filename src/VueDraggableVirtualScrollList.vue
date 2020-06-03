
<template>
  <Broker
    v-bind="fullAttributes"
    v-on="{...$listeners,...sortableEventHandlers}"
    @input="$emit('input')"
  />
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list'
import { Component, Prop, Provide } from 'vue-property-decorator'

import Broker, { sortableEventHandlers } from './broker'
import DraggablePolicy from './broker/draggable-policy'


// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
@Component({
  components: {
    Broker: Broker as any
  }
})
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

  get filteredDatasources() {
    if (!this.itemHidden) return this.dataSources
    return this.dataSources.filter((data) => !this.itemHidden(data))
  }

  get fullAttributes() {
    return {
      ...this.$attrs,
      ...this.$props,
      dataSources: this.filteredDatasources,
    }
  }

  sortableEventHandlers = sortableEventHandlers
}
</script>
