import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],  // Plugin koji cuva state i nakon refresh-a.
  state: {
    jwt: "",
    email: "",
    name: "",
    surname: "",
    id: "",
    role: "",
    pharmacyid: ""
  },
  mutations: {
    'SET_JWT'(state, jwt) { state.jwt = jwt },
    'SET_EMAIL'(state, email) { state.email = email },
    'SET_NAME'(state, name) { state.name = name },
    'SET_SURNAME'(state, surname) { state.surname = surname },
    'SET_ID'(state, id) { state.id = id },
    'SET_ROLE'(state, role) { state.role = role },
    'SET_PHARMACYID'(state, pharmacyid) { state.pharmacyid = pharmacyid },
  },
  actions: {
    setJwt({ commit }, jwt) { commit("SET_JWT", jwt) },
    setEmail({ commit }, email) { commit("SET_EMAIL", email) },
    setName({ commit }, name) { commit("SET_NAME", name) },
    setSurname({ commit }, surname) { commit("SET_SURNAME", surname) },
    setId({ commit }, id) { commit("SET_ID", id) },
    setRole({ commit }, role) { commit("SET_ROLE", role) },
    setPharmacyid({ commit }, pharmacyid) { commit("SET_PHARMACYID", pharmacyid) },
  },
  getters: {
    getJwt: (state) => state.jwt,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getSurname: (state) => state.surname,
    getId: (state) => state.id,
    getRole: (state) => state.role,
    getPharmacyid: (state) => state.pharmacyid,
  },
})

export default store;
