<template>
  <div class="form-resourcescope-detail form-detail">
    <panel>
      <h1 slot="header">资源范围详情</h1>
      <vform id="resourcescope-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.resourcescopelist
        },
        actions: {
          init: function (params) {
            let config = {
              url: commonUrls.resourceScopeInfo,
              method: 'get',
              params: {key: params.key}
            }
            axios.request(config).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '资源范围名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '资源范围名',
                    'defaultValue': response.data.name,
                    locked: true
                  },
                  {
                    'name': 'scopeId',
                    'label': '资源范围账号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '资源范围账号',
                    'defaultValue': response.data.scopeId,
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
                id: 'resourcescope-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'resourcescope-detail-form',
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
