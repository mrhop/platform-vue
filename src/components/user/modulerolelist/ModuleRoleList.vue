<template>
  <div class="module-role-list">
    <panel>
      <h1 slot="header">模块角色列表</h1>
      <vtable id="module-role-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
    url: commonUrls.moduleRoleFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.addmodulerole,
          detailUrl: commonUrls.vuerouter.moduleroledetail,
          infoUrl: commonUrls.vuerouter.editmodulerole,
          deleteUrl: commonUrls.deleteModuleRole
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.moduleRoleList,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                delete ruleChangeConfig.data
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'module-role-list',
                    data: {
                      'rules': {
                        'header': [
                          {
                            'name': '#sn',
                            'title': '#sn'
                          },
                          {
                            'name': 'name',
                            'title': '模块角色名称',
                            'type': 'text',
                            'filter': true
                          },
                          {
                            'name': 'authority',
                            'title': '模块角色ID',
                            'type': 'text',
                            'filter': true
                          },
                          {
                            'name': 'clientId',
                            'title': '所属客户端',
                            'type': 'select',
                            'items': responseInner.data.clientIds,
                            'filter': true
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
                  global.store.commit('TABLE_FAILURE', {id: 'module-role-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'module-role-list', error})
              })
            } else {
              let config = {
                url: commonUrls.moduleRoleList,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'module-role-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'module-role-list', error})
              })
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
