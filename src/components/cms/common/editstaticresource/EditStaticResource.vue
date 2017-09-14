<template>
  <div class="form-staticresource-detail form-detail">
    <panel>
      <h1 slot="header">更新静态资源</h1>
      <vform id="staticresource-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform

  let ruleChangeConfig = {
    url: commonUrls.staticresource.rulechange,
    method: 'get'
  }
  let initConfig = {
    url: commonUrls.staticresource.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: global.staticResourceBackUrl,
          saveUrl: commonUrls.staticresource.update
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              ruleChangeConfig.params = {key: params.key}
              axios.request(ruleChangeConfig).then(function (responseInner) {
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
                      'placeholder': '名称'
                    },
                    {
                      'name': 'files',
                      'label': '文件',
                      'type': 'file',
                      'maxSize': 10000000,
                      'validate': response.data.fileType && [{
                        'errorMsg': '图片类型应保持一致',
                        'regex': '\\.' + response.data.fileType + '(\\?.*)?$'
                      }],
                      required: false
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
                      'type': 'select',
                      defaultValue: response.data.beforeId,
                      items: responseInner.data.beforeStaticResources
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
                  id: 'staticresource-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'staticresource-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'staticresource-update-form',
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
