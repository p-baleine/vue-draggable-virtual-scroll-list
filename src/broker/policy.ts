type InstructionName = 'moved' | 'added' | 'removed'

// VirtualListとDraggableを仲介する際の方針を表現する
export default class Policy<T> {
  constructor(
    private dataKey: string,
    private dataSources: Array<T>,
    private visibleRange: { start: number }
  ) {}

  // Draggableによってドラッグされた item の実データを返す
  public findRealItem(item: any) {
    const idx = this.dataSources.findIndex(
      (x: any) => x[this.dataKey] === item[this.dataKey])
    return this.dataSources[this.visibleRange.start + idx]
  }

  // 更新指示に従った際の、更新語のdataSourcesを新しく作って返す
  public updatedSources(
    instruction: {
      [name in InstructionName]?:
      { oldIndex?: number, newIndex?: number, element?: any } }) {
    const newList = [...this.dataSources];

    if ('moved' in instruction) {
      const { oldIndex, newIndex } = instruction.moved
      newList.splice(
        this.visibleRange.start + newIndex,
        0,
        newList.splice(this.visibleRange.start + oldIndex, 1)[0]);
    } else if ('added' in instruction) {
      const { newIndex, element } = instruction.added
      newList.splice(this.visibleRange.start + newIndex, 0, element);
    } else if ('removed' in instruction) {
      const { oldIndex } = instruction.removed
      newList.splice(this.visibleRange.start + oldIndex, 1);
    }

    return newList
  }
}

