declare type InstructionName = 'moved' | 'added' | 'removed';
export default class Policy<T> {
    private dataKey;
    private dataSources;
    private visibleRange;
    constructor(dataKey: string, dataSources: Array<T>, visibleRange: {
        start: number;
    });
    findRealItem(item: any): T;
    updatedSources(instruction: {
        [name in InstructionName]?: {
            oldIndex?: number;
            newIndex?: number;
            element?: any;
        };
    }): T[];
}
export {};
