<template>
  <div class="form-orderdiscount-detail form-detail">
    <panel>
      <h1 slot="header">订单折扣标准详情</h1>
      <vform id="orderdiscount-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.orderDiscount.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.orderDiscount.list,
          saveUrl: commonUrls.orderDiscount.detail,
          afterSaveUrl: commonUrls.vuerouter.orderDiscount.list
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
                    defaultValue: response.data.name,
                    locked: true
                  },
                  {
                    'name': 'quota',
                    'label': '订单金额下限',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.quota
                  },
                  {
                    'name': 'type',
                    'label': '折扣类型',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.type === 'discount' ? '折扣' : '满减'
                  },
                  response.data.type === 'discount' ? {
                    'name': 'discount',
                    'label': '折扣',
                    'type': 'text',
                    defaultValue: response.data.discount,
                    locked: true
                  } : {
                    'name': 'reduce',
                    'label': '减免',
                    'type': 'text',
                    defaultValue: response.data.reduce,
                    locked: true
                  },
                  {
                    'name': 'clientLevelName',
                    'label': '客户级别',
                    'type': 'text',
                    defaultValue: response.data.clientLevelName,
                    locked: true
                  },
                  {
                    'name': 'beginDate',
                    'label': '起始日期',
                    'type': 'date',
                    defaultValue: response.data.beginDate,
                    locked: true
                  },
                  {
                    'name': 'endDate',
                    'label': '结束日期',
                    'type': 'date',
                    defaultValue: response.data.endDate,
                    locked: true
                  }
                ],
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'orderdiscount-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'orderdiscount-detail-form',
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
