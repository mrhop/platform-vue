<template>
  <div class="client-list">
    <panel>
      <h1 slot="header">客户列表</h1>
      <vtable id="client-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  let ruleChangeConfig = {
    url: commonUrls.client.rulechange,
    method: 'post',
    data: {
      type: 'list'
    }
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.client.add,
          detailUrl: commonUrls.vuerouter.client.detail,
          infoUrl: commonUrls.vuerouter.client.edit,
          deleteUrl: commonUrls.client.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.client.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  let header = [
                    {
                      'name': '#sn',
                      'title': '#sn'
                    },
                    {
                      'name': 'code',
                      'title': '客户码',
                      'type': 'text',
                      filter: true
                    },
                    {
                      'name': 'name',
                      'title': '名称',
                      'type': 'text',
                      filter: true
                    },
                    {
                      'name': 'traded',
                      'title': '已成交',
                      'type': 'select',
                      items: [
                        {
                          label: '是',
                          value: true
                        },
                        {
                          label: '否',
                          value: false
                        }
                      ],
                      filter: true
                    },
                    {
                      'name': 'orderAmount',
                      'title': '成交额',
                      'type': 'text',
                      sortable: true
                    },
                    {
                      'name': 'clientOriginId',
                      'title': '客户来源',
                      'type': 'select',
                      filter: true,
                      items: responseInner.data.clientOrigins
                    },
                    {
                      'name': 'clientLevelId',
                      'title': '客户级别',
                      'type': 'select',
                      filter: true,
                      items: responseInner.data.clientLevels
                    }
                  ]
                  if (responseInner.data.createdUsers) {
                    header.push({
                      'name': 'createdUserId',
                      'title': '创建人',
                      'type': 'select',
                      filter: true,
                      items: responseInner.data.createdUsers
                    })
                  }
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'client-list',
                    data: {
                      'rules': {
                        header,
                        'action': {
                          'add': true,
                          'detail': true,
                          'update': true,
                          'delete': true,
                          events: [
                            {
                              key: 'goToOrders',
                              label: '查看订单'
                            }
                          ]
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
                  global.store.commit('TABLE_FAILURE', {id: 'client-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'client-list', error})
              })
            } else {
              let config = {
                url: commonUrls.client.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'client-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'client-list', error})
              })
            }
          },
          goToOrders: function (key) {
            this.$router.push({name: 'OrderList', query: {clientId: key}})
          }.bind(this)
        }
      }
    },
    components: {
      panel, tab, vtable
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
