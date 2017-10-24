<template>
  <div class="order-list">
    <panel>
      <h1 slot="header">订单列表</h1>
      <vtable id="order-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
    url: commonUrls.order.rulechange,
    params: {
      type: 'list'
    },
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.order.add,
          detailUrl: commonUrls.vuerouter.order.detail,
          infoUrl: commonUrls.vuerouter.order.edit,
          deleteUrl: commonUrls.order.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              filters = filters || {}
              if (this.$route.query.clientId) {
                filters.clientId = this.$route.query.clientId
              }
              let config = {
                url: commonUrls.order.list,
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
                      'title': '订单号',
                      'type': 'text',
                      filter: true
                    },
                    {
                      'name': 'clientId',
                      'title': '所属客户',
                      'type': 'select',
                      items: responseInner.data.clients,
                      defaultValue: filters.clientId || undefined,
                      filter: true
                    },
                    {
                      'name': 'orderStatusId',
                      'title': '订单状态',
                      'type': 'select',
                      items: responseInner.data.orderStatuses,
                      filter: true
                    },
                    {
                      'name': 'salePrice',
                      'title': '订单金额',
                      'type': 'text'
                    },
                    {
                      'name': 'tracingNumber',
                      'title': '发货追踪',
                      'type': 'text',
                      filter: true
                    },
                    {
                      'name': 'createdDate',
                      'title': '创建日期',
                      'type': 'date',
                      sortable: true
                    }
                  ]
                  if (responseInner.data.createdUsers) {
                    header.splice(header.length, 0,
                      {
                        'name': 'createdUserId',
                        'title': '创建用户',
                        'type': 'select',
                        items: responseInner.data.createdUsers,
                        filter: true
                      })
                  }
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'order-list',
                    data: {
                      'rules': {
                        header,
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
                  global.store.commit('TABLE_FAILURE', {id: 'order-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'order-list', error})
              })
            } else {
              let config = {
                url: commonUrls.order.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'order-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'order-list', error})
              })
            }
          }.bind(this)
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
