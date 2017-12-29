<template>
  <div>
    <h2>Quiz</h2>
    <div v-if="currentMuscle">
      <div>{{currentMuscle.nameFi}}</div>
      <div>{{currentMuscle.nameLat}}</div>
      <div v-bind:key="`${index}_${origin}`" v-for="(origin, index) in currentMuscle.origin">{{origin}}</div>
      <div v-bind:key="`${index}_${insertion}`" v-for="(insertion, index) in currentMuscle.insertion">{{insertion}}</div>
    </div>
    <div>
      <button @click="nextMuscle()">Next</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_CURRENT_MUSCLE } from '@/store/getters'
import { NEXT_MUSCLE } from '@/store/action-types'

export default {
  computed: {
    ...mapGetters({
      currentMuscle: GET_CURRENT_MUSCLE
    })
  },
  methods: {
    ...mapActions({
      nextMuscle: NEXT_MUSCLE
    })
  }
}
</script>

<style>

</style>
