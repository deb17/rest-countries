<template>
  <div v-if="countries.length > 0">
    <div class="section pt-3">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <b-input
              placeholder="Search for a country..."
              type="search"
              icon="search"
              size="is-medium"
              v-model="name"
            >
            </b-input>
          </div>
          <div class="level-right">
            <b-select placeholder="Filter by region" v-model="region">
              <option :value="null">All</option>
              <option v-for="option in regions" :value="option" :key="option">
                {{ option }}
              </option>
            </b-select>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div
            class="column is-one-quarter"
            v-for="country in countries"
            :key="country.name"
          >
            <router-link
              :to="{
                name: 'country',
                params: { ccode: country.alpha3Code.toLowerCase() }
              }"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="country.flag" alt="Flag" />
                  </figure>
                </div>
                <div class="card-content">
                  <h4 class="title is-4 has-text-centered">
                    {{ country.name }}
                  </h4>
                  <div>
                    <span>Population:</span>
                    {{ country.population.toLocaleString() }}
                  </div>
                  <div><span>Region:</span> {{ country.region }}</div>
                  <div><span>Capital:</span> {{ country.capital }}</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      region: null
    }
  },
  computed: {
    countries() {
      const all = this.$store.getters.all
      const some = all.filter(cntry =>
        cntry.name.toLowerCase().startsWith(this.name)
      )
      if (this.region !== null) {
        return some.filter(cntry => cntry.region === this.region)
      }
      return some
    },
    regions() {
      return this.$store.getters.regions
    }
  },
  created() {
    const all = this.$store.getters.all
    if (all.length === 0) {
      this.$store.dispatch('getAll')
    }
  }
}
</script>

<style scoped></style>
