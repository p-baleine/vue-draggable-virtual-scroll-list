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
// VirtualList.options.methods.getRenderSlotsの返却するslotsをDraggableで
// ラップして返す。また、draggableのchangeイベントをlistenして、これをinputイベントに
// 変換してemitする。
function getRenderSlots(h) {
    var _this = this;
    var original = VirtualList.options.methods.getRenderSlots;
    var slots = original.call(this, h);
    var policy = new Policy(this.dataKey, this.dataSources, this.range);
    return [
        h(Draggable, {
            props: {
                value: this.dataSources,
                clone: function (x) { return policy.findRealItem(x); },
            },
            on: __assign({ change: function (e) {
                    if (draggableEvents.some(function (n) { return n in e; })) {
                        _this.$emit('input', policy.updatedSources(e));
                    }
                } }, sortableEventHandlers(this)),
            attrs: this.$attrs
        }, slots)
    ];
}
export default VirtualList.extend({
    methods: {
        getRenderSlots: getRenderSlots
    }
});
// createElement の引数向けに、sortableのイベントを伝播するハンドラ群を返す
export function sortableEventHandlers(context) {
    return sortableEvents.reduce(function (acc, eventName) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[eventName] = context.$emit.bind(context, eventName.toLowerCase()), _a)));
    }, {});
}
//# sourceMappingURL=index.js.map