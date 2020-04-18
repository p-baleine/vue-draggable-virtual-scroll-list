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
import Draggable from 'vuedraggable';
import VirtualList from 'vue-virtual-scroll-list';
import Policy from './policy';
export var draggableEvents = [
    'moved', 'added', 'removed'
];
export var sortableEvents = [
    'start', 'add', 'remove', 'update', 'end', 'choose',
    'unchoose', 'sort', 'filter', 'clone'
];
// This function will override VirtualList.options.methods.getRenderSlots.
//
// Returns the result of VirtualList.options.methods.getRenderSlots
// which would be wrapped by Draggable.
// Draggable's change events would be converted to input events and emitted.
function getRenderSlots(h) {
    var _this = this;
    var original = VirtualList.options.methods.getRenderSlots;
    var slots = original.call(this, h);
    var policy = new Policy(this.dataKey, this.dataSources, this.range);
    return [
        h(Draggable, {
            props: {
                value: this.dataSources,
                // policy will find the real item from x.
                clone: function (x) { return policy.findRealItem(x); },
            },
            on: __assign({ 
                // Convert Draggable's change events to input events.
                change: function (e) {
                    if (draggableEvents.some(function (n) { return n in e; })) {
                        _this.$emit('input', policy.updatedSources(e));
                    }
                } }, sortableEventHandlers(this)),
            attrs: this.$attrs
        }, slots)
    ];
}
// Inherits VirtualList and overrides getRenderSlots.
export default VirtualList.extend({
    methods: {
        getRenderSlots: getRenderSlots
    }
});
// Returns handlers which propagate sortable's events.
export function sortableEventHandlers(context) {
    return sortableEvents.reduce(function (acc, eventName) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[eventName] = context.$emit.bind(context, eventName.toLowerCase()), _a)));
    }, {});
}
//# sourceMappingURL=index.js.map