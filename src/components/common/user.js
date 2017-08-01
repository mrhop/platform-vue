/**
 * Created by Donghui Huo on 2017/3/21.
 */
// global.basePath = '/test_a1b2/'
let basePath = 'http://localhost:9090/'
var commonUrls = {
  leftTree: 'http://localhost:8080/static/demo-data/user/tree.json',
  userList: basePath + 'user/list',
  deleteUser: basePath + 'http://localhost:9090/user/delete',
  userInfo: basePath + 'http://localhost:9090/user/info',
  personalInfo: basePath + 'http://localhost:9090/user/',
  personalUpdate: basePath + 'http://localhost:9090/user/personal/update',
  userUpdate: basePath + 'http://localhost:9090/user/update',
  userSave: basePath + 'http://localhost:9090/user/save',
  vuerouter: {
    adduser: 'adduser',
    edituser: 'edituser',
    userdetail: 'userdetail'
  }
}

export {
  commonUrls
}
