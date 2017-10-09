import Vue from 'vue'
import Router from 'vue-router'
import Browse from '@/components/file/browse/Browse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Browse',
      component: Browse
    },
    {
      path: '/*',
      name: 'All',
      component: Browse
    }
  ]
})
