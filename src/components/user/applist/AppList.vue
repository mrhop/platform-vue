<template>
  <div class="app-list">
    <panel>
      <h1 slot="header">应用列表</h1>
      <vtable id="app-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.addapp,
          detailUrl: commonUrls.vuerouter.appdetail,
          infoUrl: commonUrls.vuerouter.editapp,
          deleteUrl: commonUrls.deleteApp
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.appList,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'app-list',
                  data: {
                    'rules': {
                      'header': [
                        {
                          'name': '#sn',
                          'title': '#sn'
                        },
                        {
                          'name': 'clientName',
                          'title': '应用名称',
                          'type': 'text',
                          'filter': true
                        },
                        {
                          'name': 'clientId',
                          'title': '应用账号',
                          'type': 'text',
                          'filter': true,
                          'sortable': true
                        },
                        {
                          'name': 'authorizedGrantTypesStr',
                          'title': '授权方式',
                          'type': 'text'
                        },
                        {
                          'name': 'clientResouceScopesStr',
                          'title': '授权范围',
                          'type': 'text'
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
                global.store.commit('TABLE_FAILURE', {id: 'app-list', error})
              })
            } else {
              let config = {
                url: commonUrls.appList,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'app-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'app-list', error})
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
