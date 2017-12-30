<template>
  <div 
    class="choice"
    @click="toggle()"
    v-bind:class="{right: selected && element.correct, wrong: selected && !element.correct}">
    {{latinOnly(element.name)}}
  </div>
</template>

<script>
export default {
  props: [ 'element' ],
  data() {
    return {
      selected: false
    }
  },
  methods: {
    latinOnly: (name) => name.split('(')[0],
    toggle: function () {
      this.selected = !this.selected;
    }
  }  
}
</script>

<style>
  .choice {
    user-select: none;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    width: 200px;
    height: auto;
    min-height: 60px;
    padding: 5px;
    margin: 5px;
    border: 1px solid #000000;
  }
</style>
