import Vue from 'vue'
import App from './App'
import router from './router'
import header from '@/content/Header.vue'
Vue.component('app-header', header)

import VueResource from 'vue-resource'
Vue.use(VueResource)

require('@/assets/sass/main.scss')

Vue.config.productionTip = false

import data from './dados.js'
Vue.component(data)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
