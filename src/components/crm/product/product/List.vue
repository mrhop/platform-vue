<template>
  <div class="product-list">
    <panel>
      <h1 slot="header">商品列表</h1>
      <vtable id="product-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
    url: commonUrls.product.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.product.add,
          detailUrl: commonUrls.vuerouter.product.detail,
          infoUrl: commonUrls.vuerouter.product.edit,
          deleteUrl: commonUrls.product.delete
        },
        actions: {
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
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'product-list',
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
                          },
                          {
                            'name': 'specification',
                            'title': '规格',
                            'type': 'text'
                          },
                          {
                            'name': 'unit',
                            'title': '单位',
                            'type': 'text'
                          },
                          {
                            'name': 'picture',
                            'title': '图片',
                            'type': 'image'
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
                  global.store.commit('TABLE_FAILURE', {id: 'product-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'product-list', error})
              })
            } else {
              let config = {
                url: commonUrls.product.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'product-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'product-list', error})
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
