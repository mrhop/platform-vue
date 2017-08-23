<template>
  <div class="form-module-detail form-detail">
    <panel>
      <h1 slot="header">更新模块</h1>
      <vform id="module-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.moduleInfo,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.moduleFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.modulelist
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
                      'name': 'moduleName',
                      'label': '模块名称',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                        'regex': '^\\S.{0,38}\\S$'
                      }],
                      'placeholder': '模块名称',
                      defaultValue: response.data.moduleName
                    },
                    {
                      'name': 'moduleUrl',
                      'label': '模块链接',
                      'type': 'text',
                      'validate': [
                        {
                          'errorMsg': '不包含空字符',
                          'regex': '^\\S+$'
                        }
                      ],
                      required: false,
                      'placeholder': '模块链接',
                      defaultValue: response.data.moduleUrl
                    },
                    {
                      'name': 'iconClass',
                      'label': '图标样式',
                      'type': 'text',
                      'placeholder': '图标样式',
                      'validate': [{
                        'errorMsg': '不能为空，且前后不能有空格,',
                        'regex': '^\\S.*\\S$'
                      }],
                      defaultValue: response.data.iconClass
                    },
                    {
                      'name': 'activated',
                      'label': '已激活',
                      'type': 'select',
                      'items': [
                        {
                          'label': '是',
                          'value': true
                        },
                        {
                          'label': '否',
                          'value': false
                        }
                      ],
                      'validate': [
                        {
                          'errorMsg': '不能为空',
                          'regex': '^\\S+$'
                        }
                      ],
                      defaultValue: response.data.activated
                    },
                    {
                      'name': 'available',
                      'label': '是否可见',
                      'type': 'select',
                      'items': [
                        {
                          'label': '是',
                          'value': true
                        },
                        {
                          'label': '否',
                          'value': false
                        }
                      ],
                      'validate': [
                        {
                          'errorMsg': '不能为空',
                          'regex': '^\\S+$'
                        }
                      ],
                      defaultValue: response.data.available
                    },
                    {
                      'name': 'clientName',
                      'label': '所属应用',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      defaultValue: response.data.clientName,
                      locked: true
                    },
                    {
                      'name': 'parentId',
                      'label': '父模块',
                      'type': 'tree',
                      hidden: !response.data.clientId,
                      treeData: responseInner.data.parentTree || [],
                      ruleChange: true,
                      defaultValue: response.data.parentId,
                      defaultLabel: response.data.parentName
                    },
                    {
                      'name': 'beforeId',
                      'label': '前置模块',
                      'type': 'select',
                      hidden: !response.data.clientId,
                      items: responseInner.data.beforeIds || [],
                      defaultValue: response.data.beforeId
                    },
                    {
                      'name': 'authorities',
                      'label': '模块角色',
                      'type': 'checkbox',
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      hidden: !response.data.clientId,
                      items: responseInner.data.authorityIds || [],
                      defaultValue: response.data.authorities || []
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
                  id: 'module-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'module-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'module-update-form',
                error
              })
            })
          },
          save: function ({key, data, multipart}) {
            let config = {
              url: commonUrls.moduleUpdate,
              method: 'post',
              params: {key},
              data: data
            }
            const _this = this
            axios.request(config).then(function (response) {
              if (response.data && response.data.error) {
                global.store.commit('FORM_SAVE_SUCCESS', {
                  id: 'module-update-form',
                  data: response.data
                })
              } else if (response.data && response.data.success) {
                _this.$router.push(commonUrls.vuerouter.modulelist)
              }
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {
                id: 'module-update-form',
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
                    id: 'module-update-form',
                    data: [
                      {
                        'name': 'parentId',
                        'treeData': response.data.parentTree || [],
                        defaultValue: undefined,
                        hidden: false
                      }, {
                        'name': 'beforeId',
                        'items': response.data.beforeIds || [],
                        defaultValue: undefined,
                        hidden: false
                      }, {
                        'name': 'authorities',
                        'items': response.data.authorityIds || [],
                        defaultValue: [],
                        hidden: false
                      }
                    ]
                  })
                }).catch(function (error) {
                  global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                    id: 'module-update-form',
                    error
                  })
                })
              } else {
                return [
                  {
                    'name': 'parentId',
                    'treeData': [],
                    defaultValue: undefined,
                    hidden: true
                  }, {
                    'name': 'beforeId',
                    'items': [],
                    defaultValue: undefined,
                    hidden: true
                  }, {
                    'name': 'authorities',
                    'items': [],
                    defaultValue: [],
                    hidden: true
                  }
                ]
              }
            } else if (params.changed.hasOwnProperty('parentId')) {
              ruleChangeConfig.data = params.changed
              if (params.changed.parentId === undefined) {
                ruleChangeConfig.data.beforeId = -1
                for (let key in params.items) {
                  if (params.items[key].name === 'clientId') {
                    ruleChangeConfig.data.clientId = params.items[key].defaultValue
                  }
                }
              }
              axios.request(ruleChangeConfig).then(function (response) {
                global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                  id: 'module-update-form',
                  data: [{
                    'name': 'beforeId',
                    'items': response.data.beforeIds || [],
                    defaultValue: undefined,
                    hidden: false
                  }
                  ]
                })
              }).catch(function (error) {
                global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                  id: 'module-update-form',
                  error
                })
              })
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
