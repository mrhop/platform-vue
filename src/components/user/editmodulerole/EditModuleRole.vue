<template>
  <div class="form-module-role-detail form-detail">
    <panel>
      <h1 slot="header">更新模块角色</h1>
      <vform id="module-role-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.moduleRoleInfo,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.moduleRoleFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.modulerolelist
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
                      'name': 'name',
                      'label': '模块角色名称',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                        'regex': '^\\S.{0,38}\\S$'
                      }],
                      'placeholder': '模块角色名称',
                      'defaultValue': response.data.name
                    },
                    {
                      'name': 'authority',
                      'label': '模块角色ID',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                        'regex': '^\\w{5,40}$'
                      }],
                      'placeholder': '模块角色ID',
                      'locked': true,
                      'defaultValue': response.data.authority
                    },
                    {
                      'name': 'clientId',
                      'label': '所属客户端',
                      'type': 'select',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      'items': responseInner.data.clientIds,
                      'defaultValue': response.data.clientId,
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
                      'treeData': responseInner.data.moduleIds || [],
                      'defaultValue': response.data.moduleIds || [],
                      hidden: !response.data.clientId
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
                  id: 'module-role-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'module-role-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'module-role-update-form',
                error
              })
            })
          },
          save: function ({key, data, multipart}) {
            let config = {
              url: commonUrls.moduleRoleUpdate,
              method: 'post',
              params: {key},
              data: data
            }
            const _this = this
            axios.request(config).then(function (response) {
              if (response.data && response.data.error) {
                global.store.commit('FORM_SAVE_SUCCESS', {
                  id: 'module-role-update-form',
                  data: response.data
                })
              } else if (response.data && response.data.success) {
                _this.$router.push(commonUrls.vuerouter.modulerolelist)
              }
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {
                id: 'module-role-update-form',
                error
              })
            })
          }.bind(this),
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
