import { VNode } from 'vue';
export interface DragStartEvent extends Event {
    oldIndex: number;
}
export interface VirtualRange {
    start: number;
}
export default class VirtualScrollListPolicy<Source extends {
    [key: string]: any;
}> {
    private _draggingVNode;
    private _draggingIndex;
    private _draggingRealIndex;
    private _indexMap;
    private _dataKey;
    private _dataSources;
    get draggingVNode(): VNode;
    get draggingIndex(): number;
    get draggingRealIndex(): number;
    get indexMap(): {
        [key: string]: number;
    };
    set indexMap(value: {
        [key: string]: number;
    });
    get dataKey(): keyof Source;
    set dataKey(value: keyof Source);
    get dataSources(): Source[];
    set dataSources(value: Source[]);
    onDragStart(e: DragStartEvent, range: VirtualRange, slots: Array<VNode>): void;
    onDragEnd(): void;
}
//# sourceMappingURL=virtual-scroll-list-policy.d.ts.map