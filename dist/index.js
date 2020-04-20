var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Draggable from 'vuedraggable';
import VirtualList from 'vue-virtual-scroll-list';
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';
import createBroker from './broker';
import Policy from './broker/policy';
import { sortableEventHandlers } from './broker';
var Broker = createBroker(VirtualList);
// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
var DraggableVirtualList = /** @class */ (function (_super) {
    __extends(DraggableVirtualList, _super);
    function DraggableVirtualList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Draggable = Draggable;
        _this.Policy = Policy;
        return _this;
    }
    DraggableVirtualList.prototype.render = function (h) {
        return h(Broker, {
            props: this.$props,
            attrs: this.$attrs,
            on: __assign({ 
                // Propagate VirtualList's input event.
                input: this.$emit.bind(this, 'input') }, sortableEventHandlers(this)),
        });
    };
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "value", void 0);
    __decorate([
        Provide()
    ], DraggableVirtualList.prototype, "Draggable", void 0);
    __decorate([
        Provide()
    ], DraggableVirtualList.prototype, "Policy", void 0);
    DraggableVirtualList = __decorate([
        Component
    ], DraggableVirtualList);
    return DraggableVirtualList;
}(Vue));
export default DraggableVirtualList;
//# sourceMappingURL=index.js.map