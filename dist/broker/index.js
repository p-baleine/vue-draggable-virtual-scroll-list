import Draggable from 'vuedraggable';
import VirtualList from 'vue-virtual-scroll-list';
import Policy from './policy';
var draggableEvents = ['moved', 'added', 'removed'];
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
            on: {
                change: function (e) {
                    if (draggableEvents.some(function (n) { return n in e; })) {
                        _this.$emit('input', policy.updatedSources(e));
                    }
                }
            },
            attrs: this.$attrs
        }, slots)
    ];
}
export default VirtualList.extend({
    methods: {
        getRenderSlots: getRenderSlots
    }
});
//# sourceMappingURL=index.js.map