<template>
  <div class='form-module-detail form-detail'>
    <panel>
      <h1 slot='header'>新增模块</h1>
      <vform id='module-add-form' :actions='actions' :actionUrls='actionUrls'></vform>
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
    url: commonUrls.moduleFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.modulelist,
          saveUrl: commonUrls.moduleSave
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            delete ruleChangeConfig.data
            axios.request(ruleChangeConfig).then(function (response) {
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
                    'placeholder': '模块名称'
                  },
                  {
                    'name': 'moduleId',
                    'label': '模块ID',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '模块ID由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '模块ID'
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
                    'placeholder': '模块链接'
                  },
                  {
                    'name': 'iconClass',
                    'label': '图标样式',
                    'type': 'text',
                    'placeholder': '图标样式',
                    'validate': [{
                      'errorMsg': '不能为空，且前后不能有空格,',
                      'regex': '^\\S.*\\S$'
                    }]
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
                    ]
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
                    ]
                  },
                  {
                    'name': 'clientId',
                    'label': '所属应用',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    items: response.data.clientIds,
                    ruleChange: true
                  },
                  {
                    'name': 'parentId',
                    'label': '父模块',
                    'type': 'tree',
                    hidden: true,
                    ruleChange: true
                  },
                  {
                    'name': 'beforeId',
                    'label': '前置模块',
                    'type': 'select',
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
                id: 'module-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'module-add-form',
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
                    id: 'module-add-form',
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
                      }
                    ]
                  })
                }).catch(function (error) {
                  global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                    id: 'module-add-form',
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
                  id: 'module-add-form',
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
                  id: 'module-add-form',
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
