<template>
  <div class="phrase" :key="source.id">
    {{ source.content }}
  </div>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    source: {
      type: Object,
      default () {
        return {}
      },
    },
  },
})
</script>
