type InstructionName = 'moved' | 'added' | 'removed';

// This class is responsible for ensuring the policies between
// VirtualList and Draggable.
export default class Policy<T extends Record<string, T>> {
  constructor(
    private dataKey: string,
    private dataSources: Array<T>,
    private visibleRange: { start: number },
  ) {}

  // Find the real item from item.
  public findRealItem(item: T) {
    const idx = this.dataSources.findIndex(
      (x: T) => x[this.dataKey] === item[this.dataKey]);
    return this.dataSources[this.visibleRange.start + idx];
  }

  // Returns a new list which is created based on
  // the update `instruction`.
  public updatedSources(
    instruction: {
      [name in InstructionName]?:
      { oldIndex?: number, newIndex?: number, element?: T } }) {
    const newList = [...this.dataSources];

    if ('moved' in instruction) {
      const { oldIndex, newIndex } = instruction.moved;
      newList.splice(
        this.visibleRange.start + newIndex,
        0,
        newList.splice(this.visibleRange.start + oldIndex, 1)[0]);
    } else if ('added' in instruction) {
      const { newIndex, element } = instruction.added;
      newList.splice(this.visibleRange.start + newIndex, 0, element);
    } else if ('removed' in instruction) {
      const { oldIndex } = instruction.removed;
      newList.splice(this.visibleRange.start + oldIndex, 1);
    }

    return newList;
  }
}

