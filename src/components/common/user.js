/**
 * Created by Donghui Huo on 2017/3/21.
 */
// global.basePath = '/test_a1b2/'
let basePath = 'http://localhost:9091/'
var commonUrls = {
  leftTree: 'http://localhost:8080/static/demo-data/user/tree.json',
  userList: basePath + 'user/list',
  setUserEnabled: basePath + 'user/setEnabled',
  deleteUser: basePath + 'user/delete',
  userInfo: basePath + 'user/info',
  userFormRuleUpdate: basePath + 'user/form/rulechange',
  personalInfo: basePath + 'user/',
  personalUpdate: basePath + 'user/personal/update',
  userUpdate: basePath + 'user/update',
  userSave: basePath + 'user/save',
  roleList: basePath + 'role/list',
  // app
  appList: basePath + 'client/list',
  deleteApp: basePath + 'client/delete',
  appInfo: basePath + 'client/info',
  appUpdate: basePath + 'client/update',
  appSave: basePath + 'client/save',
  appFormRuleUpdate: basePath + 'client/form/rulechange',
  // resource scope
  resourceScopeList: basePath + 'resourcescope/list',
  deleteresourceScope: basePath + 'resourcescope/delete',
  resourceScopeInfo: basePath + 'resourcescope/info',
  resourceScopeUpdate: basePath + 'resourcescope/update',
  resourceScopeSave: basePath + 'resourcescope/save',

  vuerouter: {
    adduser: 'adduser',
    edituser: 'edituser',
    userdetail: 'userdetail',
    userlist: 'userlist',
    addapp: 'addapp',
    editapp: 'editapp',
    appdetail: 'appdetail',
    applist: 'applist',
    addresourcescope: 'addresourcescope',
    editresourcescope: 'editresourcescope',
    resourcescopedetail: 'resourcescopedetail',
    resourcescopelist: 'resourcescopelist'
  }
}
export {
  commonUrls
}
