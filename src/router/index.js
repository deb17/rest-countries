import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/PageIndex.vue'
import Country from '../views/PageCountry.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/:ccode',
    name: 'country',
    component: Country,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
