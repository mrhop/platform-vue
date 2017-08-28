import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login/Login'
import Registration from '@/components/login/registration/Registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/registration',
      name: 'Registration',
      component: Registration
    }, {
      path: '/*',
      name: 'Login',
      component: Login
    }
  ]
})
