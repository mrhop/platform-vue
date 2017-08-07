/**
 * Created by Donghui Huo on 2017/3/21.
 */
// global.basePath = '/test_a1b2/'
let basePath = 'http://localhost:9091/'
var commonUrls = {
  leftTree: 'http://localhost:8080/static/demo-data/user/tree.json',
  userList: basePath + 'user/list',
  deleteUser: basePath + 'user/delete',
  userInfo: basePath + 'user/info',
  userFormRuleUpdate: basePath + 'user/form/rulechange',
  personalInfo: basePath + 'user/',
  personalUpdate: basePath + 'user/personal/update',
  userUpdate: basePath + 'user/update',
  userSave: basePath + 'user/save',
  vuerouter: {
    adduser: 'adduser',
    edituser: 'edituser',
    userdetail: 'userdetail',
    userlist: 'userlist'
  }
}
export {
  commonUrls
}
