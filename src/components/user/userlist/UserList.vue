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
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.adduser,
          detailUrl: commonUrls.vuerouter.userdetail,
          infoUrl: commonUrls.vuerouter.edituser,
          deleteUrl: commonUrls.deleteUser
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.userList,
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
                          'name': 'username',
                          'title': '账号',
                          'type': 'text',
                          'filter': true,
                          'sortable': true
                        },
                        {
                          'name': 'name',
                          'title': '姓名',
                          'type': 'text',
                          'filter': true
                        },
                        {
                          'name': 'email',
                          'title': 'Email',
                          'type': 'text',
                          'filter': true
                        },
                        {
                          'name': 'phone',
                          'title': '手机',
                          'type': 'text',
                          'filter': true
                        },
                        {
                          'name': 'enabled',
                          'title': '已激活',
                          'type': 'select',
                          'editable': true,
                          'filter': true,
                          'sortable': true,
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
                          'name': 'createUser',
                          'title': '创建人',
                          'type': 'text'
                        },
                        {
                          'name': 'createdDate',
                          'title': '创建日期',
                          'type': 'date',
                          'sortable': true
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
                global.store.commit('TABLE_FAILURE', {id: 'user-list', error})
              })
            } else {
              let config = {
                url: commonUrls.userList,
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
