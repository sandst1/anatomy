<template>
  <div>
    <h2>Lihakset</h2>
    <div v-if="currentMuscle" class="container">
      <NameQuestion
        v-bind:name-fi="currentMuscle.nameFi"
        v-bind:name-lat="currentMuscle.nameLat"
        v-bind:answer-in-lat="answerInLat"
        />

    
      
    </div>
    <div>
      <button v-bind:disabled="false" @click="switchMuscle()">Seuraava</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_CURRENT_MUSCLE } from '@/store/getters'
import { NEXT_MUSCLE } from '@/store/action-types'
import { RESET_COMPONENTS } from '@/constants'

import { NameQuestion } from '@/components'

export default {
  components: {
    NameQuestion
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
      currentMuscle: GET_CURRENT_MUSCLE
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
  .answer-indicator {
    width: 200px;
    height: 30px;
    margin: 0 auto;
    background: #ff0000;
  }

  .answer-path-right {
    background: #00ff00;
  }

  .container {
    width: 35vw;
    border: 1px solid #cccccc;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
  }
</style>
