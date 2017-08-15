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
                    'name': 'username',
                    'label': '账号',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'name',
                    'label': '姓名',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'phone',
                    'label': '电话',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'email',
                    'label': 'Email',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'enabledStr',
                    'label': '是否激活',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'limitedDate',
                    'label': '有效期',
                    'type': 'date',
                    'locked': true
                  },
                  {
                    'name': 'authoritiesStr',
                    'label': '权限',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'clientsStr',
                    'label': '关联客户端',
                    'type': 'text',
                    'locked': true
                  },
                  {
                    'name': 'modulesAuthoritiesStr',
                    'label': '模块权限',
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
              console.log(error)
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
