<template>
  <div class="form-blocktag-detail form-detail">
    <panel>
      <h1 slot="header">更新功能TAG</h1>
      <vform id="blocktag-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.blockTag.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.blockTag.list,
          saveUrl: commonUrls.blockTag.update,
          afterSaveUrl: commonUrls.vuerouter.blockTag.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '功能TAG名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '功能TAG名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'defaultValue': response.data.name,
                    'placeholder': '功能TAG名称'
                  },
                  {
                    'name': 'tagId',
                    'label': '功能TAGID',
                    'type': 'text',
                    locked: true,
                    'defaultValue': response.data.tagId
                  },
                  {
                    'name': 'description',
                    'label': '详细说明',
                    'type': 'textarea',
                    'defaultValue': response.data.description
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
                id: 'blocktag-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'blocktag-update-form',
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
