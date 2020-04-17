import { mount } from '@vue/test-utils'
import Vue from 'vue'

import DraggableVirtualList from '../../src'
import { Item, generateItems } from '../utils'

let wrapper: any
let items: any
let propsData: any

describe('simple', () => {
  beforeEach(() => {
    const length = 100
    items = generateItems(length)
    propsData = {
      value: items,
      size: 20,
      keeps: 20,
      dataKey: 'id',
      dataSources: items,
      dataComponent: Item
    }
    wrapper = mount(DraggableVirtualList, {
      attachToDocument: true,
      propsData
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('keeos個のdataComponentsを描画すること', () => {
    const children = wrapper.findAll('.phrase')
    for (let i = 0; i < propsData.keeps; ++i) {
      expect(children.at(i).text()).toEqual(
        expect.stringContaining(items[i].content)
      )
    }
  })

  it('keepsを越える位置にあるdataのdataComponentは描かないこと', () => {
    const children = wrapper.findAll('.phrase')
    expect(() => children.at(propsData.keeps)).toThrow(/no item exists at/)
  })

  async function triggerScrollEvents(offset: number) {
    const virtualList = wrapper.find({ name: 'virtual-list' })
    virtualList.vm.setScrollOffset(propsData.size * offset)
    // VirtualListがlistenしている `&scroll' の `&' って何だろう？
    // https://github.com/tangbc/vue-virtual-scroll-list/blob/3f5f2e03335b7ecc921ae704f0f3429840032036/src/index.js#L186
    virtualList.find({ ref: 'root' }).trigger('scroll')
    await Vue.nextTick()
  }

  describe('10個分スクロールしたとき', () => {
    it('keeps + 10個のdataComponentsを描画すること', async () => {
      await triggerScrollEvents(10)
      const children = wrapper.findAll('.phrase')
      for (let i = 0; i < propsData.keeps; ++i) {
        expect(children.at(i).text()).toEqual(
          expect.stringContaining(items[i + 10].content)
        )
      }
    })

    it('keepsを越える位置にあるdataのdataComponentは描かないこと', async () => {
      await triggerScrollEvents(10)
      const children = wrapper.findAll('.phrase')
      expect(() => children.at(propsData.keeps)).toThrow(/no item exists at/)
    })
  })

  describe('DnD', () => {
    it('DraggableをVirtualListの子どもとしてもっていること', () => {
      expect(wrapper.find({ name: 'draggable'}).vm).not.toBeFalsy()
    })

    let draggableWrapper: any

    beforeEach(() => {
      draggableWrapper = wrapper.find({ name: 'draggable'})
    })

    describe('更新', () => {
      async function applyStartAndUpdateDragEvents(
        oldIndex: number, newIndex: number) {
        const dragged = wrapper.findAll('.phrase').at(oldIndex)
        const item = dragged.element.parentNode
        const from = draggableWrapper.element
        const dragStartEvent = { item }
        const dragUpdateEvent = { item, from, oldIndex, newIndex }

        draggableWrapper.vm.onDragStart(dragStartEvent)
        await Vue.nextTick()
        draggableWrapper.vm.onDragUpdate(dragUpdateEvent)
        await Vue.nextTick()
      }

      it('swap済みの newList を input イベントで emit すること', async () => {
        const oldIndex = 7
        const newIndex = 2
        await applyStartAndUpdateDragEvents(oldIndex, newIndex)
        const newValue = wrapper.emitted().input[0][0]
        expect(newValue[newIndex]).toEqual(items[oldIndex])
      })

      describe('10個分スクロールしたとき', () => {
        it('swap済みの newList を input イベントで emit すること', async () => {
          const oldIndex = 7
          const newIndex = 2
          await triggerScrollEvents(10)
          await applyStartAndUpdateDragEvents(oldIndex, newIndex)
          const newValue = wrapper.emitted().input[0][0]
          expect(newValue[newIndex + 10]).toEqual(items[oldIndex + 10])
        })
      })
    })
  })
})
