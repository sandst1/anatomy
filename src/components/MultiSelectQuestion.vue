<template>
  <div class="multi-select" v-if="options">
    <MultiSelectElement
      v-bind:element="option"
      v-bind:key="index + option.name"
      v-for="(option, index) in options"
    />
  </div>
</template>

<script>
import { MultiSelectElement } from '@/components'

export default {
  props: [
    'options'
  ],
  components: { MultiSelectElement }
}
</script>

<style>
  .multi-select {
    display: block;
    clear: before;
    margin-bottom: 30px;
  }
</style>
