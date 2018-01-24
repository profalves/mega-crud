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

//============== FILTERS =================

Vue.filter('formatMoney', function (value) {
    if(!value) {return 'R$ 0,00'}
    function numberToReal(numero) {
        numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
    let x = numberToReal(value);
    return x
})

Vue.filter('formatPerc', function (value) {
    if(!value) {return '0,00 %'}
    function numberToReal(numero) {
        numero = numero.toFixed(2).split('.');
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',') + ' %';
    }
    let x = numberToReal(value);
    return x
})

Vue.filter('formatDate', function (value) {
    if(value === null) {return null}
    return new Date(value).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
})

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString().toLowerCase()
    return value.charAt(0).toUpperCase() + value.slice(1)
})



/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
