import Vue from 'vue'
import Router from 'vue-router'

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/content/${component}.vue`)
}

//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'MainContent', component: load('MainContent') },
    { path: '/painel', name: 'Painel', component: load('Painel') },
    { path: '/servicos', name: 'Servicos', component: load('Servicos') },
    { path: '/login', name: 'Login', component: load('Login') },
    { path: '/hello', name: 'HelloWorld', component: load('HelloWorld') }
  ]
})
