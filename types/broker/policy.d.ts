declare type InstructionName = 'moved' | 'added' | 'removed';
export default class Policy<T extends Record<string, T>> {
    private dataKey;
    private dataSources;
    private visibleRange;
    constructor(dataKey: string, dataSources: Array<T>, visibleRange: {
        start: number;
    });
    findRealItem(item: T): T;
    updatedSources(instruction: {
        [name in InstructionName]?: {
            oldIndex?: number;
            newIndex?: number;
            element?: T;
        };
    }): T[];
}
export {};
