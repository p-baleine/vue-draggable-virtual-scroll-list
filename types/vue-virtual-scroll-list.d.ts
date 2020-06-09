declare module 'vue-virtual-scroll-list' {
  import { CreateElement, VNode } from 'vue'

  export default class VirtualList extends Vue {
    options: {
      methods: {
        [key: string]: any
        getRenderSlots: (h: CreateElement) => Array<VNode>
      }
    }
  }
}
