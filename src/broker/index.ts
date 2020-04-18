import { CreateElement } from 'vue';
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list'
import { Vue } from 'vue-property-decorator'

import Policy from './policy'

interface DraggableEvent<T> extends Event {
  moved?: {
    oldIndex: number
    newIndex: number
  }
  added?: {
    element: T
    newIndex: number
  }
  removed?: {
    element: T
    oldIndex: number
  }
}

export const draggableEvents = [
  'moved', 'added', 'removed']
export const sortableEvents = [
  'start', 'add', 'remove', 'update', 'end', 'choose',
  'unchoose', 'sort', 'filter', 'clone']

// This function will override VirtualList.options.methods.getRenderSlots.
//
// Returns the result of VirtualList.options.methods.getRenderSlots
// which would be wrapped by Draggable.
// Draggable's change events would be converted to input events and emitted.
function getRenderSlots<T extends Record<string, T>>(h: CreateElement) {
  const { getRenderSlots: original } = VirtualList.options.methods
  const slots = original.call(this, h)
  const policy = new Policy(this.dataKey, this.dataSources, this.range)

  return [
    h(Draggable, {
      props: {
        value: this.dataSources,
        // policy will find the real item from x.
        clone: (x: T) => policy.findRealItem(x),
      },
      on: {
        // Convert Draggable's change events to input events.
        change: (e: DraggableEvent<T>) => {
          if (draggableEvents.some(n => n in e)) {
            this.$emit('input', policy.updatedSources(e));
          }
        },
        // Propagate Sortable events.
        ...sortableEventHandlers(this),
      },
      attrs: this.$attrs
    }, slots)
  ]
}

// Inherits VirtualList and overrides getRenderSlots.
export default VirtualList.extend({
  methods: {
    getRenderSlots
  }
})

// Returns handlers which propagate sortable's events.
export function sortableEventHandlers(context: Vue) {
  return sortableEvents.reduce((acc, eventName) => ({
    ...acc,
    [eventName]: context.$emit.bind(context, eventName.toLowerCase())
  }), {})
}
