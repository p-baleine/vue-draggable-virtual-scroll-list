
<template>
  <Broker
    v-bind="fullAttributes"
    v-on="inheritListeners"
    @input="$emit('input')"
  />
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list'
import { Component, Prop, Provide } from 'vue-property-decorator'
import VirtualScrollListProps from '~/mixins/VirtualScrollListProps'

import Broker, { sortableEventHandlers } from './broker'
import DraggablePolicy from './broker/draggable-policy'

// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
@Component({
  components: {
    Broker: Broker
  }
})
export default class DraggableVirtualList<T> extends VirtualScrollListProps<T> {
  @Prop() value!: Array<T>
  @Provide() Draggable = Draggable
  @Provide() DraggablePolicy = DraggablePolicy

  get filteredDataSources() {
    if (!this.itemHidden) return this.dataSources
    return this.dataSources.filter((data) => !this.itemHidden(data))
  }

  get indexMap() {
    if (!this.dataKey) return {}
    return this.dataSources.reduce((result, dataSource, index)=>{
      return {
        ...result,
        [dataSource[this.dataKey]]: index
      }
    },{})
  }

  get fullAttributes() {
    const {dataSources, ...rest } = this.$props
    return {
      ...this.$attrs,
      ...rest,
      dataSources: this.filteredDataSources,
      orgDataSources: dataSources,
      indexMap: this.indexMap
    }
  }

  inheritListeners = {
    ...this.$listeners,
    ...sortableEventHandlers
  }
}
</script>
