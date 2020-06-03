import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class VirtualScrollListProps<T> extends Vue {
  // Properties of vue-virtual-scroll-list
  // See: https://github.com/tangbc/vue-virtual-scroll-list#props-type
  @Prop() size?: number
  @Prop() keeps!: number
  @Prop() dataKey!: keyof T
  @Prop() dataSources!: Array<T>
  @Prop() dataComponent!: Vue

  @Prop({ default: '' }) itemClass?:
    | string
    | (<Source>(source: Source) => string)
  @Prop() disabled?: boolean
  @Prop() itemHidden?: (source: T) => boolean
  @Prop({ default: 'div' }) itemTag?: string
  @Prop() extraProps?: Record<string, any>
  @Prop() disableComputeMargin?: boolean
}
