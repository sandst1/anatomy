<template>
  <div>
    <h2>Lihakset</h2>
    <div v-if="currentMuscle" class="container">
      <NameQuestion
        v-bind:name-fi="currentMuscle.nameFi"
        v-bind:name-lat="currentMuscle.nameLat"
        v-bind:answer-in-lat="answerInLat"
        />

      <h3>Valitse origo(t) ({{currentMuscle.origin.length}} kpl)</h3>
      <MultiSelectQuestion
        v-bind:options="withRandomLandmarks(currentMuscle.origin)"/>

      <h3>Valitse insertio(t) ({{currentMuscle.insertion.length}} kpl)</h3>
      <MultiSelectQuestion
        v-bind:options="withRandomLandmarks(currentMuscle.insertion)"/>
      
    </div>
    <div>
      <button v-bind:disabled="false" @click="switchMuscle()">Seuraava</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_CURRENT_MUSCLE, GET_WITH_RANDOM_LANDMARKS } from '@/store/getters'
import { NEXT_MUSCLE } from '@/store/action-types'
import { RESET_COMPONENTS } from '@/constants'

import { NameQuestion, MultiSelectQuestion } from '@/components'

export default {
  components: {
    NameQuestion,
    MultiSelectQuestion
  },
  data: function() {
    return {
      answerInLat: false,
      muscleCount: 0,
      rightAnswers: 0
    }
  },
  computed: {
    ...mapGetters({
      currentMuscle: GET_CURRENT_MUSCLE,
      withRandomLandmarks: GET_WITH_RANDOM_LANDMARKS
    }),
  },
  methods: {
    ...mapActions({
      nextMuscle: NEXT_MUSCLE
    }),
    switchMuscle() {
      this.answer = { nameFi: null, nameLat: null }
      this.answerInLat = Math.random() < 0.5;
      this.$bus.$emit(RESET_COMPONENTS);
      this.nextMuscle();
    }
  },
  mounted: function() {
    this.answerInLat = Math.random() < 0.5;
  }
}
</script>

<style>
  .answer-path-right {
    background: #00ff00;
  }

  .container {
    width: 95vw;
    height: auto;
    border: 1px solid #cccccc;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
  }
</style>
