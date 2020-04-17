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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Vue, Component, Prop } from 'vue-property-decorator';
import Broker from './broker';
// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
var DraggableVirtualList = /** @class */ (function (_super) {
    __extends(DraggableVirtualList, _super);
    function DraggableVirtualList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableVirtualList.prototype.render = function (h) {
        return h(Broker, {
            props: this.$props,
            attrs: this.$attrs,
            on: {
                // Propagate VirtualLists' input event.
                input: this.$emit.bind(this, 'input'),
            }
        });
    };
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "value", void 0);
    DraggableVirtualList = __decorate([
        Component
    ], DraggableVirtualList);
    return DraggableVirtualList;
}(Vue));
export default DraggableVirtualList;
//# sourceMappingURL=index.js.map