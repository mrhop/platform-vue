<template>
  <div class="form-staticresource-detail form-detail">
    <panel>
      <h1 slot="header">静态资源详情</h1>
      <vform id="staticresource-detail-form" :actions="actions" :actionUrls="actionUrls">
      </vform>
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
    url: commonUrls.staticresource.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: global.getCookie('staticResourceBackUrl')
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
                      'errorMsg': '主题名称在2-255个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,253}\\S$'
                    }],
                    defaultValue: response.data.name,
                    locked: true
                  },
                  {
                    'name': 'files',
                    'label': '文件',
                    'type': 'file',
                    locked: true,
                    'path': response.data.url ? [response.data.url] : undefined
                  },
                  {
                    'name': 'type',
                    'label': '文件类型',
                    'type': 'text',
                    defaultValue: response.data.type,
                    locked: true
                  },
                  {
                    'name': 'filename',
                    'label': '文件名',
                    'type': 'text',
                    defaultValue: response.data.filename,
                    locked: true
                  },
                  {
                    'name': 'fileType',
                    'label': '文件类型',
                    'type': 'text',
                    defaultValue: response.data.fileType,
                    locked: true
                  },
                  {
                    'name': 'size',
                    'label': '文件大小（Byte）',
                    'type': 'text',
                    defaultValue: response.data.size,
                    locked: true
                  },
                  {
                    'name': 'beforeId',
                    'label': '前置资源',
                    'type': 'text',
                    defaultValue: response.data.beforeName,
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
                id: 'staticresource-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'staticresource-detail-form',
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
