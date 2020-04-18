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
export var SortableEvents;
(function (SortableEvents) {
    SortableEvents[SortableEvents["start"] = 0] = "start";
    SortableEvents[SortableEvents["add"] = 1] = "add";
    SortableEvents[SortableEvents["remove"] = 2] = "remove";
    SortableEvents[SortableEvents["update"] = 3] = "update";
    SortableEvents[SortableEvents["end"] = 4] = "end";
    SortableEvents[SortableEvents["choose"] = 5] = "choose";
    SortableEvents[SortableEvents["unchoose"] = 6] = "unchoose";
    SortableEvents[SortableEvents["sort"] = 7] = "sort";
    SortableEvents[SortableEvents["filter"] = 8] = "filter";
    SortableEvents[SortableEvents["clone"] = 9] = "clone";
})(SortableEvents || (SortableEvents = {}));
var sortableEvents = Object.values(SortableEvents)
    .filter(function (x) { return typeof x === 'string'; });
var draggableEvents = ['moved', 'added', 'removed'];
// Inherits VirtualList and overrides getRenderSlots.
export default function createBroker(Draggable, VirtualList, PolicyCtr) {
    return VirtualList.extend({
        inject: {
            Draggable: { from: 'Draggable', default: function () { return Draggable; } },
            VirtualList: { from: 'VirtualList', default: function () { return VirtualList; } },
            Policy: { from: 'Policy', default: function () { return PolicyCtr; } },
        },
        methods: {
            getRenderSlots: getRenderSlots,
        },
    });
}
// This function will override VirtualList.options.methods.getRenderSlots.
//
// Returns the result of VirtualList.options.methods.getRenderSlots
// which would be wrapped by Draggable.
// Draggable's change events would be converted to input events and emitted.
function getRenderSlots(h) {
    var _this = this;
    var _a = this, Draggable = _a.Draggable, VirtualList = _a.VirtualList, Policy = _a.Policy;
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
            attrs: this.$attrs,
        }, slots),
    ];
}
// Returns handlers which propagate sortable's events.
export function sortableEventHandlers(context) {
    return sortableEvents.reduce(function (acc, eventName) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[eventName] = context.$emit.bind(context, eventName), _a)));
    }, {});
}
//# sourceMappingURL=index.js.map