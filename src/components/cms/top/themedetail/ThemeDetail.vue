<template>
  <div class="form-theme-detail form-detail">
    <panel>
      <h1 slot="header">主题详情</h1>
      <vform id="theme-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.theme.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.theme.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '主题名称',
                    'type': 'text',
                    'defaultValue': response.data.name,
                    'placeholder': '主题名称',
                    locked: true
                  },
                  {
                    'name': 'themeId',
                    'label': '主题ID',
                    'type': 'text',
                    'defaultValue': response.data.themeId,
                    locked: true
                  },
                  {
                    'name': 'relatedUserAccounts',
                    'label': '关联用户',
                    'type': 'text',
                    'defaultValue': response.data.relatedUserAccounts,
                    locked: true
                  },
                  {
                    'name': 'screenshotFiles',
                    'label': '主题截图',
                    'type': 'image',
                    locked: true,
                    'path': response.data.screenshots ? response.data.screenshots : undefined
                  }
                ],
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'theme-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'theme-detail-form',
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
