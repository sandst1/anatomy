<template>
  <div>
    <div class="row">
      <span class="label">Suomeksi:</span>
      <span class="value" v-if="answerInLat">{{nameFi}}</span>
      
      <ValidatingInput 
        v-if="!answerInLat"
        v-bind:correct-value="nameFi"/>
    </div>
    <div class="row">
      <span class="label">Latinaksi</span>
      <span class="value" v-if="!answerInLat">{{nameLat}}</span>
      <ValidatingInput
        v-if="answerInLat" 
        v-bind:correct-value="nameLat"/>
    </div>
  </div>
</template>

<script>
import { ValidatingInput } from '@/components'

export default {
  components: {
    ValidatingInput
  },
  props: [
    'nameFi',
    'nameLat',
    'answerInLat'
  ]
}
</script>

<style>
</style>
