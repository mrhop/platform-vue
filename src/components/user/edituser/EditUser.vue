<template>
  <div class="form-user-detail form-detail">
    <panel>
      <h1 slot="header">更新用户</h1>
      <vform id="user-update-form" :actions="actions" :actionUrls="actionUrls"
             v-on:afterSaved="backToUserList"></vform>
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
    url: commonUrls.userInfo,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.userFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.userlist
//          saveUrl: commonUrls.userUpdate
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              ruleChangeConfig.params = {key: params.key}
              delete ruleChangeConfig.data
              axios.request(ruleChangeConfig).then(function (responseInnner) {
                let clientsDefaultValue = []
                if (responseInnner.data.clients) {
                  for (let key in responseInnner.data.clients) {
                    if (responseInnner.data.clients[key].selected) {
                      clientsDefaultValue.push(responseInnner.data.clients[key].value)
                    }
                  }
                }
                let modulesAuthoritiesDefaultValue = []
                if (responseInnner.data.modulesAuthorities) {
                  for (let key in responseInnner.data.modulesAuthorities) {
                    if (responseInnner.data.modulesAuthorities[key].selected) {
                      modulesAuthoritiesDefaultValue.push(responseInnner.data.modulesAuthorities[key].value)
                    }
                  }
                }
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
                      'required': false,
                      'ruleChange': true
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
                      'name': 'enabled',
                      'label': '是否激活',
                      'type': 'select',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      'items': [
                        {
                          'label': '激活',
                          'value': true
                        },
                        {
                          'label': '未激活',
                          'value': false
                        }
                      ],
                      'defaultValue': response.data.enabled
                    },
                    {
                      'name': 'limitedDate',
                      'label': '有效期',
                      'type': 'date',
                      'defaultValue': response.data.limitedDate
                    },
                    {
                      'name': 'authoritiesKey',
                      'label': '权限',
                      'type': 'select',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      'ruleChange': true,
                      'items': responseInnner.data.authorities,
                      'defaultValue': response.data.authoritiesKey
                    },
                    {
                      'name': 'clients',
                      'label': '关联客户端',
                      'type': 'checkbox',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      'hidden': response.data.authoritiesKey === 'ROLE_super_admin',
                      'ruleChange': true,
                      'items': responseInnner.data.clients,
                      'defaultValue': clientsDefaultValue
                    },
                    {
                      'name': 'modulesAuthorities',
                      'label': '模块权限',
                      'type': 'checkbox',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      'hidden': response.data.authoritiesKey !== 'ROLE_common_user',
                      'items': responseInnner.data.modulesAuthorities,
                      'defaultValue': modulesAuthoritiesDefaultValue
                    }
                  ],
                  action: {
                    save: {
                      label: '更新'
                    },
                    reset: {
                      label: '重置'
                    },
                    backup: {
                      label: '返回列表'
                    }
                  }
                }
                global.store.commit('FORM_SUCCESS', {
                  id: 'user-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'user-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'user-update-form',
                error
              })
            })
          },
          save: function ({key, data, multipart}) {
            let config = {
              headers: {'Content-Type': 'multipart/form-data'},
              url: commonUrls.userUpdate,
              method: 'post',
              params: {key},
              data: this.$Vue.generateFormData(data)
            }
            const _this = this
            axios.request(config).then(function (response) {
              if (response.data && response.data.error) {
                global.store.commit('FORM_SAVE_SUCCESS', {
                  id: 'user-update-form',
                  data: response.data
                })
              } else if (response.data && response.data.success) {
                _this.$router.push(commonUrls.vuerouter.userlist)
              }
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {
                id: 'user-update-form',
                error
              })
            })
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.authoritiesKey) {
              if (params.changed.authoritiesKey === 'ROLE_super_admin') {
                return [
                  {
                    'name': 'clients',
                    'hidden': true
                  },
                  {
                    'name': 'modulesAuthorities',
                    'hidden': true
                  }
                ]
              } else if (params.changed.authoritiesKey === 'ROLE_admin') {
                return [
                  {
                    'name': 'clients',
                    'hidden': false
                  },
                  {
                    'name': 'modulesAuthorities',
                    'hidden': true
                  }
                ]
              } else {
                for (let key in params.items) {
                  if (params.items[key].name === 'clients') {
                    if (params.items[key].defaultValue.length > 0) {
                      ruleChangeConfig.data = {'clients': params.items[key].defaultValue}
                      axios.request(ruleChangeConfig).then(function (response) {
                        global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                          id: 'user-update-form',
                          data: [
                            {
                              'name': 'clients',
                              'hidden': false
                            },
                            {
                              'name': 'modulesAuthorities',
                              'items': response.data.modulesAuthorities || [],
                              'hidden': false
                            }
                          ]
                        })
                      }).catch(function (error) {
                        console.log(error)
                      })
                      return
                    }
                  }
                }
                return [
                  {
                    'name': 'clients',
                    'hidden': false
                  },
                  {
                    'name': 'modulesAuthorities',
                    'hidden': false
                  }
                ]
              }
            } else if (params.changed.clients) {
              for (let key in params.items) {
                if (params.items[key].name === 'authoritiesKey') {
                  if (params.items[key].defaultValue === 'ROLE_common_user') {
                    if (params.changed.clients.length > 0) {
                      ruleChangeConfig.data = params.changed
                      axios.request(ruleChangeConfig).then(function (response) {
                        global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                          id: 'user-update-form',
                          data: [
                            {
                              'name': 'modulesAuthorities',
                              'items': response.data.modulesAuthorities || [],
                              'hidden': false
                            }
                          ]
                        })
                      }).catch(function (error) {
                        console.log(error)
                      })
                    } else {
                      return [
                        {
                          'name': 'modulesAuthorities',
                          'items': [],
                          'hidden': false
                        }
                      ]
                    }
                  }
                }
              }
            } else if (params.changed.repassword !== undefined) {
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
    methods: {
      backToUserList: function () {
        this.$router.push(commonUrls.vuerouter.userlist)
      }
    },
    components: {
      panel, vform
    }
  }
</script>

<style scoped>

</style>
