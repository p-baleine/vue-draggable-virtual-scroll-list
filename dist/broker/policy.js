var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// VirtualListとDraggableを仲介する際の方針を表現する
var Policy = /** @class */ (function () {
    function Policy(dataKey, dataSources, visibleRange) {
        this.dataKey = dataKey;
        this.dataSources = dataSources;
        this.visibleRange = visibleRange;
    }
    // Draggableによってドラッグされた item の実データを返す
    Policy.prototype.findRealItem = function (item) {
        var _this = this;
        var idx = this.dataSources.findIndex(function (x) { return x[_this.dataKey] === item[_this.dataKey]; });
        return this.dataSources[this.visibleRange.start + idx];
    };
    // 更新指示に従った際の、更新語のdataSourcesを新しく作って返す
    Policy.prototype.updatedSources = function (instruction) {
        var newList = __spreadArrays(this.dataSources);
        if ('moved' in instruction) {
            var _a = instruction.moved, oldIndex = _a.oldIndex, newIndex = _a.newIndex;
            newList.splice(this.visibleRange.start + newIndex, 0, newList.splice(this.visibleRange.start + oldIndex, 1)[0]);
        }
        else if ('added' in instruction) {
            var _b = instruction.added, newIndex = _b.newIndex, element = _b.element;
            newList.splice(this.visibleRange.start + newIndex, 0, element);
        }
        else if ('removed' in instruction) {
            var oldIndex = instruction.removed.oldIndex;
            newList.splice(this.visibleRange.start + oldIndex, 1);
        }
        return newList;
    };
    return Policy;
}());
export default Policy;
//# sourceMappingURL=policy.js.map