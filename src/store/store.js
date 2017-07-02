import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  sessionId: null,
  enemySession: null,
  gameStates: [],
  challengeRequests: [],
  challengesSent: [],
  defenderSessionId: null,
  errorMessage: null,
  isInGameSession: false
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  receiveNewRequest (state, payload) {

  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  // receiveNewRequest: ( {commit}, payload ) => {
  //   commit('receiveNewRequest', payload);
  // }
}

// getters are functions
const getters = {
  // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
  isInGameSession: state => state.isInGameSession
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export const globalState = state
