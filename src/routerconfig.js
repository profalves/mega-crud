import MainContent from './content/MainContent.vue'
import Painel from './content/Painel.vue'
import Servicos from './content/Servicos.vue'
import Login from './content/Login.vue'

const RouterConfig = {
    '/': {
        component: MainContent
    },
    '/painel': {
        component: Painel
    },
    '/servicos': {
        component: Servicos
    },
    '/login': {
        component: Login
    }
}

export default RouterConfig;