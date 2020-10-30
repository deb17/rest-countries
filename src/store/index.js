import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    ccode: '',
    country: {},
    borders: [],
    darkMode: false
  },
  getters: {
    all(state) {
      return state.countries
    },
    regions(state) {
      const set = new Set()
      state.countries.forEach(cntry => set.add(cntry.region))
      return set
    },
    countryByCcode(state) {
      return state.countries.find(cntry => cntry.alpha3Code === state.ccode)
    },
    country(state) {
      return state.country
    },
    borders(state) {
      return state.borders
    },
    darkMode(state) {
      return state.darkMode
    }
  },
  mutations: {
    updateCountries(state, payload) {
      state.countries = payload
    },
    updateCountry(state, payload) {
      state.country = payload
    },
    updateBorders(state, payload) {
      state.borders = payload
    },
    updateCcode(state, payload) {
      state.ccode = payload
    },
    updateDarkMode(state, payload) {
      state.darkMode = payload
    }
  },
  actions: {
    getAll() {
      return fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data => this.commit('updateCountries', data))
        .catch(err => console.log(err))
    },
    getCountry({ state }) {
      return fetch('https://restcountries.eu/rest/v2/alpha/' + state.ccode)
        .then(res => res.json())
        .then(data => {
          this.commit('updateCountry', data)
          return data.borders
        })
        .then(borders =>
          fetch(
            `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(';')}`
          )
        )
        .then(res => {
          if (res.status !== 200) {
            return []
          } else {
            return res.json()
          }
        })
        .then(data => this.commit('updateBorders', data))
        .catch(err => console.log(err))
    }
  },
  modules: {}
})
