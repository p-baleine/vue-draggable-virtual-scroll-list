<script lang="ts">
import Vue from 'vue';
import VueDraggableVirtualScrollList from '../src';
// @ts-ignore
import faker from 'faker';
import Item from "./Item.vue";

  function generateItems(length = 100, prefix = '') {
    return Array.from(
      { length },
      (_, id) => {
        const domId = prefix ? `${prefix}-${id}` : id + ''
        return {
          id: domId,
          content: `${domId}:${faker.name.findName()}`
        }
      }
    );
  }

  export default Vue.extend({
    name: 'VueDraggableVirtualScrollListSample',
    components: {
      VueDraggableVirtualScrollList,
    },
    data() {
      return {
        items: generateItems(10000),
        // Make sure that elements of two lists have unique ids.
        items2: generateItems(500, 'lhs-'),
        items3: generateItems(100, 'rhs-'),
        Item
      }
    },
  });
</script>

<template>
  <div id="app">
    <h1>vue-draggable-virtual-scroll-list</h1>
    <section class="example">
      <h2>Simple</h2>
      <div class="container">
        <vue-draggable-virtual-scroll-list
          class="phrase-list"
          v-model="items"
          :size="50"
          :keeps="20"
          :data-key="'id'"
          :data-sources="items"
          :data-component="Item"
        >
        </vue-draggable-virtual-scroll-list>
      </div>
    </section>
    <section class="example">
      <h2>Two Lists</h2>
      <div class="container">
        <vue-draggable-virtual-scroll-list
          class="phrase-list"
          group="phrase-list"
          v-model="items2"
          :size="50"
          :keeps="20"
          :data-key="'id'"
          :data-sources="items2"
          :data-component="Item"
        >
        </vue-draggable-virtual-scroll-list>
        <vue-draggable-virtual-scroll-list
          class="phrase-list"
          group="phrase-list"
          v-model="items3"
          :size="50"
          :keeps="20"
          :data-key="'id'"
          :data-sources="items3"
          :data-component="Item"
        >
        </vue-draggable-virtual-scroll-list>
      </div>
    </section>
  </div>
</template>

<style>
  html {
    font: 16px/1.6 Helvetica Neue,Helvetica,Arial,sans-serif;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #fafafe;
    margin: 2rem;
    color: #000;
  }
  h1, h2 {
    color: #fe5366;
  }
  #main {
    font-size: 16px;
  }
  .example {
    padding: 10px;
  }
  .container {
    display: flex;
    width: 100%;
    align-items: flex-start;
  }
  .phrase-list {
    overflow-y: auto;
    height: 200px;
    width: 45%;
    margin: 0 2.5% 0;
    border-radius: 3%;
  }
  .example .phrase-list:nth-child(1) {
    height: 500px;
  }
  .example .phrase-list:nth-child(2) {
    height: 300px;
  }
  .phrase {
    display: flex;
    align-items: center;
    padding: 0 1em;
    height: 3rem;
    border-bottom: 1px solid;
    background-color: #F4F1F9;
    border-color: #d3dc33;
    cursor: pointer;
    -webkit-transition: background-color .2s, color .2s;
    transition: background-color .2s, color .2s;
  }
  .phrase:hover {
    background-color: #fe5366;
    color: #fff;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 50, .5);
    border-radius: 10px;
    box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
  }
</style>
