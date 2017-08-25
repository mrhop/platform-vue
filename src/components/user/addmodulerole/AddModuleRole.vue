<template>
  <div class="form-module-role-detail form-detail">
    <panel>
      <h1 slot="header">新增模块角色</h1>
      <vform id="module-role-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
                    'name': 'name',
                    'label': '模块角色名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '模块角色名称'
                  },
                  {
                    'name': 'authority',
                    'label': '模块角色ID',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '模块角色ID'
                  },
                  {
                    'name': 'clientId',
                    'label': '所属客户端',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'items': response.data.clientIds,
                    ruleChange: true
                  },
                  {
                    'name': 'moduleIds',
                    'label': '包含模块',
                    'type': 'tree-checkbox',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
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
                id: 'module-role-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'module-role-add-form',
                error
              })
            })
          },
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('clientId')) {
              if (params.changed.clientId !== undefined) {
                ruleChangeConfig.data = params.changed
                axios.request(ruleChangeConfig).then(function (response) {
                  global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                    id: 'module-role-add-form',
                    data: [
                      {
                        'name': 'moduleIds',
                        'treeData': response.data.moduleIds || [],
                        defaultValue: [],
                        hidden: false
                      }
                    ]
                  })
                }).catch(function (error) {
                  global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                    id: 'module-role-add-form',
                    error
                  })
                })
              } else {
                return [
                  {
                    'name': 'moduleIds',
                    'treeData': [],
                    defaultValue: [],
                    hidden: true
                  }
                ]
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
