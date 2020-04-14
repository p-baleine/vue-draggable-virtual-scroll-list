import { CreateElement, VNode, VueConstructor } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator'
import Draggable from 'vuedraggable'
import VirtualList from 'vue-virtual-scroll-list/src/index'

interface IVirtualList extends VueConstructor {
  options: {
    methods: {
      // See https://github.com/tangbc/vue-virtual-scroll-list/blob/v2.0.3/src/index.js#L99
      getRenderSlots(h: CreateElement): Array<VNode>;
    }
  };
  // See https://github.com/tangbc/vue-virtual-scroll-list/blob/v2.0.3/src/virtual.js#L16
  range: {
    start: number;
  }
}

interface IDraggable extends VueConstructor {
  // See https://github.com/SortableJS/Vue.Draggable/blob/v2.23.2/src/vuedraggable.js#L427
  $emit(eventName: 'change', event: DraggableMoveEvent): void;
}

interface DraggableMoveEvent extends Event {
  moved: {
    oldIndex: number;
    newIndex: number;
  }
}

// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
@Component
export default class DraggableVirtualList<T> extends Vue {
  @Prop({ default: () => Draggable }) draggableCtor!: IDraggable

  @Prop({ default: () => VirtualList }) virtualListCtor!: IVirtualList

  @Prop() keeps!: number
  @Prop() dataKey!: string
  @Prop() dataSources!: Array<T>
  @Prop() dataComponent!: VueConstructor
  @Prop() size: number

  @Prop() value!: Array<T>;

  public created() {
    // このパッチをあてると、VirtualListがDraggableを子どもに持つようになる
    patchVirtualListGetRenderSlots(
      this.virtualListCtor, this.draggableCtor, this)
  }

  public render(h: CreateElement) {
    const { keeps, dataKey, dataSources, dataComponent, size } = this

    return h(this.virtualListCtor, {
      props: {
        keeps,
        dataKey,
        dataSources,
        dataComponent,
        size,
      },
      on: {
        // Draggableのinputイベントをプロパゲートする
        input: this.$emit.bind(this, 'input'),
      }
    })
  }
}

/* FUCKING UGLY NAIVE MONKEY-PATCHINGs */

// Monkey-patch VirtualList.prototype.getRenderSlots to include Draggable.
function patchVirtualListGetRenderSlots<T>(
  VirtualList: IVirtualList,
  Draggable: IDraggable,
  context: DraggableVirtualList<T>) {
  const { getRenderSlots: original } = VirtualList.options.methods

  function patched(h: CreateElement) {
    const virtualList = this
    const slots = original.call(virtualList, h)

    return [
      h(Draggable, {
        props: {
          value: context.value,
        },
        on: {
          change: (e: Event) => {
            if (!('moved' in e)) {
              return
            }
            onMoved.call(this, e, virtualList)
          }
        }
      }, slots)
    ]
  }

  // Draggableのchange:movedイベントをinputイベントに変換する
  // VirtualListを加味した添字を元に作成したリストをinputイベントの情報としてemitする
  function onMoved(evt: DraggableMoveEvent, virtualList: IVirtualList) {
    const { start } = virtualList.range
    const { oldIndex, newIndex } = evt.moved
    const newList = [...context.value];

    newList.splice(
      start + newIndex,
      0,
      newList.splice(start + oldIndex, 1)[0]);

    this.$emit('input', newList);
  }

  VirtualList.options.methods.getRenderSlots = patched
}
