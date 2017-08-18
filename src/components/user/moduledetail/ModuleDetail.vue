<template>
  <div class="form-app-detail form-detail">
    <panel>
      <h1 slot="header">应用详情</h1>
      <vform id="app-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import axios from 'axios'
  import {commonUrls} from '../../common/user'
  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  export default{
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.applist
        },
        actions: {
          init: function (params) {
            let config = {
              url: commonUrls.appInfo,
              method: 'get',
              params: {key: params.key}
            }
            axios.request(config).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'clientName',
                    'label': '应用名称',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'clientId',
                    'label': '应用账号',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'authorizedGrantTypesStr',
                    'label': '授权方式',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'scopesStr',
                    'label': '授权范围',
                    'type': 'text',
                    'locked': true
                  }
                ],
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              if (response.data) {
                for (var key in rules.items) {
                  if (response.data.hasOwnProperty(rules.items[key].name)) {
                    rules.items[key].defaultValue = response.data[rules.items[key].name]
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'app-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'app-detail-form',
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

<style rel="stylesheet/scss" lang="scss">
</style>
