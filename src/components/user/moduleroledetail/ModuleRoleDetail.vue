<template>
  <div class="form-module-role-detail form-detail">
    <panel>
      <h1 slot="header">模块角色详情</h1>
      <vform id="module-role-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.modulerolelist
        },
        actions: {
          init: function (params) {
            let config = {
              url: commonUrls.moduleRoleInfo,
              method: 'get',
              params: {key: params.key}
            }
            axios.request(config).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '模块角色名称',
                    'type': 'text',
                    'placeholder': '模块角色名称',
                    'defaultValue': response.data.name,
                    'locked': true
                  },
                  {
                    'name': 'authority',
                    'label': '模块角色ID',
                    'type': 'text',
                    'placeholder': '模块角色ID',
                    'defaultValue': response.data.authority,
                    'locked': true
                  },
                  {
                    'name': 'clientName',
                    'label': '所属客户端',
                    'type': 'text',
                    'defaultValue': response.data.clientName,
                    'locked': true
                  }
                ],
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'module-role-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'module-role-detail-form',
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
