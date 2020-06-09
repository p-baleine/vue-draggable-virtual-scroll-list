import { VNode } from 'vue'

export interface DragStartEvent extends Event {
  oldIndex: number
}

export interface VirtualRange {
  start: number
}

export default class VirtualScrollListPolicy<
  Source extends { [key: string]: any }
> {
  private _draggingVNode: VNode = null
  private _draggingIndex: number
  private _draggingRealIndex: number
  private _indexMap: { [id: string]: number } = null

  private _dataKey: keyof Source
  private _dataSources: Source[]

  public get draggingVNode() {
    return this._draggingVNode
  }

  public get draggingIndex() {
    return this._draggingIndex
  }

  public get draggingRealIndex() {
    return this._draggingRealIndex
  }

  public get indexMap(): { [key: string]: number } {
    return this._indexMap
  }
  public set indexMap(value: { [key: string]: number }) {
    this._indexMap = value
  }
  public get dataKey(): keyof Source {
    return this._dataKey
  }
  public set dataKey(value: keyof Source) {
    this._dataKey = value
  }
  public get dataSources(): Source[] {
    return this._dataSources
  }
  public set dataSources(value: Source[]) {
    this._dataSources = value
  }

  public onDragStart(
    e: DragStartEvent,
    range: VirtualRange,
    slots: Array<VNode>
  ) {
    this._draggingIndex = e.oldIndex
    const relativeIndex = range.start + e.oldIndex
    this._draggingRealIndex = relativeIndex
    this._dataKey && this._indexMap
      ? this._calcRealIndex(relativeIndex)
      : relativeIndex
    this._draggingVNode = slots[e.oldIndex]
  }

  public onDragEnd() {
    this._draggingVNode = null
  }

  private _calcRealIndex(relativeIndex: number): number {
    if (this._dataSources.length <= relativeIndex) return relativeIndex
    return this._indexMap[this._dataSources[relativeIndex][this._dataKey]]
  }
}
