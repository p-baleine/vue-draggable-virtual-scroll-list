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

let virtualListGetRenderSlotsPatched = false

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
    if (!virtualListGetRenderSlotsPatched) {
      // このパッチをあてると、VirtualListがDraggableを子どもに持つようになる
      patchVirtualListGetRenderSlots(
        this.virtualListCtor, this.draggableCtor)
      virtualListGetRenderSlotsPatched = true
    }
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
function patchVirtualListGetRenderSlots(
  VirtualList: IVirtualList,
  Draggable: IDraggable) {
  const { getRenderSlots: original } = VirtualList.options.methods

  // TODO: VirtualList と draggable を直接いじくる
  // コンポーネントで包む必要ないのでは？どうせ汚ないことしかしていないんだし
  // 両者ともexternalにできる？？

  function patched(h: CreateElement) {
    const virtualList = this
    const slots = original.call(virtualList, h)

    // 絶対に virtualList.dataDey のフィールドは存在する
    // 且つ、それは virtualList.dataSources の中でユニークだとする
    // そうすれば、cloneのタイミングで、本物をひいてくることができるはず
    function findRealElement(targetElement: any) {
      const targetId = targetElement[virtualList.dataKey]
      const targetIndex = virtualList.dataSources.findIndex((x: any) => (
        x[virtualList.dataKey] === targetId
      ))
      const { start } = virtualList.range
      const realElement = virtualList.dataSources[start + targetIndex]
      console.log('clone called!!', targetElement, realElement)
      return realElement
    }

    return [
      h(Draggable, {
        props: {
          value: virtualList.dataSources,
          clone: findRealElement,
        },
        on: {
          change: (e: Event) => {
            if ('moved' in e) {
              onMoved.call(virtualList, e)
            } else if ('added' in e) {
              onAdded.call(virtualList, e)
            } else if ('removed' in e) {
              onRemoved.call(virtualList, e)
            }
          }
        },
        // FIXME: なんだこれ、やるならもらった attr 使え
        attrs: {
          group: 'phrase-list'
        }
      }, slots)
    ]
  }

  // 我々はDraggableがinputイベントでもらえる、今見えているDOMに基づくnewListの
  // かわりに、Draggableのchangeイベントでもらえる添字を用いて仮想リスト向けの
  // newListを作成しこれをinputイベントでemitする
  function onMoved(evt: DraggableMoveEvent) {
    const virtualList = this
    const { start } = virtualList.range
    const { oldIndex, newIndex } = evt.moved
    const newList = [...(virtualList as any).dataSources];

    newList.splice(
      start + newIndex,
      0,
      newList.splice(start + oldIndex, 1)[0]);

    this.$emit('input', newList);
  }

  function onAdded(e: any) {
    const virtualList = this
    const { start } = virtualList.range
    const { element, newIndex } = e.added
    const newList = [...(virtualList as any).dataSources];

    newList.splice(start + newIndex, 0, element);

    this.$emit('input', newList);
  }

  function onRemoved(e: any) {
    const virtualList = this
    const { start } = virtualList.range
    const { oldIndex } = e.removed
    const newList = [...(virtualList as any).dataSources];

    newList.splice(start + oldIndex, 1);

    this.$emit('input', newList);
  }

  VirtualList.options.methods.getRenderSlots = patched
}
