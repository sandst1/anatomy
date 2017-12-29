<template>
  <div>
    <h2>Lihakset</h2>
    <div v-if="currentMuscle" class="container">
      <div class="row">
        <div class="answer-indicator" v-bind:class="{'answer-path-right': isAnswerOnRightPath}">
          <span v-if="isAnswerCorrect">Oikein!</span>
          <span v-if="isAnswerOnRightPath && !isAnswerCorrect">...</span>
          <span v-if="!isAnswerOnRightPath">väärin</span>
        </div>
      </div>
      <div class="row">
        <span class="label">Suomeksi:</span>
        <span class="value" v-if="!showLatinName">{{currentMuscle.nameFi}}</span>
        <input class="value" v-if="showLatinName" v-model="answer.nameFi" placeholder="suomeksi"/>
      </div>
      <div class="row">
        <span class="label">Latinaksi</span>
        <span class="value" v-if="showLatinName">{{currentMuscle.nameLat}}</span>
        <input class="value" v-if="!showLatinName" v-model="answer.nameLat" placeholder="latinaksi"/>
      </div>
    </div>
    <div>
      <button v-bind:disabled="!isAnswerCorrect" @click="switchMuscle()">Seuraava</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_CURRENT_MUSCLE } from '@/store/getters'
import { NEXT_MUSCLE } from '@/store/action-types'

export default {
  data: function() {
    return {
      showLatinName: false,
      answer: {
        nameFi: null,
        nameLat: null
      },
      isAnswerOnRightPath: true,
      isAnswerCorrect: false,
      muscleCount: 0,
      rightAnswers: 0
    }
  },
  computed: {
    ...mapGetters({
      currentMuscle: GET_CURRENT_MUSCLE
    }),
  },
  watch: {
    answer: {
      handler(val) {
        let lengthMatches = false;
        this.isAnswerOnRightPath = true;
        
        if (!this.currentMuscle) {
          return;
        }
        if (this.showLatinName) {
          // Answering in finnish. Empty answer is a non-answer, so it's right by default
          if (!this.answer.nameFi) {
            return;
          }

          this.isAnswerOnRightPath = this.currentMuscle.nameFi.startsWith(this.answer.nameFi);
          lengthMatches = this.currentMuscle.nameFi.length === this.answer.nameFi.length;
        } else {
          // Answering in latin
          if (!this.answer.nameLat) {
            return;
          }
          this.isAnswerOnRightPath = this.currentMuscle.nameLat.startsWith(this.answer.nameLat);
          lengthMatches = this.currentMuscle.nameLat.length === this.answer.nameLat.length
        }

        this.isAnswerCorrect = this.isAnswerOnRightPath && lengthMatches;
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      nextMuscle: NEXT_MUSCLE
    }),
    switchMuscle() {
      this.answer = { nameFi: null, nameLat: null }
      this.isAnswerCorrect = false;
      this.showLatinName = Math.random() < 0.5
      this.nextMuscle();
    }
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
