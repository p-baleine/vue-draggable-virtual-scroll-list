import { CreateElement } from 'vue';
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list'

import Policy from './policy'

interface DraggableEvent extends Event {
  moved?: {
    oldIndex: number
    newIndex: number
  }
  added?: {
    element: any
    newIndex: number
  }
  removed?: {
    element: any
    oldIndex: number
  }
}

const draggableEvents = ['moved', 'added', 'removed']

// This function will override VirtualList.options.methods.getRenderSlots.
//
// VirtualList.options.methods.getRenderSlotsの返却するslotsをDraggableで
// ラップして返す。また、draggableのchangeイベントをlistenして、これをinputイベントに
// 変換してemitする。
function getRenderSlots(h: CreateElement) {
  const { getRenderSlots: original } = VirtualList.options.methods
  const slots = original.call(this, h)
  const policy = new Policy(this.dataKey, this.dataSources, this.range)

  return [
    h(Draggable, {
      props: {
        value: this.dataSources,
        clone: (x: any) => policy.findRealItem(x),
      },
      on: {
        change: (e: DraggableEvent) => {
          if (draggableEvents.some(n => n in e)) {
            this.$emit('input', policy.updatedSources(e));
          }
        }
      },
      attrs: this.$attrs
    }, slots)
  ]
}

export default VirtualList.extend({
  methods: {
    getRenderSlots
  }
})
