import Vue from 'vue'
import Vuex from 'vuex'
import bd from './modules/baidu'
import uc from './modules/uc'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    uc,
    bd
  }
})

export default store
