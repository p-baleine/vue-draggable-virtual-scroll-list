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
import VirtualList from 'vue-virtual-scroll-list';
var virtualListGetRenderSlotsPatched = false;
// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
// この子はDraggableを子どもにもつVirtualListをラッピングしている
// VirtualListがDraggableを子どもに持てるように、まだ適用前であれば
// この子はVirtualListの描画関連のメソッドにMonkey-patchを適用している
var DraggableVirtualList = /** @class */ (function (_super) {
    __extends(DraggableVirtualList, _super);
    function DraggableVirtualList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableVirtualList.prototype.created = function () {
        if (!virtualListGetRenderSlotsPatched) {
            // このパッチをあてると、VirtualListがDraggableを子どもに持つようになる
            patchVirtualListGetRenderSlots(this.virtualListCtor, this.draggableCtor);
            virtualListGetRenderSlotsPatched = true;
        }
    };
    DraggableVirtualList.prototype.render = function (h) {
        return h(this.virtualListCtor, {
            props: this.$props,
            attrs: this.$attrs,
            on: {
                // VirtualListのinputイベントをプロパゲートする
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
    ], DraggableVirtualList.prototype, "value", void 0);
    DraggableVirtualList = __decorate([
        Component
    ], DraggableVirtualList);
    return DraggableVirtualList;
}(Vue));
export default DraggableVirtualList;
/* FUCKING UGLY NAIVE MONKEY-PATCHINGs */
// Monkey-patch VirtualList.prototype.getRenderSlots to include Draggable.
function patchVirtualListGetRenderSlots(VirtualList, Draggable) {
    var original = VirtualList.options.methods.getRenderSlots;
    function patched(h) {
        var virtualList = this;
        var slots = original.call(virtualList, h);
        // 絶対に virtualList.dataDey のフィールドは存在する
        // 且つ、それは virtualList.dataSources の中でユニークだとする
        // そうすれば、cloneのタイミングで、本物をひいてくることができるはず
        function findRealElement(targetElement) {
            var targetId = targetElement[virtualList.dataKey];
            var targetIndex = virtualList.dataSources.findIndex(function (x) { return (x[virtualList.dataKey] === targetId); });
            var start = virtualList.range.start;
            var realElement = virtualList.dataSources[start + targetIndex];
            console.log('clone called!!', targetElement, realElement);
            return realElement;
        }
        return [
            h(Draggable, {
                props: {
                    value: virtualList.dataSources,
                    clone: findRealElement,
                },
                on: {
                    change: function (e) {
                        if ('moved' in e) {
                            onMoved.call(virtualList, e);
                        }
                        else if ('added' in e) {
                            onAdded.call(virtualList, e);
                        }
                        else if ('removed' in e) {
                            onRemoved.call(virtualList, e);
                        }
                    }
                },
                attrs: virtualList.$attrs
            }, slots)
        ];
    }
    function onMoved(evt) {
        var virtualList = this;
        var start = virtualList.range.start;
        var _a = evt.moved, oldIndex = _a.oldIndex, newIndex = _a.newIndex;
        var newList = __spreadArrays(virtualList.dataSources);
        newList.splice(start + newIndex, 0, newList.splice(start + oldIndex, 1)[0]);
        this.$emit('input', newList);
    }
    // TODO: 継承にする、prototypeなんかいじんじゃねーよ
    function onAdded(e) {
        var virtualList = this;
        var start = virtualList.range.start;
        var _a = e.added, element = _a.element, newIndex = _a.newIndex;
        var newList = __spreadArrays(virtualList.dataSources);
        console.log(element);
        newList.splice(start + newIndex, 0, element);
        this.$emit('input', newList);
    }
    function onRemoved(e) {
        var virtualList = this;
        var start = virtualList.range.start;
        var oldIndex = e.removed.oldIndex;
        var newList = __spreadArrays(virtualList.dataSources);
        newList.splice(start + oldIndex, 1);
        this.$emit('input', newList);
    }
    VirtualList.options.methods.getRenderSlots = patched;
}
//# sourceMappingURL=index.js.map