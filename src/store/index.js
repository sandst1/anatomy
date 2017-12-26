import Vue from 'vue'
import Vuex from 'vuex'

import { FETCH_ANATOMY } from './action-types'
import AnatomyService from '@/service/anatomy'

Vue.use(Vuex);

export const state = {
  muscles: [],
  vessels: [],
  joints: [],
  spine: []
}

export const actions = {
  async [FETCH_ANATOMY] ({commit}) {
    const data = await AnatomyService.fetchAnatomy();
    commit('parseAnatomy', data);
  }
}

export const getters = {

}

export const mutations = {
  parseAnatomy: (state, anatomy) => {
    Object.assign(state, anatomy);

    console.dir(state);
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
