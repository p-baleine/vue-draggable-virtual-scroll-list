var VirtualScrollListPolicy = /** @class */ (function () {
    function VirtualScrollListPolicy() {
        this._draggingVNode = null;
    }
    Object.defineProperty(VirtualScrollListPolicy.prototype, "draggingVNode", {
        get: function () {
            return this._draggingVNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollListPolicy.prototype, "draggingIndex", {
        get: function () {
            return this._draggingIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollListPolicy.prototype, "draggingRealIndex", {
        get: function () {
            return this._draggingRealIndex;
        },
        enumerable: true,
        configurable: true
    });
    VirtualScrollListPolicy.prototype.onDragStart = function (e, range, slots) {
        this._draggingIndex = e.oldIndex;
        this._draggingRealIndex = range.start + e.oldIndex;
        this._draggingVNode = slots[e.oldIndex];
    };
    VirtualScrollListPolicy.prototype.onDragEnd = function () {
        this._draggingVNode = null;
    };
    return VirtualScrollListPolicy;
}());
export default VirtualScrollListPolicy;
//# sourceMappingURL=virtual-scroll-list-policy.js.map