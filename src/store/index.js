import Vue from 'vue'
import Vuex from 'vuex'
import ucnew from './modules/ucnew'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    ucnew
  }
})

export default store
