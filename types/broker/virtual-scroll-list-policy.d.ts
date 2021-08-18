import type { MoveEvent } from 'sortablejs';
import type { VNode } from 'vue';
export interface CustomDragEvent extends MoveEvent {
    oldIndex: number;
    newIndex: number;
    realOldIndex: number;
    realNewIndex: number;
}
export interface VirtualRange {
    start: number;
}
export default class VirtualScrollListPolicy {
    private _draggingVNode;
    private _draggingIndex;
    private _draggingRealIndex;
    get draggingVNode(): VNode;
    get draggingIndex(): number;
    get draggingRealIndex(): number;
    onDragStart(e: CustomDragEvent, range: VirtualRange, slots: Array<VNode>): void;
    onDragEnd(): void;
}
