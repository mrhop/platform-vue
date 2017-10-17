<template>
  <div class="orderdiscount-list">
    <panel>
      <h1 slot="header">订单折扣规则列表</h1>
      <vtable id="orderdiscount-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
    url: commonUrls.orderDiscount.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.orderDiscount.add,
          detailUrl: commonUrls.vuerouter.orderDiscount.detail,
          infoUrl: commonUrls.vuerouter.orderDiscount.edit,
          deleteUrl: commonUrls.orderDiscount.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.orderDiscount.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'orderdiscount-list',
                    data: {
                      'rules': {
                        'header': [
                          {
                            'name': '#sn',
                            'title': '#sn'
                          },
                          {
                            'name': 'name',
                            'title': '名称',
                            'type': 'text',
                            filter: true
                          },
                          {
                            'name': 'type',
                            'title': '类型',
                            'type': 'select',
                            items: [
                              {
                                label: '折扣',
                                value: 'discount'
                              },
                              {
                                label: '减免',
                                value: 'reduce'
                              }
                            ],
                            filter: true
                          },
                          {
                            'name': 'quota',
                            'title': '订单总额',
                            'type': 'text'
                          },
                          {
                            'name': 'discount',
                            'title': '折扣',
                            'type': 'text'
                          },
                          {
                            'name': 'reduce',
                            'title': '减免',
                            'type': 'text'
                          },
                          {
                            'name': 'clientLevelId',
                            'title': '客户级别',
                            'type': 'select',
                            items: responseInner.data.clientLevels,
                            filter: true
                          },
                          {
                            'name': 'beginDate',
                            'title': '起始日期',
                            'type': 'date',
                            sortable: true
                          },
                          {
                            'name': 'endDate',
                            'title': '结束日期',
                            'type': 'date',
                            sortable: true
                          },
                          {
                            'name': 'createdDate',
                            'title': '创建日期',
                            'type': 'date',
                            sortable: true
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
                  global.store.commit('TABLE_FAILURE', {id: 'orderdiscount-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'orderdiscount-list', error})
              })
            } else {
              let config = {
                url: commonUrls.orderDiscount.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'orderdiscount-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'orderdiscount-list', error})
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
