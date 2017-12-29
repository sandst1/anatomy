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
</style>
