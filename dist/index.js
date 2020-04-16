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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Vue, Component, Prop } from 'vue-property-decorator';
import Draggable from 'vuedraggable';
import VirtualList from 'vue-virtual-scroll-list/src/index';
// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
var DraggableVirtualList = /** @class */ (function (_super) {
    __extends(DraggableVirtualList, _super);
    function DraggableVirtualList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableVirtualList.prototype.created = function () {
        // このパッチをあてると、VirtualListがDraggableを子どもに持つようになる
        patchVirtualListGetRenderSlots(this.virtualListCtor, this.draggableCtor, this);
    };
    DraggableVirtualList.prototype.render = function (h) {
        var _a = this, keeps = _a.keeps, dataKey = _a.dataKey, dataSources = _a.dataSources, dataComponent = _a.dataComponent, size = _a.size;
        return h(this.virtualListCtor, {
            props: {
                keeps: keeps,
                dataKey: dataKey,
                dataSources: dataSources,
                dataComponent: dataComponent,
                size: size,
            },
            on: {
                // Draggableのinputイベントをプロパゲートする
                input: this.$emit.bind(this, 'input'),
            }
        });
    };
    __decorate([
        Prop({ default: function () { return Draggable; } })
    ], DraggableVirtualList.prototype, "draggableCtor", void 0);
    __decorate([
        Prop({ default: function () { return VirtualList; } })
    ], DraggableVirtualList.prototype, "virtualListCtor", void 0);
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "keeps", void 0);
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "dataKey", void 0);
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "dataSources", void 0);
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "dataComponent", void 0);
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "size", void 0);
    __decorate([
        Prop()
    ], DraggableVirtualList.prototype, "value", void 0);
    DraggableVirtualList = __decorate([
        Component
    ], DraggableVirtualList);
    return DraggableVirtualList;
}(Vue));
export default DraggableVirtualList;
/* FUCKING UGLY NAIVE MONKEY-PATCHINGs */
// Monkey-patch VirtualList.prototype.getRenderSlots to include Draggable.
function patchVirtualListGetRenderSlots(VirtualList, Draggable, context) {
    var original = VirtualList.options.methods.getRenderSlots;
    function patched(h) {
        var _this = this;
        var virtualList = this;
        var slots = original.call(virtualList, h);
        return [
            h(Draggable, {
                props: {
                    value: context.value,
                },
                on: {
                    change: function (e) {
                        if (!('moved' in e)) {
                            return;
                        }
                        onMoved.call(_this, e, virtualList);
                    }
                },
                attrs: {
                    group: 'phrase-list'
                }
            }, slots)
        ];
    }
    // Draggableのchange:movedイベントをinputイベントに変換する
    // VirtualListを加味した添字を元に作成したリストをinputイベントの情報としてemitする
    function onMoved(evt, virtualList) {
        var start = virtualList.range.start;
        var _a = evt.moved, oldIndex = _a.oldIndex, newIndex = _a.newIndex;
        var newList = __spreadArrays(context.value);
        newList.splice(start + newIndex, 0, newList.splice(start + oldIndex, 1)[0]);
        this.$emit('input', newList);
    }
    VirtualList.options.methods.getRenderSlots = patched;
}
//# sourceMappingURL=index.js.map