/**
 * props declaration for default, item and slot component.
 */
export declare const VirtualProps: {
    size: {
        type: NumberConstructor;
    };
    keeps: {
        type: NumberConstructor;
        require: boolean;
    };
    dataKey: {
        type: StringConstructor;
        require: boolean;
    };
    dataSources: {
        type: ArrayConstructor;
        require: boolean;
    };
    dataComponent: {
        type: ObjectConstructor;
        require: boolean;
    };
    extraProps: {
        type: ObjectConstructor;
    };
    rootTag: {
        type: StringConstructor;
        default: string;
    };
    wrapTag: {
        type: StringConstructor;
        default: string;
    };
    wrapClass: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    upperThreshold: {
        type: NumberConstructor;
        default: number;
    };
    lowerThreshold: {
        type: NumberConstructor;
        default: number;
    };
    start: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    itemTag: {
        type: StringConstructor;
        default: string;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    headerTag: {
        type: StringConstructor;
        default: string;
    };
    headerClass: {
        type: StringConstructor;
        default: string;
    };
    footerTag: {
        type: StringConstructor;
        default: string;
    };
    footerClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const ItemProps: {
    event: {
        type: StringConstructor;
    };
    tag: {
        type: StringConstructor;
    };
    horizontal: {
        type: BooleanConstructor;
    };
    source: {
        type: ObjectConstructor;
    };
    component: {
        type: (ObjectConstructor | FunctionConstructor)[];
    };
    uniqueKey: {
        type: StringConstructor;
    };
    extraProps: {
        type: ObjectConstructor;
    };
};
export declare const SlotProps: {
    event: {
        type: StringConstructor;
    };
    uniqueKey: {
        type: StringConstructor;
    };
    tag: {
        type: StringConstructor;
    };
    horizontal: {
        type: BooleanConstructor;
    };
};
