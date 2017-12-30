import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { 
  FETCH_ANATOMY,
  NEXT_MUSCLE
} from './action-types'

import {
  GET_MUSCLES,
  GET_CURRENT_MUSCLE,
  GET_ALL_LANDMARKS,
  GET_WITH_RANDOM_LANDMARKS
} from './getters'

import AnatomyService from '@/service/anatomy'

Vue.use(Vuex);

export const state = {
  muscles: [],
  vessels: [],
  joints: [],
  spine: [],
  
  allLandmarks: [],

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
  },

  [GET_WITH_RANDOM_LANDMARKS]: (state) => (correctLandmarks) => {
    let landmarks = correctLandmarks.map(lm => {
      return {
        name: lm,
        correct: true
      };
    });

    // Mix the correct landmarks with random ones.
    let addCount = landmarks.length;
    addCount = addCount < 4 ? 4 : addCount;

    const landmarksToSample = 
      state.allLandmarks
        .filter(lm => !_.includes(correctLandmarks, lm));

    const randIndexes = 
      _.range(1, addCount + 1, 0)
       .map(num => Math.floor(Math.random() * (landmarksToSample.length)));

    landmarks = landmarks.concat(randIndexes.map((idx) => {
      return {
        name: landmarksToSample[idx],
        correct: false
      };
    }));

    return _.shuffle(_.uniq(landmarks));
  }
}

function nextMuscleIndex(musclesLength) {
  return Math.floor(Math.random() * (musclesLength));
}

export const mutations = {
  parseAnatomy: (state, anatomy) => {
    Object.assign(state, anatomy);

    // Collect all origins and insertions from the muscles and put
    // them into a sorted array without duplicates or empty values
    state.allLandmarks = 
      _.uniq(
        Array.prototype.concat(
          ...state.muscles.map(m => [...m.origin, ...m.insertion])
        )
      )
      .filter(l => l.length > 0)
      .sort();
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
