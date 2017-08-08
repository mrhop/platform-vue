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
          backupUrl: commonUrls.vuerouter.userlist,
          saveUrl: commonUrls.userSave
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            let config = {
              url: commonUrls.userFormRuleUpdate,
              method: 'post'
            }
            axios.request(config).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'username',
                    'label': '账号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '账号'
                  },
                  {
                    'name': 'name',
                    'label': '姓名',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '账号由英文，数字和 _ 组成，并在2-40个字符之间',
                      'regex': '^\\S{2,40}$'
                    }],
                    'placeholder': '姓名'
                  },
                  {
                    'name': 'phone',
                    'label': '电话',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '请输入正确的手机号',
                      'regex': '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|(17|18)[0|1|2|3|5|6|7|8|9])\\d{8}$'
                    }],
                    'placeholder': '手机号'
                  },
                  {
                    'name': 'email',
                    'label': 'Email',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '请输入正确的Email',
                      'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                    }],
                    'placeholder': 'Email'
                  },
                  {
                    'name': 'photo',
                    'label': '头像',
                    'type': 'file',
                    'validate': [{
                      'errorMsg': '只能为图片文件',
                      'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                    }],
                    'maxSize': 5000
                  },
                  {
                    'name': 'enabledStr',
                    'label': '是否激活',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'defaultValue': true,
                    'items': [
                      {
                        'label': '激活',
                        'value': true
                      },
                      {
                        'label': '未激活',
                        'value': false
                      }
                    ]
                  },
                  {
                    'name': 'limitedDate',
                    'label': '有效期',
                    'type': 'date'
                  },
                  {
                    'name': 'authoritiesStr',
                    'label': '权限',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'ruleChange': true
                  },
                  {
                    'name': 'clients',
                    'label': '关联客户端',
                    'type': 'checkbox',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'hidden': true,
                    'ruleChange': true
                  },
                  {
                    'name': 'modulesAuthorities',
                    'label': '模块权限',
                    'type': 'checkbox',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'hidden': true
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
                if (response.data.authorities) {
                  for (var key in rules.items) {
                    if (rules.items[key].name === 'authorities') {
                      rules.items[key].items = response.data.authorities
                    } else if (rules.items[key].name === 'clients') {
                      if (response.data.authorities.length === 2 && response.data.clients) {
                        rules.items[key].items = response.data.clients
                        delete rules.items['clients'].hidden
                      }
                    }
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'user-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              console.log(error)
            })
          },
          ruleChange: function (params) {
          }
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
