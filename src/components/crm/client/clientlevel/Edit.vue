<template>
  <div class="form-clientlevel-detail form-detail">
    <panel>
      <h1 slot="header">更新客户级别</h1>
      <vform id="clientlevel-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.clientLevel.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.clientLevel.list,
          saveUrl: commonUrls.clientLevel.update,
          afterSaveUrl: commonUrls.vuerouter.clientLevel.list
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
                    'validate': [{
                      'errorMsg': '名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '名称',
                    defaultValue: response.data.name
                  },
                  {
                    'name': 'orderAmount',
                    'label': '订单金额',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入整数或者2小数位的小数',
                      'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                    }],
                    'placeholder': '最低完成的订单金额',
                    required: false,
                    defaultValue: response.data.orderAmount
                  },
                  {
                    'name': 'additionalMsg',
                    'label': '补充信息',
                    'type': 'textarea',
                    'placeholder': '补充信息',
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
                id: 'clientlevel-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'clientlevel-update-form',
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
