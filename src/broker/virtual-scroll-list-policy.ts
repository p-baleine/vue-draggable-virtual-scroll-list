// vuedraggable interface is different from sortablejs 
import type { MoveEvent } from 'sortablejs';
import type { VNode } from 'vue';

export interface CustomDragEvent extends MoveEvent {
  originalEvent: DragEvent;
  oldIndex: number;
  newIndex: number;
  realOldIndex: number;
  realNewIndex: number;
}

export interface VirtualRange {
  start: number;
}

export default class VirtualScrollListPolicy {
  private _draggingVNode: VNode = null;
  private _draggingIndex: number;
  private _draggingRealIndex: number;

  public get draggingVNode() {
    return this._draggingVNode;
  }

  public get draggingIndex() {
    return this._draggingIndex;
  }

  public get draggingRealIndex() {
    return this._draggingRealIndex;
  }

  public onDragStart(
    e: CustomDragEvent,
    range: VirtualRange,
    slots: Array<VNode>) {
    this._draggingIndex = e.oldIndex;
    this._draggingRealIndex = range.start + e.oldIndex;
    this._draggingVNode = slots[e.oldIndex];
  }

  public onDragEnd() {
    this._draggingVNode = null;
  }
}
