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
export default class Policy<T> {
    private dataKey;
    private dataSources;
    private visibleRange;
    constructor(dataKey: keyof T, dataSources: Array<T>, visibleRange: {
        start: number;
    });
    findRealItem(item: T): T;
    updatedSources(instruction: Instruction<T>): T[];
}
