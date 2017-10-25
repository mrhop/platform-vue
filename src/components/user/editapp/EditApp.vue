<template>
  <div class="form-app-detail form-detail">
    <panel>
      <h1 slot="header">更新应用</h1>
      <vform id="app-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.appInfo,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.appFormRuleUpdate,
    method: 'post'
  }
  let scopeIdsItems = []
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.applist
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              ruleChangeConfig.params = {key: params.key}
              delete ruleChangeConfig.data
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'clientName',
                      'label': '应用名称',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                        'regex': '^\\S.{0,38}\\S$'
                      }],
                      'placeholder': '应用名称',
                      'defaultValue': response.data.clientName
                    },
                    {
                      'name': 'clientId',
                      'label': '应用账号',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                        'regex': '^\\w{5,40}$'
                      }],
                      'placeholder': '应用账号',
                      'defaultValue': response.data.clientId,
                      'locked': true
                    },
                    {
                      'name': 'clientSecret',
                      'label': '应用密码',
                      'type': 'password',
                      'placeholder': '应用密码',
                      'validate': [{
                        'errorMsg': '至少包含数字，字母以及特殊字符【!@#$%^&*_】中任意两种,并在5-15字符之间',
                        'regex': '^(?![a-zA-Z]+$)(?!\\d+$)(?![!@#$%^&*_]+$)[\\w!@#$%^&*]{5,15}$'
                      }],
                      'ruleChange': true,
                      required: false
                    },
                    {
                      'name': 'repassword',
                      'label': '重复密码',
                      'type': 'password',
                      'placeholder': '重复密码',
                      'ruleChange': true
                    },
                    {
                      'name': 'authorizedGrantTypes',
                      'label': '授权方式',
                      'type': 'checkbox',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      'items': [
                        {
                          'label': '授权码',
                          'value': 'authorization_code'
                        },
                        {
                          'label': '密码',
                          'value': 'password'
                        },
                        {
                          'label': '客户端',
                          'value': 'client_credentials'
                        }
                      ],
                      'defaultValue': response.data.authorizedGrantTypes
                    },
                    {
                      'name': 'scopeIds',
                      'label': '授权范围',
                      'type': 'checkbox',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      items: responseInner.data.scopeIds ? (scopeIdsItems = responseInner.data.scopeIds) : scopeIdsItems,
                      'defaultValue': response.data.scopeIds ? response.data.scopeIds : [],
                      ruleChange: true
                    },
                    {
                      'name': 'autoApprovaledScopeIds',
                      'label': '自动授权',
                      'type': 'checkbox',
                      items: responseInner.data.autoApprovaledScopeIds ? responseInner.data.autoApprovaledScopeIds : [],
                      'defaultValue': response.data.autoApprovaledScopeIds ? response.data.autoApprovaledScopeIds : [],
                      hidden: !responseInner.data.autoApprovaledScopeIds || responseInner.data.autoApprovaledScopeIds.length === 0
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
                  id: 'app-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'app-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'app-update-form',
                error
              })
            })
          },
          save: function ({key, data, multipart}) {
            let config = {
              url: commonUrls.appUpdate,
              method: 'post',
              params: {key},
              data: data
            }
            const _this = this
            axios.request(config).then(function (response) {
              if (response.data && response.data.error) {
                global.store.commit('FORM_SAVE_SUCCESS', {
                  id: 'app-update-form',
                  data: response.data
                })
              } else if (response.data && response.data.success) {
                _this.$router.push(commonUrls.vuerouter.applist)
              }
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {
                id: 'app-update-form',
                error
              })
            })
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.scopeIds !== undefined) {
              if (params.changed.scopeIds && params.changed.scopeIds.length > 0) {
                let items = []
                for (let key in scopeIdsItems) {
                  if (params.changed.scopeIds.indexOf(scopeIdsItems[key].value) > -1) {
                    items.push({label: scopeIdsItems[key].label, value: scopeIdsItems[key].value})
                  }
                }
                return [
                  {
                    'name': 'autoApprovaledScopeIds',
                    'hidden': false,
                    items: items
                  }
                ]
              } else {
                return [
                  {
                    'name': 'autoApprovaledScopeIds',
                    'hidden': true,
                    items: []
                  }
                ]
              }
            } else if (params.changed.repassword !== undefined) {
              for (let key in params.items) {
                if (params.items[key].name === 'clientSecret') {
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
                        'name': 'repassword',
                        'validatedMsg': undefined
                      }
                    ]
                  }
                }
              }
            } else if (params.changed.clientSecret !== undefined) {
              for (let key in params.items) {
                if (params.items[key].name === 'repassword') {
                  if (params.items[key].defaultValue !== params.changed.clientSecret) {
                    return [
                      {
                        'name': 'repassword',
                        'validatedMsg': '密码不一致'
                      }
                    ]
                  } else {
                    return [
                      {
                        'name': 'repassword',
                        'validatedMsg': undefined
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
