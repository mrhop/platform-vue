<template>
  <div class='form-navigate-update form-update'>
    <panel>
      <h1 slot='header'>更新导航</h1>
      <vform id='navigate-update-form' :actions='actions' :actionUrls='actionUrls'></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.navigate.info,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.navigate.rulechange,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.navigate.list,
          saveUrl: commonUrls.navigate.update
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: this.$route.query.key}
            axios.request(initConfig).then(function (response) {
              ruleChangeConfig.params = {
                type: 'form',
                key: this.$route.query.key,
                parentId: response.data.parentId,
                relateType: response.data.relateType
              }
              axios.request(ruleChangeConfig).then(function (responseInner) {
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
                      defaultValue: response.data.name
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
                      defaultValue: response.data.relateType
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
                      items: responseInner.data.articles || [],
                      defaultValue: response.data.articleId
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
                      'name': 'parentId',
                      'label': '父导航',
                      'type': 'tree',
                      ruleChange: true,
                      treeData: responseInner.data.parentTree || [],
                      defaultValue: response.data.parentId,
                      defaultLabel: response.data.parentName
                    },
                    {
                      'name': 'beforeId',
                      'label': '前置导航',
                      'type': 'select',
                      items: responseInner.data.beforeNavigates || [],
                      defaultValue: response.data.beforeId
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
                  id: 'navigate-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'navigate-update-form',
                  error
                })
              })
            }.bind(this)).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'navigate-update-form',
                error
              })
            })
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('parentId')) {
              ruleChangeConfig.params = {
                type: 'form',
                'changed': true,
                key: this.$route.query.key,
                parentId: params.changed.parentId
              }
              axios.request(ruleChangeConfig).then(function (response) {
                global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                  id: 'navigate-update-form',
                  data: [{
                    'name': 'beforeId',
                    'items': response.data.beforeNavigates || [],
                    defaultValue: undefined
                  }
                  ]
                })
              }).catch(function (error) {
                global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                  id: 'navigate-update-form',
                  error
                })
              })
            } else if (params.changed.hasOwnProperty('relateType')) {
              if (params.changed.relateType === undefined || params.changed.relateType === null) {
                global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
                  id: 'navigate-update-form',
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
                    id: 'navigate-update-form',
                    data: [{
                      'name': 'articleId',
                      'items': response.data.articles || [],
                      defaultValue: undefined
                    }]
                  })
                }).catch(function (error) {
                  global.store.commit('FORM_RULE_CHANGE_FAILURE', {
                    id: 'navigate-update-form',
                    error
                  })
                })
              }
            }
          }.bind(this)
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
