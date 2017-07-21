/**
 * Created by Donghui Huo on 2017/3/21.
 */
// global.basePath = '/test_a1b2/'
global.basePath = ''
var commonUrls = {
  leftTree: global.basePath + 'static/demo-data/tree.json',
  leftTreeDemo: global.basePath + 'static/demo-data/tree/tree.json',
  testTreeWithTableInit: global.basePath + 'static/demo-data/treeWithTable/tree.json',
  testEditTreeInit: global.basePath + 'static/demo-data/editTree/tree.json',
  testEditTreeSave: global.basePath + 'data/tree-item-save.html',
  testEditTreeDelete: global.basePath + 'data/tree-item-delete.html',
  testEditTreeUpdate: global.basePath + 'data/tree-item-update.html',
  testTableInit: global.basePath + 'data/table.html',
  testTableForTreeInit: global.basePath + 'data/tablefortree.html',
  testTableRowDel: global.basePath + 'data/table-delete.html',
  testFormInit: global.basePath + 'data/form-init.html',
  testFormReset: global.basePath + 'data/form-reset.html',
  testFormSave: global.basePath + 'data/form-save.html',
  testFormRuleChange: global.basePath + 'data/form-rulechange.html',
  vuerouter: {
    testTable: 'table',
    testForm: 'form'
  },
  login: {
    login: global.basePath + 'data/login.html',
    registrationPage: 'registration',
    registration: global.basePath + 'data/registration.html',
    loginPage: '/'
  }
}

export {
  commonUrls
}
