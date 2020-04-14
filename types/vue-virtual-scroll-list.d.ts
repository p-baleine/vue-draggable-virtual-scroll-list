declare module 'vue-virtual-scroll-list/src/index' {
  import { VueConstructor } from 'vue';

  interface VirtualList extends VueConstructor {
  }

  export default VirtualList;
  export const VirtualList: VirtualList;
}
