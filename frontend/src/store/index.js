import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state() {
    return {
      authenticated: false,
      token: null,
      userId: null
    }
  },
  mutations: {
    authenticated(state, data){
      state.authenticated = true
      state.token = data.token
      state.userId = date.userId
    },
    logout(state){
      state.authenticated = false
      state.token = null
      state.userId = null
    }
  },
  actions: {
  },
  getters : {
    authenticated: state => state.authenticated,
    token: state => state.token,
    userId: state => state.userId
  },
  modules: [vuexLocal.plugin]
})
