<template>
  <div class='form-navigate-add form-add'>
    <panel>
      <h1 slot='header'>新增导航</h1>
      <vform id='navigate-add-form' :actions='actions' :actionUrls='actionUrls'></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let ruleChangeConfig = {
    url: commonUrls.navigate.rulechange,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.navigate.list,
          saveUrl: commonUrls.navigate.save
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            ruleChangeConfig.params = {type: 'form', relateType: 0}
            axios.request(ruleChangeConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '导航名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '导航名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '导航名称'
                  },
                  {
                    'name': 'relateType',
                    'label': '关联类型',
                    'type': 'select',
                    items: [
                      {
                        label: '文章',
                        value: 0
                      },
                      {
                        label: '新闻',
                        value: 1
                      },
                      {
                        label: '活动',
                        value: 2
                      }
                    ],
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    ruleChange: true,
                    defaultValue: 0
                  },
                  {
                    'name': 'articleId',
                    'label': '关联文章/新闻/活动',
                    'type': 'select',
                    'placeholder': '图标样式',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    items: response.data.articles || []
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
                    defaultValue: true
                  },
                  {
                    'name': 'parentId',
                    'label': '父导航',
                    'type': 'tree',
                    ruleChange: true,
                    treeData: response.data.parentTree || []
                  },
                  {
                    'name': 'beforeId',
                    'label': '前置导航',
                    'type': 'select',
                    items: response.data.beforeNavigates || []
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
                id: 'navigate-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'navigate-add-form',
                error
              })
            })
          },
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('parentId')) {
              ruleChangeConfig.params = {type: 'form', 'changed': true, parentId: params.changed.parentId}
              axios.request(ruleChangeConfig).then(function (response) {
                global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                  id: 'navigate-add-form',
                  data: [{
                    'name': 'beforeId',
                    'items': response.data.beforeNavigates || [],
                    defaultValue: undefined
                  }
                  ]
                })
              }).catch(function (error) {
                global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                  id: 'navigate-add-form',
                  error
                })
              })
            } else if (params.changed.hasOwnProperty('relateType')) {
              if (params.changed.relateType === undefined || params.changed.relateType === null) {
                global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                  id: 'navigate-add-form',
                  data: [{
                    'name': 'articleId',
                    'items': [],
                    defaultValue: undefined
                  }]
                })
              } else {
                ruleChangeConfig.params = {type: 'form', 'changed': true, relateType: params.changed.relateType}
                axios.request(ruleChangeConfig).then(function (response) {
                  global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                    id: 'navigate-add-form',
                    data: [{
                      'name': 'articleId',
                      'items': response.data.articles || [],
                      defaultValue: undefined
                    }]
                  })
                }).catch(function (error) {
                  global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                    id: 'navigate-add-form',
                    error
                  })
                })
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
