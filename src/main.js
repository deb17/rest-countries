import Vue from 'vue'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Button from 'buefy/src/components/button'
import Input from 'buefy/src/components/input'
import Select from 'buefy/src/components/select'
import ConfigComponent from 'buefy/src/utils/ConfigComponent.js'

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
ConfigComponent.setOptions({
  defaultIconPack: 'fas',
  defaultContainerElement: '#content'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
