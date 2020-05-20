/**
 * item and slot component both use similar wrapper
 * we need to know their size change at any time.
 */
import Vue from 'vue';
export declare const Item: import("vue/types/vue").ExtendedVue<Vue, unknown, unknown, unknown, {
    event: string;
    tag: string;
    horizontal: boolean;
    source: any;
    component: any;
    uniqueKey: string;
    extraProps: any;
}>;
export declare const Slot: import("vue/types/vue").ExtendedVue<Vue, unknown, unknown, unknown, {
    event: string;
    uniqueKey: string;
    tag: string;
    horizontal: boolean;
}>;
