import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/user/dashboard/Dashboard'
import UserList from '@/components/user/userlist/UserList'
import AddUser from '@/components/user/adduser/AddUser'
import PersonalInfo from '@/components/user/personalinfo/PersonalInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }, {
      path: '/userlist',
      name: 'UserList',
      component: UserList
    }, {
      path: '/adduser',
      name: 'AddUser',
      component: AddUser
    }, {
      path: '/personalinfo',
      name: 'PersonalInfo',
      component: PersonalInfo
    }
  ]
})
