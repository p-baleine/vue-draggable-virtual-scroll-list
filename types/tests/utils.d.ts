export declare const Item: {
    props: {
        source: {
            type: ObjectConstructor;
            default(): {};
        };
    };
    template: string;
};
export declare function generateItems(length?: number): {
    id: string;
    content: string;
}[];
export declare const name: () => string;
