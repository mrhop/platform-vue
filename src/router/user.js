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
import ModuleRoleList from '@/components/user/modulerolelist/ModuleRoleList'
import AddModuleRole from '@/components/user/addmodulerole/AddModuleRole'
import EditModuleRole from '@/components/user/editmodulerole/EditModuleRole'
import ModuleRoleDetail from '@/components/user/moduleroledetail/ModuleRoleDetail'
import ModuleList from '@/components/user/modulelist/ModuleList'
import AddModule from '@/components/user/addmodule/AddModule'
import EditModule from '@/components/user/editmodule/EditModule'
import ModuleDetail from '@/components/user/moduledetail/ModuleDetail'
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
    }, {
      path: '/modulerolelist',
      name: 'ModuleRoleList',
      component: ModuleRoleList
    }, {
      path: '/addmodulerole',
      name: 'AddModuleRole',
      component: AddModuleRole
    }, {
      path: '/editmodulerole',
      name: 'EditModuleRole',
      component: EditModuleRole
    }, {
      path: '/moduleroledetail',
      name: 'ModuleRoleDetail',
      component: ModuleRoleDetail
    }, {
      path: '/modulelist',
      name: 'ModuleList',
      component: ModuleList
    }, {
      path: '/addmodule',
      name: 'AddModule',
      component: AddModule
    }, {
      path: '/editmodule',
      name: 'EditModule',
      component: EditModule
    }, {
      path: '/moduledetail',
      name: 'ModuleDetail',
      component: ModuleDetail
    }, {
      path: '/*',
      name: 'All',
      component: Dashboard
    }
  ]
})
