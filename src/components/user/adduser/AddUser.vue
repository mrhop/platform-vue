<template>
  <div class="form-user-detail form-detail">
    <panel>
      <h1 slot="header">新增用户</h1>
      <vform id="user-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import axios from 'axios'
  import {commonUrls} from '../../common/user'
  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  export default{
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.userlist
        },
        actions: {
          init: function (params) {
             // 首先需要考虑权限，然后给出rule change
            let config = {
              url: commonUrls.userFormRuleUpdate,
              method: 'get'
            }
              let rules = {
                'items': [
                  {
                    'name': 'username',
                    'label': '账号',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'name',
                    'label': '姓名',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'phone',
                    'label': '电话',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'email',
                    'label': 'Email',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'enabledStr',
                    'label': '是否激活',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'limitedDate',
                    'label': '有效期',
                    'type': 'date',
                    'locked': true
                  },
                  {
                    'name': 'authoritiesStr',
                    'label': '权限',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'clientsStr',
                    'label': '关联客户端',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'modulesAuthoritiesStr',
                    'label': '模块权限',
                    'type': 'text',
                    'locked': true
                  }
                ],
                action: {
                  save: {
                    label: '保存'
                  },
                  reset: {
                    label: '重置'
                  },
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              if (response.data) {
                for (var key in rules.items) {
                  if (response.data.hasOwnProperty(rules.items[key].name)) {
                    // 选项的设计
                    rules.items[key].items = response.data[rules.items[key].name]
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'user-add-form',
                data: {
                  rules
                }
              })
            }
          },
          save: function (params) {
            if (params.key) {
              console.log('save data by key:' + params.key)
            }
            if (params.data) {
              console.log('these data will be saved:' + JSON.stringify(params.data))
            }
            if (params.multipart) {
              console.log('we shall transfer these data to server by multipart type')
            }
            return {
              success: {
                title: '保存数据',
                message: '保存成功'
              }
            }
          },
          ruleChange: function (params) {
            if (params.parameters) {
              console.log('change rule data by key:' + JSON.stringify(params.data))
            }
            const data = params.parameters
            if (data && data.testRadio) {
              if (data.testRadio === '1') {
                return [
                  {
                    'name': 'ruleChange1',
                    'hidden': false
                  }, {
                    'name': 'ruleChange2',
                    'hidden': true
                  }, {
                    'name': 'ruleChange3',
                    'hidden': true
                  }
                ]
              } else if (data.testRadio === '2') {
                return [
                  {
                    'name': 'ruleChange1',
                    'hidden': true
                  }, {
                    'name': 'ruleChange2',
                    'hidden': false
                  }, {
                    'name': 'ruleChange3',
                    'hidden': true
                  }
                ]
              } else if (data.testRadio === '3') {
                return [
                  {
                    'name': 'ruleChange1',
                    'hidden': true
                  },
                  {
                    'name': 'ruleChange2',
                    'hidden': true
                  },
                  {
                    'name': 'ruleChange3',
                    'defaultValue': '联动测试3' + new Date().getMilliseconds(),
                    'hidden': false
                  }
                ]
              }
            }
            if (data && data.addLine) {
              // add line
              if (!formLineAdd.add1) {
                formLineAdd.add1 = true
                return [
                  {
                    'name': 'testInline4',
                    'hidden': false
                  }, {
                    'name': 'testInline5',
                    'hidden': false
                  }, {
                    'name': 'delLine1',
                    'hidden': false
                  }
                ]
              } else if (!formLineAdd.add2) {
                formLineAdd.add2 = true
                return [
                  {
                    'name': 'testInline6',
                    'hidden': false
                  }, {
                    'name': 'testInline7',
                    'hidden': false
                  }, {
                    'name': 'delLine2',
                    'hidden': false
                  }
                ]
              }
            }
            if (data && data.delLine1) {
              formLineAdd.add1 = false
              return [
                {
                  'name': 'testInline4',
                  'hidden': true
                }, {
                  'name': 'testInline5',
                  'hidden': true
                }, {
                  'name': 'delLine1',
                  'hidden': true
                }
              ]
            }
            if (data && data.delLine2) {
              formLineAdd.add2 = false
              return [
                {
                  'name': 'testInline6',
                  'hidden': true
                }, {
                  'name': 'testInline7',
                  'hidden': true
                }, {
                  'name': 'delLine2',
                  'hidden': true
                }
              ]
            }
          },
          reset: function (params) {
            if (params.key) {
              console.log('reset form by key:' + params.key)
            }
            formLineAdd = {add1: false, add2: false}
          },
        }
      }
    },
    components: {
      panel, vform
    }
  }
</script>

<style scoped>

</style>
