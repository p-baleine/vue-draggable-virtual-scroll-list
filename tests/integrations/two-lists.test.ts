import { mount } from '@vue/test-utils'
import Vue from 'vue'

import DraggableVirtualList from '../../src'
import { Item, generateItems } from '../utils'

let lhs: { wrapper: any, items: any, propsData: any }
let rhs: { wrapper: any, items: any, propsData: any }

describe('two-lists', () => {
  function prepareWrapper(length: number) {
    const items = generateItems(length)
    const propsData = {
      value: items,
      estimateSize: 20,
      keeps: 20,
      dataKey: 'id',
      dataSources: items,
      dataComponent: Item
    }
    const wrapper = mount(DraggableVirtualList, {
      propsData
    })
    // virtual-list will need to use client height and scroll height
    // if both are zero, the scroll event will be ignored
    const el = wrapper.vm.$refs.broker.$refs.root
    Object.defineProperty(el, 'clientHeight', { configurable: true, value: 500 })
    Object.defineProperty(el, 'scrollHeight', { configurable: true, value: propsData.estimateSize * items.length })
    return { wrapper, items, propsData }
  }

  beforeEach(() => {
    lhs = prepareWrapper(100)
    rhs = prepareWrapper(80)
  })

  afterEach(() => {
    lhs.wrapper.destroy()
    rhs.wrapper.destroy()
  })

  describe('DnD', () => {
    function draggableWrapper(lst: any) {
      return lst.wrapper.findComponent({ name: 'draggable' })
    }

    async function swapBetweenLists(lhsIndex: number, rhsIndex: number) {
      const dragged = lhs.wrapper.findAll('.phrase').at(lhsIndex)
      const item = dragged.element.parentNode
      const dragStartEvent = { item }
      const dragRemoveEvent = { item, oldIndex: lhsIndex }
      const dragAddEvent = { item, newIndex: rhsIndex }

      draggableWrapper(lhs).vm.onDragStart(dragStartEvent)
      await Vue.nextTick()
      draggableWrapper(lhs).vm.onDragRemove(dragRemoveEvent)
      await Vue.nextTick()
      draggableWrapper(rhs).vm.onDragAdd(dragAddEvent)
      await Vue.nextTick()
    }

    it('移動元で新しいリストで input イベントを emit すること', async () => {
      const lhsIndex = 10
      const rhsIndex = 2
      await swapBetweenLists(lhsIndex, rhsIndex)
      const newValue = lhs.wrapper.emitted().input[0][0]
      expect(newValue[lhsIndex - 1]).toEqual(lhs.items[lhsIndex - 1])
      expect(newValue[lhsIndex]).toEqual(lhs.items[lhsIndex + 1])
    })

    it('移動先で新しいリストで input イベントを emit すること', async () => {
      const lhsIndex = 10
      const rhsIndex = 2
      await swapBetweenLists(lhsIndex, rhsIndex)
      const newValue = rhs.wrapper.emitted().input[0][0]
      expect(newValue[rhsIndex - 1]).toEqual(rhs.items[rhsIndex - 1])
      expect(newValue[rhsIndex]).toEqual(lhs.items[lhsIndex])
      expect(newValue[rhsIndex + 1]).toEqual(rhs.items[rhsIndex])
    })

    async function triggerScrollEvents(lst: any, offset: number) {
      const { wrapper, propsData } = lst
      const virtualList = wrapper.findComponent({ name: 'broker' })
      virtualList.vm.scrollToOffset(propsData.estimateSize * offset)
      virtualList.findComponent({ ref: 'root' }).trigger('scroll')
      await Vue.nextTick()
    }

    describe('移動元を10個分スクロールしたとき', () => {
      it('移動元で新しいリストで input イベントを emit すること', async () => {
        await triggerScrollEvents(lhs, 10)
        const lhsIndex = 10
        const rhsIndex = 2
        await swapBetweenLists(lhsIndex, rhsIndex)
        const newValue = lhs.wrapper.emitted().input[0][0]
        expect(newValue[lhsIndex + 10 - 1]).toEqual(lhs.items[lhsIndex + 10 - 1])
        expect(newValue[lhsIndex + 10]).toEqual(lhs.items[lhsIndex + 10 + 1])
      })

      it('移動先で新しいリストで input イベントを emit すること', async () => {
        await triggerScrollEvents(lhs, 10)
        const lhsIndex = 10
        const rhsIndex = 2
        await swapBetweenLists(lhsIndex, rhsIndex)
        const newValue = rhs.wrapper.emitted().input[0][0]
        expect(newValue[rhsIndex - 1]).toEqual(rhs.items[rhsIndex - 1])
        expect(newValue[rhsIndex]).toEqual(lhs.items[lhsIndex + 10])
        expect(newValue[rhsIndex + 1]).toEqual(rhs.items[rhsIndex])
      })
    })

    describe('移動先を10個分スクロールしたとき', () => {
      it('移動元で新しいリストで input イベントを emit すること', async () => {
        await triggerScrollEvents(rhs, 10)
        const lhsIndex = 10
        const rhsIndex = 2
        await swapBetweenLists(lhsIndex, rhsIndex)
        const newValue = lhs.wrapper.emitted().input[0][0]
        expect(newValue[lhsIndex - 1]).toEqual(lhs.items[lhsIndex - 1])
        expect(newValue[lhsIndex]).toEqual(lhs.items[lhsIndex + 1])
      })

      it('移動先で新しいリストで input イベントを emit すること', async () => {
        await triggerScrollEvents(rhs, 10)
        const lhsIndex = 10
        const rhsIndex = 2
        await swapBetweenLists(lhsIndex, rhsIndex)
        const newValue = rhs.wrapper.emitted().input[0][0]
        expect(newValue[rhsIndex + 10 - 1]).toEqual(rhs.items[rhsIndex + 10 - 1])
        expect(newValue[rhsIndex + 10]).toEqual(lhs.items[lhsIndex])
        expect(newValue[rhsIndex + 10 + 1]).toEqual(rhs.items[rhsIndex + 10])
      })
    })

    describe('移動元と移動先を10個分スクロールしたとき', () => {
      it('移動元で新しいリストで input イベントを emit すること', async () => {
        await triggerScrollEvents(lhs, 10)
        await triggerScrollEvents(rhs, 10)
        const lhsIndex = 10
        const rhsIndex = 2
        await swapBetweenLists(lhsIndex, rhsIndex)
        const newValue = lhs.wrapper.emitted().input[0][0]
        expect(newValue[lhsIndex + 10 - 1]).toEqual(lhs.items[lhsIndex + 10 - 1])
        expect(newValue[lhsIndex + 10]).toEqual(lhs.items[lhsIndex + 10 + 1])
      })

      it('移動先で新しいリストで input イベントを emit すること', async () => {
        await triggerScrollEvents(lhs, 10)
        await triggerScrollEvents(rhs, 10)
        const lhsIndex = 10
        const rhsIndex = 2
        await swapBetweenLists(lhsIndex, rhsIndex)
        const newValue = rhs.wrapper.emitted().input[0][0]
        expect(newValue[rhsIndex + 10 - 1]).toEqual(rhs.items[rhsIndex + 10 - 1])
        expect(newValue[rhsIndex + 10]).toEqual(lhs.items[lhsIndex + 10])
        expect(newValue[rhsIndex + 10 + 1]).toEqual(rhs.items[rhsIndex + 10])
      })
    })
  })
})
