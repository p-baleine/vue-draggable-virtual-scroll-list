import { Vue } from 'vue-property-decorator';
export default class VirtualScrollListProps<T> extends Vue {
    size?: number;
    keeps: number;
    dataKey: keyof T;
    dataSources: Array<T>;
    dataComponent: Vue;
    itemClass?: string | (<Source>(source: Source) => string);
    disabled?: boolean;
    itemHidden?: (source: T) => boolean;
    itemTag?: string;
    extraProps?: Record<string, any>;
    disableComputeMargin?: boolean;
}
