import logger from '../logger';

export interface Instruction<T> {
  moved?: {
    oldIndex: number;
    newIndex: number;
  };
  added?: {
    element: T;
    newIndex: number;
  };
  removed?: {
    element: T;
    oldIndex: number;
  };
}

export const instructionNames = ['moved', 'added', 'removed'];

// This class is responsible for ensuring Draggable policies.
export default class DraggablePolicy<T> {
  constructor(
    private dataKey: keyof T,
    private dataSources: Array<T>,
    private visibleRange: { start: number },
  ) { }

  // Find the real item from item.
  public findRealItem(item: T) {
    const idx = this.dataSources.findIndex(
      (x: T) => x[this.dataKey] === item[this.dataKey]);
    return this.dataSources[this.visibleRange.start + idx];
  }

  // Returns a new list which is created based on
  // the update `instruction`.
  public updatedSources(
    instruction: Instruction<T>,
    draggingRealIndex: number) {
    const newList = [...this.dataSources];

    if ('moved' in instruction) {
      const { newIndex } = instruction.moved;
      const start = this.visibleRange.start + newIndex;
      const deleteCount = 0;
      const item = newList.splice(draggingRealIndex, 1)[0];
      logger.debug(`Move by splicing start: ${start},`
        + ` deleteCount: ${deleteCount}, item:`, item);
      newList.splice(start, deleteCount, item);
    } else if ('added' in instruction) {
      const { newIndex, element } = instruction.added;
      const start = this.visibleRange.start + newIndex;
      const deleteCount = 0;
      const item = element;
      logger.debug(`Add by splicing start: ${start},`
        + ` deleteCount: ${deleteCount}, item:`, item);
      newList.splice(start, deleteCount, item);
    } else if ('removed' in instruction) {
      const { oldIndex } = instruction.removed;
      const start = this.visibleRange.start + oldIndex;
      const deleteCount = 1;
      logger.debug(`Remove by splicing start: ${start},`
        + ` deleteCount: ${deleteCount}`);
      newList.splice(start, deleteCount);
    }

    return newList;
  }
}
