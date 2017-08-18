<template>
  <div class="form-modulerole-detail form-detail">
    <panel>
      <h1 slot="header">新增模块角色</h1>
      <vform id="modulerole-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let ruleChangeConfig = {
    url: commonUrls.moduleRoleFormRuleUpdate,
    method: 'post'
  }
  let scopeIdsItems = []
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.modulerolelist,
          saveUrl: commonUrls.moduleRoleSave
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            axios.request(ruleChangeConfig).then(function (response) {
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
                    'placeholder': '应用名称'
                  },
                  {
                    'name': 'clientId',
                    'label': '应用账号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '应用账号'
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
                    ]
                  },
                  {
                    'name': 'scopeIds',
                    'label': '授权范围',
                    'type': 'checkbox',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    items: response.data.scopeIds ? (scopeIdsItems = response.data.scopeIds) : scopeIdsItems,
                    ruleChange: true
                  },
                  {
                    'name': 'autoApprovaledScopeIds',
                    'label': '自动授权',
                    'type': 'checkbox',
                    hidden: true
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
              global.store.commit('FORM_SUCCESS', {
                id: 'modulerole-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'modulerole-add-form',
                error
              })
            })
          },
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
                        'name': 'repassword'
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
