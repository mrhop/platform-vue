<template>
  <div class="form-user-detail form-detail">
    <panel>
      <h1 slot="header">个人信息</h1>
      <vform id="user-personal-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import axios from 'axios'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.personalInfo,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          saveUrl: commonUrls.personalUpdate
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            axios.request(initConfig).then(function (response) {
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
                    'placeholder': '账号',
                    'defaultValue': response.data.username
                  },
                  {
                    'name': 'password',
                    'label': '密码',
                    'type': 'password',
                    'placeholder': '密码',
                    'validate': [{
                      'errorMsg': '至少包含数字，字母以及特殊字符【!@#$%^&*_】中任意两种,并在5-15字符之间',
                      'regex': '^(?![a-zA-Z]+$)(?!\\d+$)(?![!@#$%^&*_]+$)[\\w!@#$%^&*]{5,15}$'
                    }],
                    'ruleChange': true,
                    'required': false
                  },
                  {
                    'name': 'repassword',
                    'label': '重复密码',
                    'type': 'password',
                    'placeholder': '重复密码',
                    'ruleChange': true
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
                    'placeholder': '姓名',
                    'defaultValue': response.data.name
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
                    'placeholder': '手机号',
                    'defaultValue': response.data.phone
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
                    'placeholder': 'Email',
                    'defaultValue': response.data.email
                  },
                  {
                    'name': 'photoFiles',
                    'label': '头像',
                    'type': 'image',
                    'validate': [{
                      'errorMsg': '只能为图片文件',
                      'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                    }],
                    'maxSize': 50000,
                    'path': response.data.photo ? [response.data.photo] : undefined,
                    'required': false
                  },
                  {
                    'name': 'enabledStr',
                    'label': '是否激活',
                    'type': 'text',
                    'locked': true,
                    'defaultValue': response.data.enabledStr
                  },
                  {
                    'name': 'limitedDate',
                    'label': '有效期',
                    'type': 'date',
                    'locked': true,
                    'defaultValue': response.data.limitedDate
                  },
                  {
                    'name': 'authoritiesStr',
                    'label': '权限',
                    'type': 'text',
                    'locked': true,
                    'defaultValue': response.data.authoritiesStr
                  },
                  {
                    'name': 'clientsStr',
                    'label': '关联客户端',
                    'type': 'text',
                    'locked': true,
                    'hidden': !response.data.clientsStr,
                    'defaultValue': response.data.clientsStr
                  },
                  {
                    'name': 'modulesAuthoritiesStr',
                    'label': '模块权限',
                    'type': 'text',
                    'locked': true,
                    'hidden': !response.data.modulesAuthoritiesStr,
                    'defaultValue': response.data.modulesAuthoritiesStr
                  }
                ],
                action: {
                  save: {
                    label: '更新'
                  },
                  reset: {
                    label: '重置'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'user-personal-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              console.log(error)
            })
          },
          ruleChange: function (params) {
            if (params.changed.repassword !== undefined) {
              for (let key in params.items) {
                if (params.items[key].name === 'password') {
                  if (params.items[key].defaultValue !== params.changed.repassword) {
                    return [
                      {
                        'name': 'repassword',
                        'validatedMsg': '密码不一致'
                      }
                    ]
                  } else {
                    return [
                      {
                        'name': 'repassword'
                      }
                    ]
                  }
                }
              }
            } else if (params.changed.password !== undefined) {
              for (let key in params.items) {
                if (params.items[key].name === 'repassword') {
                  if (params.items[key].defaultValue !== params.changed.password) {
                    return [
                      {
                        'name': 'repassword',
                        'validatedMsg': '密码不一致'
                      }
                    ]
                  } else {
                    return [
                      {
                        'name': 'repassword'
                      }
                    ]
                  }
                }
              }
            }
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
