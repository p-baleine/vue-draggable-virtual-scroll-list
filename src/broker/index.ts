import { CreateElement } from 'vue';
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list'
import { Vue } from 'vue-property-decorator'

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

export const draggableEvents = [
  'moved', 'added', 'removed']
export const sortableEvents = [
  'start', 'add', 'remove', 'update', 'end', 'choose',
  'unchoose', 'sort', 'filter', 'clone']

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
        },
        ...sortableEventHandlers(this),
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

// createElement の引数向けに、sortableのイベントを伝播するハンドラ群を返す
export function sortableEventHandlers(context: Vue) {
  return sortableEvents.reduce((acc, eventName) => ({
    ...acc,
    [eventName]: context.$emit.bind(context, eventName.toLowerCase())
  }), {})
}
