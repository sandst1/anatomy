import Vue from 'vue'
import Router from 'vue-router'

import { AnatomyQuiz } from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AnatomyQuiz',
      component: AnatomyQuiz
    }
  ]
})
