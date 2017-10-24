<template>
  <div class="form-order-detail form-detail">
    <panel class="form-order-productlist">
      <h1 slot="header">新增订单</h1>
      <vform id="order-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
      <modalTpl :confirmModal="false"
                type="info"
                :trigger="modalTrigger">
        <span slot="header">请选择商品</span>
        <div slot="body">
          <vtable id="orderproduct-list" :actions="orderProductActions"></vtable>
        </div>
      </modalTpl>
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
  let modalTpl = huodhVuePlugins.modalTpl
  let ruleChangeConfig = {
    url: commonUrls.order.rulechange,
    params: {
      type: 'form'
    },
    method: 'get'
  }
  let productRuleChangeConfig = {
    url: commonUrls.product.rulechange,
    method: 'get'
  }
  let orderPriceChangeConfig = {
    url: commonUrls.order.priceestimate,
    params: {},
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.order.list,
          saveUrl: commonUrls.order.save
        },
        actions: {
          init: function (params) {
            axios.request(ruleChangeConfig).then(function (responseInner) {
              let items = [
                {
                  'name': 'clientId',
                  'label': '关联客户',
                  'type': 'select',
                  items: responseInner.data.clients,
                  ruleChange: true,
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  'placeholder': '关联客户'
                },
                {
                  'name': 'countryId',
                  'label': '所属国家',
                  'type': 'select',
                  items: responseInner.data.countries,
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  'placeholder': '关联客户'
                },
                {
                  'name': 'addProduct',
                  'label': '添加商品',
                  'defaultValue': '添加商品',
                  'type': 'button',
                  'ruleChange': true
                },
                {
                  'name': 'costPrice',
                  'label': '成本',
                  'type': 'text',
                  defaultValue: 0.0,
                  locked: true,
                  'validate': [{
                    'errorMsg': '请添加商品',
                    'regex': '^(([1-9]\\d*)|(([1-9]\\d*)\\.\\d{1,2}))|(0\\.[1-9][0-9]*)|(0\\.0[1-9])$'
                  }]
                },
                {
                  'name': 'preSalePrice',
                  'label': '预估折前价',
                  'type': 'text',
                  defaultValue: 0.0,
                  locked: true
                },
                {
                  'name': 'preQuotation',
                  'label': '预估折后价',
                  'type': 'text',
                  defaultValue: 0.0,
                  locked: true
                },
                {
                  'name': 'additionalMsg',
                  'label': '补充信息',
                  'type': 'textarea',
                  'placeholder': '寄送地址等补充信息'
                },
                {
                  'name': 'orderProducts',
                  'type': 'hidden',
                  defaultValue: this.orderProducts
                }
              ]
              if (responseInner.data.customDiscount !== undefined) {
                items.splice(3, 0, {
                  'name': 'discountType',
                  'label': '折扣类型',
                  'type': 'select',
                  items: [
                    {
                      label: '自动折扣',
                      value: 'auto'
                    },
                    {
                      label: '手动折扣',
                      value: 'custom'
                    }
                  ],
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  ruleChange: true,
                  'placeholder': '折扣类型'
                }, {
                  'name': 'discount',
                  'label': '折扣',
                  'type': 'text',
                  hidden: true,
                  defaultValue: 1,
                  'validate': [{
                    'errorMsg': '请输入小于1的且小数位小于2的小数',
                    'regex': '^(1|(0?\\.\\d{1,2}))$'
                  }],
                  ruleChange: true,
                  'placeholder': '折扣值'
                })
                this.customDiscount = responseInner.data.customDiscount
              }
              let rules = {
                items,
                action: {
                  save: {
                    label: '保存'
                  },
                  reset: {
                    label: '重置'
                  },
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'order-add-form',
                data: {
                  rules
                }
              })
            }.bind(this)).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'order-add-form',
                error
              })
            })
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('addProduct')) {
              // 给出商品的列表 dialog
              this.modalTrigger = !this.modalTrigger
            } else if (params.changed.hasOwnProperty('discountType')) {
              // 给出商品的列表 dialog
              if (params.changed.discountType === 'custom') {
                this.useCustomDiscount = true
                return [{
                  name: 'discount',
                  hidden: false
                }]
              } else {
                this.useCustomDiscount = false
                return [{
                  name: 'discount',
                  hidden: true
                }]
              }
            } else if (params.changed.hasOwnProperty('discount')) {
              // 给出商品的列表 dialog
              for (let i in params.items) {
                if (params.items[i].name === 'discount') {
                  if (new RegExp(params.items[i].validate[0].regex).test(params.items[i].defaultValue)) {
                    // validate
                    if (params.items[i].defaultValue < this.customDiscount) {
                      this.preDiscount = 1
                      return [{
                        name: 'discount',
                        'validatedMsg': '折扣值不能低于可处理的折扣值，可处理最低折扣值为：' + this.customDiscount,
                        defaultValue: 1
                      }, {
                        name: 'preQuotation',
                        defaultValue: (this.preDiscount * this.prePrice).toFixed(2)
                      }]
                    } else {
                      this.preDiscount = params.items[i].defaultValue
                      if (this.prePrice > 0) {
                        return [
                          {
                            name: 'preQuotation',
                            defaultValue: (this.preDiscount * this.prePrice).toFixed(2)
                          }
                        ]
                      }
                    }
                  }
                }
              }
            } else if (params.changed.hasOwnProperty('clientId')) {
              this.clientId = params.changed.clientId || undefined
              this.changePrices()
            }
          }.bind(this),
          reset: function (params) {
            console.log('reset it')
            this.orderProductSelectedData = {rows: [], totalCount: 0}
            this.customDiscount = 1
            this.useCustomDiscount = false
            this.prePrice = 0.0
            this.costPrice = 0.0
            this.preDiscount = 1
            this.orderProducts = []
            this.orderSelectedProductActions.reinit = true
            this.clientId = undefined
          }.bind(this)
        },
        orderProductActions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.product.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                axios.request(productRuleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'orderproduct-list',
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
                            'name': 'code',
                            'title': '商品码',
                            'type': 'text',
                            filter: true
                          },
                          {
                            'name': 'productCategoryId',
                            'title': '商品分类',
                            'type': 'select',
                            filter: true,
                            items: responseInner.data.productCategories
                          },
                          {
                            'name': 'costPrice',
                            'title': '成本价',
                            'type': 'text'
                          },
                          {
                            'name': 'salePrice',
                            'title': '销售价',
                            'type': 'text'
                          }
                        ],
                        'action': {
                          events: [
                            {
                              key: 'selectProduct',
                              label: '选择该商品'
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
                  this.orderProductData = response.data.rows
                }.bind(this)).catch(function (error) {
                  global.store.commit('TABLE_FAILURE', {id: 'orderproduct-list', error})
                })
              }.bind(this)).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'orderproduct-list', error})
              })
            } else {
              let config = {
                url: commonUrls.product.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'orderproduct-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
                this.orderProductData = response.data.rows
              }.bind(this)).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'orderproduct-list', error})
              })
            }
          }.bind(this),
          selectProduct: function (key) {
            if (this.orderProductData) {
              for (let index in this.orderProductData) {
                if (this.orderProductData[index].key === key) {
                  for (let j in this.orderProductSelectedData.rows) {
                    if (this.orderProductSelectedData.rows[j].key === key) {
                      this.orderProductSelectedData.rows[j].value[2] += 1
                      this.prePrice += this.orderProductData[index].value[4]
                      this.costPrice += this.orderProductData[index].value[3]
                      for (let l in this.orderProducts) {
                        if (this.orderProducts[l].productId === key) {
                          this.orderProducts[l].num += 1
                          break
                        }
                      }
                      // 注意处理price
                      this.changePrices()
                      this.orderSelectedProductActions.reinit = true
                      return
                    }
                  }
                  this.orderProductSelectedData.rows.push({
                    key,
                    value: [this.orderProductData[index].value[0], this.orderProductData[index].value[1], 1, this.orderProductData[index].value[4], this.orderProductData[index].value[3]]
                  })
                  this.orderProductSelectedData.totalCount += 1
                  this.prePrice += this.orderProductData[index].value[4]
                  this.costPrice += this.orderProductData[index].value[3]
                  this.orderProducts.push({productId: key, num: 1})
                  // 注意处理price
                  this.changePrices()
                  this.orderSelectedProductActions.reinit = true
                }
              }
              // do add
            }
            console.log('select product')
          }.bind(this)
        },
        orderSelectedProductActions: {
          reinit: false,
          list: function (args) {
            if (args.init) {
              global.store.commit('TABLE_SUCCESS', {
                id: 'orderselectedproduct-list',
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
                        editable: true,
                        'validate': [{
                          'errorMsg': '请输入正整数',
                          'regex': '^[1-9][0-9]*$'
                        }]
                      }
                    ],
                    'action': {
                      'delete': true
                    },
                    'feature': {
                      'filter': false,
                      'pager': false
                    }
                  },
                  'data': this.orderProductSelectedData
                },
                callParameters: {init: true}
              })
            } else {
              global.store.commit('TABLE_SUCCESS', {
                id: 'orderselectedproduct-list',
                data: {
                  'data': this.orderProductSelectedData
                },
                callParameters: {}
              })
            }
          }.bind(this),
          delete: function (params) {
            for (let j in this.orderProductSelectedData.rows) {
              if (this.orderProductSelectedData.rows[j].key === params.key) {
                this.prePrice -= this.orderProductSelectedData.rows[j].value[2] * this.orderProductSelectedData.rows[j].value[3]
                this.costPrice -= this.orderProductSelectedData.rows[j].value[2] * this.orderProductSelectedData.rows[j].value[4]
                for (let l in this.orderProducts) {
                  if (this.orderProducts[l].productId === params.key) {
                    this.orderProducts.splice(l, 1)
                    break
                  }
                }
                // 需要处理此处的影响到预估价格处【根据折扣】
                // 注意处理price
                this.changePrices()
                this.orderProductSelectedData.rows.splice(j, 1)
                this.orderProductSelectedData.totalCount -= 1
                return
              }
            }

            console.log('delete product')
          }.bind(this),
          edit: function (params) {
            // 此处要进行form对应的设值
            console.log('do form and table setting')
            // form 中给出一个hidden的products 【productId，num】
            // 在edit或者delete的时候做更新，同时更新成本价，然后触发调用处理折扣的方法，获取预估销售价，然后更新这两个价格
            for (let j in this.orderProductSelectedData.rows) {
              if (this.orderProductSelectedData.rows[j].key === params.key) {
                this.prePrice += (params.data[params.headerItem.name] - this.orderProductSelectedData.rows[j].value[2]) * this.orderProductSelectedData.rows[j].value[3]
                this.costPrice += (params.data[params.headerItem.name] - this.orderProductSelectedData.rows[j].value[2]) * this.orderProductSelectedData.rows[j].value[4]
                for (let l in this.orderProducts) {
                  if (this.orderProducts[l].productId === params.key) {
                    this.orderProducts[l].num = params.data[params.headerItem.name]
                    break
                  }
                }
                // 此处同样需要将预估值放置在form中，以及成本价
                // 注意处理price
                this.changePrices()
                this.orderProductSelectedData.rows[j].value[2] = params.data[params.headerItem.name]
                this.orderSelectedProductActions.reinit = true
                return
              }
            }
          }.bind(this)
        },
        modalTrigger: false,
        orderProductData: undefined,
        orderProductSelectedData: {rows: [], totalCount: 0},
        customDiscount: 1,
        useCustomDiscount: false,
        prePrice: 0.0,
        costPrice: 0.0,
        preDiscount: 1,
        orderProducts: [],
        clientId: undefined
      }
    },
    methods: {
      changePrices: function () {
        this.costPrice = +this.costPrice.toFixed(2)
        this.prePrice = +this.prePrice.toFixed(2)
        let dicountPrice = this.prePrice
        if (this.useCustomDiscount) {
          dicountPrice = dicountPrice * this.preDiscount
          dicountPrice = +dicountPrice.toFixed(2)
          global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
            id: 'order-add-form',
            data: [{
              name: 'preSalePrice',
              defaultValue: this.prePrice
            }, {
              name: 'preQuotation',
              defaultValue: dicountPrice
            }, {
              name: 'costPrice',
              defaultValue: this.costPrice
            }, {
              name: 'orderProducts',
              defaultValue: this.orderProducts
            }]
          })
        } else {
          orderPriceChangeConfig.params.price = dicountPrice
          if (this.clientId) {
            orderPriceChangeConfig.params.clientId = this.clientId
          }
          axios.request(orderPriceChangeConfig).then(function (response) {
            global.store.commit('FORM_RULE_CHANGE_SUCCESS', {
              id: 'order-add-form',
              data: [{
                name: 'preSalePrice',
                defaultValue: this.prePrice,
                validatedMsg: undefined
              }, {
                name: 'preQuotation',
                defaultValue: response.data,
                validatedMsg: undefined
              }, {
                name: 'costPrice',
                defaultValue: this.costPrice,
                validatedMsg: undefined
              }, {
                name: 'orderProducts',
                defaultValue: this.orderProducts
              }]
            })
          }.bind(this))
        }
      }
    },
    components: {
      panel, vform, vtable, modalTpl
    }
  }
</script>

