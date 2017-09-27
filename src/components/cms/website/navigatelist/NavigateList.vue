<template>
  <div class="navigate-list">
    <panel>
      <h1 slot="header">导航列表</h1>
      <vtable id="navigate-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  let ruleChangeConfig = {
    url: commonUrls.navigate.rulechange,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.navigate.add,
          detailUrl: commonUrls.vuerouter.navigate.detail,
          infoUrl: commonUrls.vuerouter.navigate.edit,
          deleteUrl: commonUrls.navigate.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            let initConfig = {
              url: commonUrls.navigate.list,
              method: 'post',
              data: {pager, filters, sorts, init: true}
            }
            if (init) {
              axios.request(initConfig).then(function (response) {
                ruleChangeConfig.params = {
                  type: 'table'
                }
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'navigate-list',
                    data: {
                      'rules': {
                        'header': [
                          {
                            'name': '#sn',
                            'title': '#sn'
                          },
                          {
                            'name': 'name',
                            'title': '导航名称',
                            'type': 'text',
                            'filter': true
                          },
                          {
                            'name': 'articleTitle',
                            'title': '关联内容',
                            'type': 'text'
                          },
                          {
                            'name': 'parentId',
                            'title': '父导航',
                            'type': 'tree',
                            'filter': true,
                            treeData: responseInner.data.parentTree,
                            literal: true
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
                            ],
                            'validate': [
                              {
                                'errorMsg': '不能为空',
                                'regex': '^\\S+$'
                              }
                            ]
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
                  global.store.commit('TABLE_FAILURE', {id: 'navigate-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'navigate-list', error})
              })
            } else {
              let config = {
                url: commonUrls.navigate.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'navigate-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'navigate-list', error})
              })
            }
          },
          edit: function (args) {
            if (args && args.headerItem && args.headerItem.name === 'activated') {
              let config = {
                'axiosConfig': {
                  url: commonUrls.navigate.activate,
                  method: 'get',
                  params: {key: args.key, activated: args.data['activated']}
                }
              }
              return config
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
