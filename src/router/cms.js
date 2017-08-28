import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/user/dashboard/Dashboard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }, {
      path: '/*',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
