<template>
  <div class="form-order-detail form-detail">
    <panel class="form-order-productlist">
      <h1 slot="header">订单详情</h1>
      <vform id="order-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel class="order-selected-productlist">
      <h1 slot="header">包含商品</h1>
      <vtable id="orderselectedproduct-list" :editable="true" :actions="orderSelectedProductActions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let vtable = huodhVuePlugins.vtable
  let initConfig = {
    url: commonUrls.order.info,
    params: {},
    method: 'get'
  }
  let productsSelectedListConfig = {
    url: commonUrls.orderProduct.list,
    params: {},
    method: 'post',
    data: {}
  }
  //  let orderStatus = 'created'
  export default {
    data () {
      return {
        orderInfo: null,
        actionUrls: {
          backupUrl: commonUrls.vuerouter.order.list
        },
        actions: {
          init: function (params) {
            initConfig.params.key = this.$route.query.key
            axios.request(initConfig).then(function (response) {
              let items = [
                {
                  'name': 'orderStatusName',
                  'label': '订单状态',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.orderStatusName
                },
                {
                  'name': 'clientName',
                  'label': '关联客户',
                  'type': 'text',
                  defaultValue: response.data.clientName,
                  locked: true
                },
                {
                  'name': 'countryName',
                  'label': '所属国家',
                  'type': 'text',
                  defaultValue: response.data.countryName,
                  locked: true
                },
                {
                  'name': 'discountType',
                  'label': '折扣类型',
                  'type': 'text',
                  defaultValue: response.data.discountType === 'auto' ? '自动折扣' : '手动折扣',
                  locked: true
                },
                {
                  'name': 'costPrice',
                  'label': '成本',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.costPrice
                },
                {
                  'name': 'preQuotation',
                  'label': '预估销售价',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.preQuotation
                },
                {
                  'name': 'salePrice',
                  'label': '合同金额',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.salePrice
                },
                {
                  'name': 'contractSignDate',
                  'label': '合同签订时间',
                  'type': 'date',
                  locked: true,
                  defaultValue: response.data.contractSignDate
                },
                {
                  'name': 'payTypeName',
                  'label': '支付方式',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.payTypeName
                },
                {
                  'name': 'deliveryMethodName',
                  'label': '递送方式',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.deliveryMethodName
                },
                {
                  'name': 'deliveryDate',
                  'label': '递送时间',
                  'type': 'date',
                  locked: true,
                  defaultValue: response.data.deliveryDate
                },
                {
                  'name': 'tracingNumber',
                  'label': '追踪号',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.tracingNumber
                },
                {
                  'name': 'freight',
                  'label': '运费',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.freight
                },
                {
                  'name': 'finishedDate',
                  'label': '完成并归档时间',
                  'type': 'date',
                  locked: true,
                  defaultValue: response.data.finishedDate
                },
                {
                  'name': 'additionalMsg',
                  'label': '补充信息',
                  'type': 'textarea',
                  locked: true,
                  defaultValue: response.data.additionalMsg
                }
              ]
              if (response.data.discountType === 'custom') {
                items.splice(3, 0, {
                  'name': 'discount',
                  'label': '折扣',
                  'type': 'text',
                  defaultValue: response.data.discount,
                  locked: true
                })
              }
              let rules = {
                items,
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'order-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'order-detail-form',
                error
              })
            })
          }.bind(this)
        },
        orderSelectedProductActions: {
          reinit: false,
          list: function (args) {
            let rules = {
              'header': [
                {
                  'name': '#sn',
                  'title': '#sn'
                },
                {
                  'name': 'name',
                  'title': '名称',
                  'type': 'text'
                },
                {
                  'name': 'code',
                  'title': '商品码',
                  'type': 'text'
                },
                {
                  'name': 'num',
                  'title': '数量',
                  'type': 'text',
                  editable: this.orderStatusCode === 'created' || this.orderStatusCode === 'quoting',
                  'validate': [{
                    'errorMsg': '请输入正整数',
                    'regex': '^[1-9][0-9]*$'
                  }]
                }
              ],
              'action': {
                'delete': this.orderStatusCode === 'created' || this.orderStatusCode === 'quoting'
              },
              'feature': {
                'filter': false,
                'pager': false
              }
            }
            productsSelectedListConfig.params.orderId = this.$route.query.key
            axios.request(productsSelectedListConfig).then(function (response) {
              if (args.init) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'orderselectedproduct-list',
                  data: {
                    rules,
                    'data': response.data
                  },
                  callParameters: {init: true}
                })
              } else {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'orderselectedproduct-list',
                  data: {
                    'data': response.data
                  }
                })
              }
            }).catch(function (error) {
              global.store.commit('TABLE_FAILURE', {
                id: 'orderselectedproduct-list',
                error
              })
            })
          }.bind(this)
        }
      }
    },
    methods: {},
    components: {
      panel, vform, vtable
    }
  }
</script>

