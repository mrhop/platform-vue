<template>
  <div class="role-list">
    <panel>
      <h1 slot="header">角色列表</h1>
      <vtable id="role-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
        actionUrls: {},
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.roleList,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'role-list',
                  data: {
                    'rules': {
                      'header': [
                        {
                          'name': '#sn',
                          'title': '#sn'
                        },
                        {
                          'name': 'name',
                          'title': '角色名',
                          'type': 'text',
                          'filter': true
                        },
                        {
                          'name': 'authority',
                          'title': '角色id',
                          'type': 'text',
                          'filter': true
                        },
                        {
                          'name': 'level',
                          'title': '角色等级',
                          'type': 'select',
                          'filter': true,
                          'sortable': true,
                          'items': [
                            {
                              'label': '0',
                              'value': 0
                            },
                            {
                              'label': '1',
                              'value': 1
                            },
                            {
                              'label': '2',
                              'value': 2
                            },
                            {
                              'label': '3',
                              'value': 3
                            }
                          ]
                        }
                      ],
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
                global.store.commit('TABLE_FAILURE', {id: 'role-list', error})
              })
            } else {
              let config = {
                url: commonUrls.roleList,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'role-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'role-list', error})
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
