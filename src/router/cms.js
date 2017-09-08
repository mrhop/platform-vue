import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/cms/dashboard/Dashboard'
import ThemeDashboard from '@/components/cms/top/ThemeDashboard'
import WebsiteDashboard from '@/components/cms/top/WebsiteDashboard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/theme/dashboard/',
      name: 'themeDashboard',
      component: ThemeDashboard
    },
    {
      path: '/website/dashboard',
      name: 'websiteDashboard',
      component: WebsiteDashboard
    }, {
      path: '/*',
      name: 'All',
      component: Dashboard
    }
  ]
})
