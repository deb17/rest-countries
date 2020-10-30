<template>
  <b-button
    id="dark-mode"
    :size="btnSize"
    icon-pack="far"
    :icon-left="darkMode ? 'sun' : 'moon'"
    @click="darkMode = !darkMode"
  >
    {{ switchTo }} mode
  </b-button>
</template>

<script>
import modeMixin from '@/mixins/mode'
export default {
  mixins: [modeMixin],
  data() {
    return {
      darkMode: false,
      width: window.innerWidth
    }
  },
  computed: {
    activeClass() {
      if (this.darkMode) {
        return 'dark-theme'
      }
      return 'light-theme'
    },
    switchTo() {
      return this.darkMode ? 'Light' : 'Dark'
    },
    btnSize() {
      if (this.width < 375) {
        return 'is-small'
      }
      return ''
    }
  },
  watch: {
    darkMode: {
      handler: function(newvalue) {
        document.querySelector('body').className = this.activeClass
        this.$store.commit('updateDarkMode', newvalue)
        this.changeBtnStyle(newvalue)
      },
      immediate: true
    }
  }
}
</script>

<style>
* {
  transition: background-color 0.6s ease;
}
#detail-page button {
  transition: none;
}
:root {
  --dark-blue: hsl(209, 23%, 22%);
  --very-dark-blue-1: hsl(207, 26%, 17%);
  --very-dark-blue-2: hsl(200, 15%, 8%);
  --dark-gray: hsl(0, 0%, 52%);
  --very-light-gray: hsl(0, 0%, 98%);
  --white: hsl(0, 0%, 100%);
}
.dark-theme {
  --elements: var(--dark-blue);
  --main-bg: var(--very-dark-blue-1);
  --text: var(--very-light-gray);
  --input: var(--very-light-gray);
}
.light-theme {
  --elements: var(--white);
  --main-bg: var(--very-light-gray);
  --text: var(--very-dark-blue-2);
  --input: var(--dark-gray);
}
body,
html {
  background-color: var(--main-bg);
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  overflow-y: auto;
}
#detail-page .title {
  font-weight: 600;
  color: var(--text);
}
#detail-page .subtitle {
  font-weight: 300;
  color: var(--text);
}
#heading h3 {
  font-weight: 800;
  color: var(--text);
}
#heading,
.card,
.card h4 {
  background-color: var(--elements);
  color: var(--text);
}
.card span {
  font-weight: 600;
}
#not-found {
  font-weight: 600;
  color: var(--text);
}
.input,
.input::placeholder,
.fa-search,
.select select,
option,
#dark-mode {
  background-color: var(--elements) !important;
  color: var(--input) !important;
}
span.select::after {
  border-color: var(--input) !important;
}
.light-theme ::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  background: url(../assets/cancel1.svg) center;
}
.dark-theme ::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  background: url(../assets/cancel2.svg) center;
}
@media (max-width: 375px) {
  body {
    font-size: 14px;
  }
}
</style>
