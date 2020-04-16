import { mount } from '@vue/test-utils'
import DraggableVirtualList from '../../src'

describe('DraggableVirtualList', () => {
  it('should update list', () => {
    const items = generateItems()
    const wrapper = mount(DraggableVirtualList, {
      propsData: {
        value: items,
        size: 20,
        keeps: 20,
        dataKey: 'id',
        dataSources: items,
        dataComponent: Item
      }
    })

    expect(wrapper.props().value[0]).toEqual(items[0])
  })
})

const Item = {
  props: {
    source: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  template: `
<div class="phrase" :key="source.id">
  {{ source.content }}
</div>
`
}

function generateItems(length = 100) {
  return Array.from(
    { length },
    (_, id) => ({
      id: id + '',
      content: `${id}：${name()}`
    }));
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#answer-47496558
const name = () => (
  [...Array(12)].map(() => Math.random().toString(36)[2]).join(''))
