import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/user/dashboard/Dashboard'
import UserList from '@/components/user/userlist/UserList'
import AddUser from '@/components/user/adduser/AddUser'
import EditUser from '@/components/user/edituser/EditUser'
import UserDetail from '@/components/user/userdetail/UserDetail'
import PersonalInfo from '@/components/user/personalinfo/PersonalInfo'
import RoleList from '@/components/user/rolelist/RoleList'
import AppList from '@/components/user/applist/AppList'
import AddApp from '@/components/user/addapp/AddApp'
import EditApp from '@/components/user/editapp/EditApp'
import AppDetail from '@/components/user/appdetail/AppDetail'
import ResourceScopeList from '@/components/user/resourcescopelist/ResourceScopeList'
import AddResourceScope from '@/components/user/addresourcescope/AddResourceScope'
import EditResourceScope from '@/components/user/editresourcescope/EditResourceScope'
import ResourceScopeDetail from '@/components/user/resourcescopedetail/ResourceScopeDetail'
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
      path: '/edituser',
      name: 'EditUser',
      component: EditUser
    }, {
      path: '/userdetail',
      name: 'UserDetail',
      component: UserDetail
    }, {
      path: '/personalinfo',
      name: 'PersonalInfo',
      component: PersonalInfo
    }, {
      path: '/rolelist',
      name: 'RoleList',
      component: RoleList
    }, {
      path: '/applist',
      name: 'AppList',
      component: AppList
    }, {
      path: '/addapp',
      name: 'AddApp',
      component: AddApp
    }, {
      path: '/editapp',
      name: 'EditApp',
      component: EditApp
    }, {
      path: '/appdetail',
      name: 'AppDetail',
      component: AppDetail
    }, {
      path: '/resourcescopelist',
      name: 'ResourceScopeList',
      component: ResourceScopeList
    }, {
      path: '/addresourcescope',
      name: 'AddResourceScope',
      component: AddResourceScope
    }, {
      path: '/editresourcescope',
      name: 'EditResourceScope',
      component: EditResourceScope
    }, {
      path: '/resourcescopedetail',
      name: 'ResourceScopeDetail',
      component: ResourceScopeDetail
    }
  ]
})
