declare module 'vue-virtual-scroll-list' {
  import type { CreateElement, VNode, VueConstructor } from "vue";

  export interface VirtualList extends VueConstructor {
    options: {
      methods: {
        [key: string]: any,
        getRenderSlots: (h: CreateElement) => Array<VNode>,
      }
    }
  }

  const VirtualList: VirtualList;
  export default VirtualList;
}
