export const Item = {
  props: {
    source: {
      type: Object,
      default() {
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

export function generateItems(length = 100) {
  return Array.from(
    { length },
    (_, id) => ({
      id: id + '',
      content: `${id}：${name()}`
    }))
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#answer-47496558
export const name = () => (
  [...Array(12)].map(() => Math.random().toString(36)[2]).join(''))
