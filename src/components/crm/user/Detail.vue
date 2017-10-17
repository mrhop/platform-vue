user
<template>
  <div class="form-user-detail form-detail">
    <panel>
      <h1 slot="header">用户详情</h1>
      <vform id="user-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.user.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.user.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'account',
                    'label': '账号',
                    'type': 'text',
                    defaultValue: response.data.account,
                    locked: true
                  },
                  {
                    'name': 'name',
                    'label': '名称',
                    'type': 'text',
                    defaultValue: response.data.name,
                    locked: true
                  },
                  {
                    'name': 'customDiscount',
                    'label': '自定义折扣',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.customDiscount ? '是' : '否'
                  },
                  {
                    'name': 'lowerLimit',
                    'label': '折扣限制',
                    'type': 'text',
                    defaultValue: response.data.lowerLimit,
                    hidden: !response.data.customDiscount,
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
                id: 'user-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'user-detail-form',
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
