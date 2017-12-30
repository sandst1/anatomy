<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { FETCH_ANATOMY } from '@/store/action-types'

export default {
  name: 'app',
  methods: {
    ...mapActions({
      fetchAnatomy: FETCH_ANATOMY
    })
  },
  mounted: function() {
    this.fetchAnatomy();
  }

}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .row {
    margin: 30px 0;
  }

  .row .label {
    display: block;
    width: 80px;
  }

  .row .value {
    display: block;
    width: 300px;
  }

  .row input.value {
    height: 20px;
    line-height: 20px;
    padding: 5px;
  }
</style>
