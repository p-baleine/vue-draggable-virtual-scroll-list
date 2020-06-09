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
export declare const instructionNames: string[];
export default class DraggablePolicy<T> {
    private dataKey;
    private dataSources;
    private visibleRange;
    private orgDataSources;
    private indexMap;
    constructor(dataKey: keyof T, dataSources: Array<T>, visibleRange: {
        start: number;
    }, orgDataSources: Array<T>, indexMap: {
        [key: string]: number;
    });
    findRealItem(item: T): T;
    updatedSources(instruction: Instruction<T>, draggingRealIndex: number): Array<T>;
    private _calcRealIndex;
    private _calcRealInsertIndex;
}
//# sourceMappingURL=draggable-policy.d.ts.map