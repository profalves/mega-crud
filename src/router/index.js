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
    { path: '/', name: 'mainContent', component: load('MainContent') },
    { path: '/painel', name: 'painel', component: load('Painel') },
    { path: '/servicos', name: 'servicos', component: load('Servicos') },
    { path: '/login', name: 'login', component: load('Login') },
    { path: '/hello', name: 'hello', component: load('HelloWorld') }
  ]
})
