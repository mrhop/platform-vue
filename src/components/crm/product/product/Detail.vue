product
<template>
  <div class="form-product-detail form-detail">
    <panel>
      <h1 slot="header">商品详情</h1>
      <vform id="product-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel class="tabPanel">
      <tabTpl :tabSelected="0">
        <ul slot="header">
          <li>价格历史列表</li>
          <li>价格走势</li>
        </ul>
        <ul>
          <li>
            <vtable id="producthistory-list" :editable="true" :actions="priceHistoryActions"></vtable>
          </li>
          <li>
            <vchart :chartConfig="chartConfig" :chartTrigger="chartUpdateTrigger"/>
          </li>
        </ul>
      </tabTpl>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import ColorParser from 'color'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let vtable = huodhVuePlugins.vtable
  let tabTpl = huodhVuePlugins.tabTpl
  let vchart = huodhVuePlugins.vchart
  let initConfig = {
    url: commonUrls.product.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.product.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '名称',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.name
                  },
                  {
                    'name': 'code',
                    'title': '商品码',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.code
                  },
                  {
                    'name': 'productCategoryName',
                    'label': '商品类别',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.productCategoryName
                  },
                  {
                    'name': 'unit',
                    'label': '单位',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.unit
                  },
                  {
                    'name': 'specification',
                    'label': '规格',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.specification
                  },
                  {
                    'name': 'color',
                    'label': '颜色',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.color
                  },
                  {
                    'name': 'costPrice',
                    'label': '成本价',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.costPrice
                  },
                  {
                    'name': 'salePrice',
                    'label': '销售价',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.salePrice
                  },
                  {
                    'name': 'pictureFiles',
                    'label': '商品图片',
                    'type': 'image',
                    locked: true,
                    'path': response.data.pictures ? response.data.pictures : undefined
                  },
                  {
                    'name': 'additionalMsg',
                    'label': '补充信息',
                    'type': 'textarea',
                    locked: true,
                    defaultValue: response.data.additionalMsg
                  }
                ],
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'product-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'product-detail-form',
                error
              })
            })
          }
        },
        priceHistoryActions: {
          list: function (args) {
            var init = args.init
            if (init) {
              let config = {
                url: commonUrls.productPriceHistory.list + '?productId=' + this.$route.query.key,
                method: 'post',
                data: {init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'producthistory-list',
                  data: {
                    'rules': {
                      'header': [
                        {
                          'name': '#sn',
                          'title': '#sn'
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
                        },
                        {
                          'name': '起始日期',
                          'title': 'beginDate',
                          'type': 'datetime'
                        },
                        {
                          'name': '截止日期',
                          'title': 'endDate',
                          'type': 'datetime'
                        }
                      ],
                      'action': {},
                      'feature': {
                        'filter': false,
                        'pager': false
                      }
                    },
                    'data': response.data
                  },
                  callParameters: {init: true}
                })
                if (response.data && response.data.rows) {
                  let costPrices = []
                  let salePrices = []
                  for (let key in response.data.rows) {
                    this.chartConfig.data.labels.push(new Date(response.data.rows[key].value[2]))
                    costPrices.push(response.data.rows[key].value[0])
                    salePrices.push(response.data.rows[key].value[1])
                  }
                  this.chartConfig.data.datasets.push({
                    label: '成本价',
                    borderColor: 'blue',
                    backgroundColor: new ColorParser('blue').fade(0.5),
                    fill: false,
                    data: costPrices
                  })
                  this.chartConfig.data.datasets.push({
                    label: '销售价',
                    borderColor: 'red',
                    backgroundColor: new ColorParser('red').fade(0.5),
                    fill: false,
                    data: salePrices
                  })
                  this.chartUpdateTrigger = !this.chartUpdateTrigger
                }
              }.bind(this)).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'producthistory-list', error})
              })
            } else {
              let config = {
                url: commonUrls.productPriceHistory.list + '?productId=' + this.$route.query.key,
                method: 'post',
                data: {}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'producthistory-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'producthistory-list', error})
              })
            }
          }.bind(this)
        },
        chartConfig: {
          type: 'line',
          data: {
            labels: [],
            datasets: []
          },
          options: {
            title: {
              text: '商品历史价格趋势图'
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  parser: 'YYYY-MM-DD HH:mm',
                  // round: 'day'
                  tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
                  displayFormats: {
                    month: 'YYYY-MM',
                    day: 'YYYY-MM-DD'
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: '日期'
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: '价格'
                }
              }]
            }
          }
        },
        chartUpdateTrigger: false
      }
    },
    components: {
      panel, vform, tabTpl, vtable, vchart
    }
  }
</script>

<style scoped>

</style>
