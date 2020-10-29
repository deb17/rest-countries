import Vue from 'vue'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
