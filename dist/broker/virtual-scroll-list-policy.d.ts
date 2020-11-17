import { VNode } from 'vue';
export interface DragStartEvent extends Event {
    oldIndex: number;
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
    onDragStart(e: DragStartEvent, range: VirtualRange, slots: Array<VNode>): void;
    onDragEnd(): void;
}
//# sourceMappingURL=virtual-scroll-list-policy.d.ts.map