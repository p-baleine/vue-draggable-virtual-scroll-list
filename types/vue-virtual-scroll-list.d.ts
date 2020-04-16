declare module 'vue-virtual-scroll-list' {
  import { VueConstructor } from 'vue';

  interface VirtualList extends VueConstructor {
  }

  export default VirtualList;
  export const VirtualList: VirtualList;
}
