var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import logger from '../logger';
export var instructionNames = ['moved', 'added', 'removed'];
// This class is responsible for ensuring Draggable policies.
var DraggablePolicy = /** @class */ (function () {
    function DraggablePolicy(dataKey, dataSources, visibleRange) {
        this.dataKey = dataKey;
        this.dataSources = dataSources;
        this.visibleRange = visibleRange;
    }
    // Find the real item from item.
    DraggablePolicy.prototype.findRealItem = function (item) {
        var _this = this;
        var idx = this.dataSources.findIndex(function (x) { return x[_this.dataKey] === item[_this.dataKey]; });
        return this.dataSources[this.visibleRange.start + idx];
    };
    // Returns a new list which is created based on
    // the update `instruction`.
    DraggablePolicy.prototype.updatedSources = function (instruction, draggingRealIndex) {
        var newList = __spreadArrays(this.dataSources);
        if ('moved' in instruction) {
            var newIndex = instruction.moved.newIndex;
            var start = this.visibleRange.start + newIndex;
            var deleteCount = 0;
            var item = newList.splice(draggingRealIndex, 1)[0];
            logger.debug("Move by splicing start: " + start + ","
                + (" deleteCount: " + deleteCount + ", item:"), item);
            newList.splice(start, deleteCount, item);
        }
        else if ('added' in instruction) {
            var _a = instruction.added, newIndex = _a.newIndex, element = _a.element;
            var start = this.visibleRange.start + newIndex;
            var deleteCount = 0;
            var item = element;
            logger.debug("Add by splicing start: " + start + ","
                + (" deleteCount: " + deleteCount + ", item:"), item);
            newList.splice(start, deleteCount, item);
        }
        else if ('removed' in instruction) {
            var oldIndex = instruction.removed.oldIndex;
            var start = this.visibleRange.start + oldIndex;
            var deleteCount = 1;
            logger.debug("Remove by splicing start: " + start + ","
                + (" deleteCount: " + deleteCount));
            newList.splice(start, deleteCount);
        }
        return newList;
    };
    return DraggablePolicy;
}());
export default DraggablePolicy;
//# sourceMappingURL=draggable-policy.js.map