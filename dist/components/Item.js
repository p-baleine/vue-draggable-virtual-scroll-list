//@ts-nocheck
/**
 * item and slot component both use similar wrapper
 * we need to know their size change at any time.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Vue from 'vue';
import { ItemProps, SlotProps } from './props';
var Wrapper = {
    created: function () {
        this.hasInitial = false;
        this.shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight';
    },
    mounted: function () {
        var _this = this;
        // dispatch once at initial.
        this.dispatchSizeChange();
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(function () {
                // dispatch when size changed.
                if (_this.hasInitial) {
                    _this.dispatchSizeChange();
                }
                else {
                    _this.hasInitial = true;
                }
            });
            this.resizeObserver.observe(this.$el);
        }
    },
    beforeDestroy: function () {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    },
    methods: {
        getCurrentSize: function () {
            return this.$el ? this.$el[this.shapeKey] : 0;
        },
        // tell parent current size identify by unqiue key.
        dispatchSizeChange: function () {
            this.$parent.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial);
        },
    },
};
// wrapping for item.
export var Item = Vue.component('virtual-list-item', {
    mixins: [Wrapper],
    props: ItemProps,
    render: function (h) {
        return h(this.tag, {
            role: 'item',
        }, [
            h(this.component, {
                props: __assign(__assign({}, this.extraProps), { source: this.source }),
            }),
        ]);
    },
});
// wrapping for slot.
export var Slot = Vue.component('virtual-list-slot', {
    mixins: [Wrapper],
    props: SlotProps,
    render: function (h) {
        return h(this.tag, {
            attrs: {
                role: this.uniqueKey,
            },
        }, this.$slots.default);
    },
});
//# sourceMappingURL=Item.js.map