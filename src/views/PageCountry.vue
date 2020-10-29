<template>
  <div class="section pt-0" v-if="ready" id="detail-page">
    <div class="container mb-6">
      <router-link :to="{ name: 'index' }">
        <b-button id="back" type="is-primary is-light" icon-left="arrow-left"
          >Back</b-button
        >
      </router-link>
    </div>
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child">
            <img :src="country.flag" :alt="country.name" />
          </div>
        </div>
        <div class="tile is-vertical">
          <div class="tile is-parent">
            <div class="tile is-child">
              <h1 class="title is-2 mt-5">{{ country.name }}</h1>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-6">
              <div class="tile is-child">
                <p>
                  <span class="title is-4">Native Name: </span
                  ><span class="subtitle is-4">{{ country.nativeName }}</span>
                </p>
                <p>
                  <span class="title is-4">Population: </span
                  ><span class="subtitle is-4">{{
                    country.population.toLocaleString()
                  }}</span>
                </p>
                <p>
                  <span class="title is-4">Region: </span
                  ><span class="subtitle is-4">{{ country.region }}</span>
                </p>
                <p>
                  <span class="title is-4">Sub Region: </span
                  ><span class="subtitle is-4">{{ country.subregion }}</span>
                </p>
                <p>
                  <span class="title is-4">Capital: </span
                  ><span class="subtitle is-4">{{ country.capital }}</span>
                </p>
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child">
                <p>
                  <span class="title is-4">Top Level Domain: </span
                  ><span class="subtitle is-4">{{ tld(country) }}</span>
                </p>
                <p>
                  <span class="title is-4">Currencies: </span
                  ><span class="subtitle is-4">{{ currencies(country) }}</span>
                </p>
                <p>
                  <span class="title is-4">Languages: </span
                  ><span class="subtitle is-4">{{ languages(country) }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-4">
              <div class="tile is-child">
                <p class="title is-4">Border Countries:</p>
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child">
                <span v-for="border in borders" :key="border.name">
                  <router-link
                    :to="{
                      name: 'country',
                      params: { ccode: border.alpha3Code.toLowerCase() }
                    }"
                  >
                    <b-button type="is-primary" outlined class="mr-2 mb-2">{{
                      border.name
                    }}</b-button>
                  </router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modeMixin from '@/mixins/mode'
export default {
  mixins: [modeMixin],
  props: {
    ccode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ready: false
    }
  },
  computed: {
    country() {
      return this.$store.getters.country
    },
    borders() {
      return this.$store.getters.borders
    }
  },
  methods: {
    tld(country) {
      return country.topLevelDomain.join(', ')
    },
    currencies(country) {
      const curs = []
      country.currencies.forEach(el => curs.push(el.name))
      return curs.join(', ')
    },
    languages(country) {
      const langs = []
      country.languages.forEach(el => langs.push(el.name))
      return langs.join(', ')
    }
  },
  created() {
    this.$store.commit('updateCcode', this.ccode.toUpperCase())
    const cntry = this.$store.getters.countryByCcode
    if (!cntry) {
      this.$store.dispatch('getCountry').then(() => {
        this.ready = true
      })
    } else {
      this.$store.commit('updateCountry', cntry)
      const all = this.$store.getters.all
      const borders = cntry.borders.map(bor =>
        all.find(cntry => cntry.alpha3Code === bor)
      )
      this.$store.commit('updateBorders', borders)
      this.ready = true
    }
  },
  mounted() {
    this.changeBtnStyle(this.$store.getters.darkMode)
  }
}
</script>

<style scoped>
@media (min-width: 769px) and (max-width: 1215px) {
  .title:not(h1),
  .subtitle {
    font-size: 1.25rem;
  }
}
</style>
