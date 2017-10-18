<template>
  <div class="form-product-detail form-detail">
    <panel>
      <h1 slot="header">更新商品</h1>
      <vform id="product-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.product.info,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.product.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.product.list,
          saveUrl: commonUrls.product.update,
          afterSaveUrl: commonUrls.vuerouter.product.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'name',
                      'label': '名称',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '名称在2-40个字符之间，且前后不能有空格',
                        'regex': '^\\S.{0,38}\\S$'
                      }],
                      'placeholder': '名称',
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
                      'name': 'productCategoryId',
                      'label': '商品类别',
                      'type': 'select',
                      items: responseInner.data.productCategories,
                      'validate': [{
                        'errorMsg': '不能为空',
                        'regex': '^\\S+$'
                      }],
                      defaultValue: response.data.productCategoryId
                    },
                    {
                      'name': 'unit',
                      'label': '单位',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '单位在1-40个字符之间，且前后不能有空格',
                        'regex': '^((\\S)|(\\S.{0,38}\\S))$'
                      }],
                      'placeholder': '单位',
                      defaultValue: response.data.unit
                    },
                    {
                      'name': 'specification',
                      'label': '规格',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '规格在1-40个字符之间，且前后不能有空格',
                        'regex': '^(\\S)|(\\S.{0,38}\\S)$'
                      }],
                      'placeholder': '规格',
                      defaultValue: response.data.specification
                    },
                    {
                      'name': 'color',
                      'label': '颜色',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '颜色在1-40个字符之间，且前后不能有空格',
                        'regex': '^(\\S)|(\\S.{0,38}\\S)$'
                      }],
                      required: false,
                      'placeholder': '颜色',
                      defaultValue: response.data.color
                    },
                    {
                      'name': 'costPrice',
                      'label': '成本价',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '请输入整数或者2小数位的小数',
                        'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                      }],
                      'placeholder': '成本价',
                      defaultValue: response.data.costPrice
                    },
                    {
                      'name': 'salePrice',
                      'label': '销售价',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '请输入整数或者2小数位的小数',
                        'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                      }],
                      'placeholder': '销售价',
                      defaultValue: response.data.salePrice
                    },
                    {
                      'name': 'pictureFiles',
                      'label': '商品图片',
                      'type': 'image',
                      'validate': [{
                        'errorMsg': '只能为图片文件',
                        'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                      }],
                      'maxSize': 200000,
                      'quantity': 5,
                      'required': false,
                      'path': response.data.pictures ? response.data.pictures : undefined
                    },
                    {
                      'name': 'additionalMsg',
                      'label': '补充信息',
                      'type': 'textarea',
                      defaultValue: response.data.additionalMsg
                    }
                  ],
                  action: {
                    save: {
                      label: '更新'
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
                  id: 'product-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'product-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'product-update-form',
                error
              })
            })
          }
        }
      }
    },
    components: {
      panel, vform
    }
  }
</script>

<style scoped>

</style>
