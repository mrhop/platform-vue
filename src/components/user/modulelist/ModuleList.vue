<template>
  <div class="module-list">
    <panel>
      <h1 slot="header">模块列表</h1>
      <vtable id="module-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  let ruleChangeConfig = {
    url: commonUrls.moduleFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.addmodule,
          detailUrl: commonUrls.vuerouter.moduledetail,
          infoUrl: commonUrls.vuerouter.editmodule,
          deleteUrl: commonUrls.deleteModule
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            let initConfig = {
              url: commonUrls.moduleList,
              method: 'post',
              data: {pager, filters, sorts, init: true}
            }
            if (init) {
              axios.request(initConfig).then(function (response) {
                delete ruleChangeConfig.data
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'module-list',
                    data: {
                      'rules': {
                        'header': [
                          {
                            'name': '#sn',
                            'title': '#sn'
                          },
                          {
                            'name': 'moduleName',
                            'title': '模块名称',
                            'type': 'text',
                            'filter': true
                          },
                          {
                            'name': 'moduleId',
                            'title': '模块ID',
                            'type': 'text',
                            'filter': true
                          },
                          {
                            'name': 'activated',
                            'title': '已激活',
                            'type': 'select',
                            'filter': true,
                            editable: true,
                            'items': [
                              {
                                'label': '是',
                                'value': true
                              },
                              {
                                'label': '否',
                                'value': false
                              }
                            ]
                          },
                          {
                            'name': 'clientId',
                            'title': '所属客户端',
                            'type': 'select',
                            'filter': true,
                            items: responseInner.data.clientIds,
                            'ruleChange': true
                          },
                          {
                            'name': 'parentId',
                            'title': '父模块',
                            'type': 'tree',
                            'filter': true,
                            literal: true
                          },
                          {
                            'name': 'authorityId',
                            'title': '模块权限',
                            'type': 'select',
                            'filter': true,
                            literal: true
                          }
                        ],
                        'action': {
                          'add': true,
                          'detail': true,
                          'update': true,
                          'delete': true
                        },
                        'feature': {
                          'filter': true,
                          'pager': true
                        }
                      },
                      'data': response.data
                    },
                    callParameters: {pager, init: true}
                  })
                }).catch(function (error) {
                  global.store.commit('TABLE_FAILURE', {id: 'module-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'module-list', error})
              })
            } else {
              let config = {
                url: commonUrls.moduleList,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'module-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'module-list', error})
              })
            }
          },
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('clientId')) {
              if (params.changed.clientId !== undefined) {
                ruleChangeConfig.data = params.changed
                axios.request(ruleChangeConfig).then(function (response) {
                  global.store.commit('TABLE_RULE_CHANGE_SUCCESS', {
                    id: 'module-list',
                    data: [
                      {
                        'name': 'parentId',
                        'treeData': response.data.parentTree || [],
                        defaultValue: undefined
                      }, {
                        'name': 'authorityId',
                        'items': response.data.authorityIds || [],
                        defaultValue: undefined
                      }
                    ]
                  })
                }).catch(function (error) {
                  global.store.commit('TABLE_RULE_CHANGE_FAILURE', {
                    id: 'module-list',
                    error
                  })
                })
              } else {
                return [
                  {
                    'name': 'parentId',
                    'treeData': [],
                    defaultValue: undefined
                  },
                  {
                    'name': 'authorityId',
                    'items': [],
                    defaultValue: undefined
                  }
                ]
              }
            }
          }
        }
      }
    },
    components: {
      panel, tab, vtable
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
