<template>
  <input 
    v-bind:class="{'wrong-answer': !isAnswerOnRightPath, 'right-answer': isAnswerCorrect}"
    class="value"
    v-model="answer"/>
</template>

<script>
import { RESET_COMPONENTS } from '@/constants'

export default {
  props: [
    'correctValue'
  ],
  data() {
    return {
      answer: null,
      isAnswerOnRightPath: true,
      isAnswerCorrect: false
    };
  },
  created() {
    this.$bus.$on(RESET_COMPONENTS, ($event) => {
      this.answer = null;
      this.isAnswerOnRightPath = true;
      this.isAnswerCorrect = false;
    });
  },
  watch: {
    answer: function(val) {
      let lengthMatches = false;
      this.isAnswerOnRightPath = true;
      
      if (!this.answer) {
        return;
      }

      this.isAnswerOnRightPath = this.correctValue.startsWith(this.answer);
      lengthMatches = this.correctValue.length === this.answer.length;

      this.isAnswerCorrect = this.isAnswerOnRightPath && lengthMatches;
    }
  }
}
</script>

<style>
  .wrong-answer {
    background: #ff7a7b;
  }

  .right-answer {
    background: #5cf892;
  }
</style>
