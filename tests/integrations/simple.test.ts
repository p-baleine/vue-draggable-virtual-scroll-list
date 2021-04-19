import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'

import DraggableVirtualList from '../../src'
import { Item, generateItems } from '../utils'

let wrapper: any
let draggableWrapper: any
let items: any
let propsData: any

describe.only('simple', () => {
    beforeEach(() => {
        const length = 100
        items = generateItems(length)
        propsData = {
            value: items,
            estimateSize: 20,
            keeps: 20,
            dataKey: 'id',
            dataSources: items,
            dataComponent: Item
        }
        const localVue = createLocalVue()
        wrapper = mount(DraggableVirtualList, {
            attachToDocument: true,
            localVue,
            propsData
        })
        // virtual-list will need to use client height and scroll height 
        // if both are zero, the scroll event will be ignored
        const el = wrapper.vm.$refs.broker.$refs.root
        Object.defineProperty(el, 'clientHeight', { configurable: true, value: 500 })
        Object.defineProperty(el, 'scrollHeight', { configurable: true, value: propsData.estimateSize * items.length })
        draggableWrapper = wrapper.find({ name: 'draggable' })
    })

    afterEach(() => {
        draggableWrapper.destroy()
        wrapper.destroy()
    })

    it('keeps個のdataComponentsを描画すること', () => {
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
        const virtualList = wrapper.find({ name: 'broker' })
        virtualList.vm.scrollToOffset(propsData.estimateSize * offset)
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
            expect(wrapper.find({ name: 'draggable' }).vm).not.toBeFalsy()
        })

        describe('更新', () => {
            async function applyStartDragEvent(
                oldIndex: number, newIndex: number) {
                const dragged = wrapper.findAll('.phrase').at(oldIndex)
                const item = dragged.element.parentNode
                const dragStartEvent = { item, oldIndex }
                const sortable = draggableWrapper.vm._sortable
                sortable.options.onStart.call(sortable, dragStartEvent)
                await Vue.nextTick()
            }

            async function applyUpdateDragEvent(
                oldIndex: number, newIndex: number) {
                const dragged = wrapper.findAll('.phrase').at(oldIndex)
                const item = dragged.element.parentNode
                const from = draggableWrapper.element
                const dragUpdateEvent = { item, from, oldIndex, newIndex }
                const sortable = draggableWrapper.vm._sortable
                sortable.options.onUpdate.call(sortable, dragUpdateEvent)
                await Vue.nextTick()
            }

            describe('スクロールなし', () => {
                it('swap済みの newList を input イベントで emit すること', async () => {
                    const oldIndex = 7
                    const newIndex = 2
                    await applyStartDragEvent(oldIndex, newIndex)
                    await applyUpdateDragEvent(oldIndex, newIndex)
                    const newValue = wrapper.emitted().input[0][0]
                    expect(newValue[newIndex]).toEqual(items[oldIndex])
                })
            })

            describe('10個分スクロールしたとき', () => {
                it('swap済みの newList を input イベントで emit すること', async () => {
                    const oldIndex = 8
                    const newIndex = 3
                    await triggerScrollEvents(10)
                    await applyStartDragEvent(oldIndex, newIndex)
                    await applyUpdateDragEvent(oldIndex, newIndex)
                    const newValue = wrapper.emitted().input[0][0]
                    expect(newValue[newIndex + 10]).toEqual(items[oldIndex + 10])
                })
            })

            describe('ドラッグ中に keeps(20個) をこえて50個分スクロールしたとき', () => {
                it('swap済みの newList を input イベントで emit すること', async () => {
                    const oldIndex = 1
                    const newIndex = 4
                    await applyStartDragEvent(oldIndex, newIndex)
                    await triggerScrollEvents(50)
                    await applyUpdateDragEvent(oldIndex, newIndex)
                    const newValue = wrapper.emitted().input[0][0]
                    expect(newValue[newIndex + 50]).toEqual(items[oldIndex])
                })
            })
        })

        describe('Events', () => {
            describe('start', () => {
                it('should propagate Sortable\'s start event', async () => {
                    const dragged = wrapper.findAll('.phrase').at(3)
                    const item = dragged.element.parentNode
                    const event = { item }
                    // 横着
                    const sortable = draggableWrapper.vm._sortable
                    sortable.options.onStart.call(sortable, event)
                    await Vue.nextTick()

                    const startEventEmittedFromDraggable =
                        draggableWrapper.emitted().start[0][0]

                    expect(wrapper.emitted().start[0][0])
                        .toBe(startEventEmittedFromDraggable)
                })
            })
        })
    })
})
