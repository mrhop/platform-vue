<template>
  <div class="user-list">
    <panel>
      <h1 slot="header">用户列表</h1>
      <vtable id="user-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/crm'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.user.add,
          detailUrl: commonUrls.vuerouter.user.detail,
          infoUrl: commonUrls.vuerouter.user.edit,
          deleteUrl: commonUrls.user.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.user.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'user-list',
                  data: {
                    'rules': {
                      'header': [
                        {
                          'name': '#sn',
                          'title': '#sn'
                        },
                        {
                          'name': 'account',
                          'title': '账号',
                          'type': 'text'
                        },
                        {
                          'name': 'name',
                          'title': '姓名',
                          'type': 'text'
                        },
                        {
                          'name': 'customDiscountStr',
                          'title': '可否自定义折扣',
                          'type': 'text'
                        },
                        {
                          'name': 'lowerLimit',
                          'title': '折扣限制',
                          'type': 'text'
                        }
                      ],
                      'action': {
                        'add': false,
                        'detail': true,
                        'update': true,
                        'delete': false
                      },
                      'feature': {
                        'filter': false,
                        'pager': true
                      }
                    },
                    'data': response.data
                  },
                  callParameters: {pager, init: true}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'user-list', error})
              })
            } else {
              let config = {
                url: commonUrls.user.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'user-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'user-list', error})
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
