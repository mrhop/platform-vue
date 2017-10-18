<template>
  <div class="form-product-detail form-detail">
    <panel>
      <h1 slot="header">新增商品</h1>
      <vform id="product-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'
  import axios from 'axios'
  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let ruleChangeConfig = {
    url: commonUrls.product.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.product.list,
          saveUrl: commonUrls.product.save
        },
        actions: {
          init: function (params) {
            axios.request(ruleChangeConfig).then(function (response) {
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
                    'placeholder': '名称'
                  },
                  {
                    'name': 'productCategoryId',
                    'label': '商品类别',
                    'type': 'select',
                    items: response.data.productCategories,
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }]
                  },
                  {
                    'name': 'unit',
                    'label': '单位',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '单位在1-40个字符之间，且前后不能有空格',
                      'regex': '^((\\S)|(\\S.{0,38}\\S))$'
                    }],
                    'placeholder': '单位'
                  },
                  {
                    'name': 'specification',
                    'label': '规格',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '规格在1-40个字符之间，且前后不能有空格',
                      'regex': '^(\\S)|(\\S.{0,38}\\S)$'
                    }],
                    'placeholder': '规格'
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
                    'placeholder': '颜色'
                  },
                  {
                    'name': 'costPrice',
                    'label': '成本价',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入整数或者2小数位的小数',
                      'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                    }],
                    'placeholder': '成本价'
                  },
                  {
                    'name': 'salePrice',
                    'label': '销售价',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入整数或者2小数位的小数',
                      'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                    }],
                    'placeholder': '销售价'
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
                    'required': false
                  },
                  {
                    'name': 'additionalMsg',
                    'label': '补充信息',
                    'type': 'textarea'
                  }
                ],
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
                id: 'product-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'product-add-form',
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
