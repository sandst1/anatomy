import Vue from 'vue'
import Vuex from 'vuex'

import { 
  FETCH_ANATOMY,
  NEXT_MUSCLE
} from './action-types'

import {
  GET_MUSCLES,
  GET_CURRENT_MUSCLE
} from './getters'

import AnatomyService from '@/service/anatomy'

Vue.use(Vuex);

export const state = {
  muscles: [],
  vessels: [],
  joints: [],
  spine: [],

  curMuscleIndex: -1
}

export const actions = {
  async [FETCH_ANATOMY] ({commit}) {
    const data = await AnatomyService.fetchAnatomy();
    commit('parseAnatomy', data);
    commit('nextMuscle');
  },

  [NEXT_MUSCLE] ({commit}) {
    commit('nextMuscle');
  }
}

export const getters = {
  [GET_MUSCLES]: (state) => {
    return state.muscles;
  },

  [GET_CURRENT_MUSCLE]: (state) => {
    return state.muscles[state.curMuscleIndex];
  }
}

function nextMuscleIndex(musclesLength) {
  return Math.floor(Math.random() * (musclesLength));
}

export const mutations = {
  parseAnatomy: (state, anatomy) => {
    Object.assign(state, anatomy);
  },

  nextMuscle: (state) => {
    state.curMuscleIndex = nextMuscleIndex(state.muscles.length);
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
