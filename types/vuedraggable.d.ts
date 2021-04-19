declare module 'vuedraggable' {
  // Extends @types/vuedraggable
  // See https://github.com/DefinitelyTyped/DefinitelyTyped
  import { VueConstructor } from 'vue';

  export interface DraggableConstructor extends VueConstructor {
    props: any;
    data: () => any;
    watch: any;
    methods: any;
    $emit(event: string, e: Event): void;
  }

  export const draggable: DraggableConstructor;
}
