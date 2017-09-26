<template>
  <div class="form-mediatag-detail form-detail">
    <panel>
      <h1 slot="header">更新媒体库</h1>
      <vform id="mediatag-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.mediaTag.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.mediaTag.list,
          saveUrl: commonUrls.mediaTag.update,
          afterSaveUrl: commonUrls.vuerouter.mediaTag.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '媒体库名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '媒体库名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'defaultValue': response.data.name
                  },
                  {
                    'name': 'tagId',
                    'label': '媒体库ID',
                    'type': 'text',
                    locked: true,
                    'defaultValue': response.data.tagId
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
                id: 'mediatag-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'mediatag-update-form',
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
