# vue-draggable-virtual-scroll-list

[![](https://github.com/p-baleine/vue-draggable-virtual-scroll-list/workflows/CI/badge.svg)]()


# Description

🔌 [SortableJS/Vue.Draggable][] + ⚡ [tangbc/vue-virtual-scroll-list][] =
💡✨

Vue component who put [SortableJS/Vue.Draggable][] and
[tangbc/vue-virtual-scroll-list][] together and allow drag-and-drop and
big amount data list with high scroll performance.

![](images/screenshot.gif)

# Usage

``` html
<div id="main">
  <draggable-virtual-list
    class="phrase-list"
    v-model="items"
    :size="50"
    :keeps="20"
    :data-key="'id'"
    :data-sources="items"
    :data-component="Item"
  >
  </draggable-virtual-list>
</div>

<script>
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

new Vue({
  el: '#main',
  components: {
    DraggableVirtualList,
  },
  data() {
    return {
      items: [
        { source: { id: 1, content: 'hello' } },
        { source: { id: 2, content: world' } },
        // ...
      ],
      Item
    }
  },
})
</script>
```

Please see [./example/index.html][].

# License

<span class="spurious-link" target="LICENSE">*MIT License.*</span>

  [1]: https://github.com/p-baleine/vue-draggable-virtual-scroll-list/workflows/CI/badge.svg
  [SortableJS/Vue.Draggable]: https://github.com/SortableJS/Vue.Draggable
  [tangbc/vue-virtual-scroll-list]: https://github.com/tangbc/vue-virtual-scroll-list
  [./example/index.html]: ./example/index.html
