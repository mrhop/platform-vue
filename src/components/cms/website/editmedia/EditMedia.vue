<template>
  <div class="form-media-update form-update">
    <panel>
      <h1 slot="header">更新媒体</h1>
      <vform id="media-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.media.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.media.list,
          saveUrl: commonUrls.media.update
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: this.$route.query.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '媒体名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '媒体名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'defaultValue': response.data.name
                  },
                  {
                    'name': 'mediaTagId',
                    'label': '媒体库',
                    'type': 'text',
                    'defaultValue': response.data.mediaTagName,
                    locked: true
                  },
                  {
                    'name': 'files',
                    'label': '媒体文件',
                    'type': 'file',
                    'maxSize': 2000000,
                    'path': response.data.url ? [response.data.url] : undefined,
                    'validate': response.data.fileType && [{
                      'errorMsg': '图片类型应保持一致',
                      'regex': '\\.' + response.data.fileType + '(\\?.*)?$'
                    }]
                  },
                  {
                    'name': 'published',
                    'label': '已发布',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    items: [
                      {
                        label: '是',
                        value: true
                      },
                      {
                        label: '否',
                        value: false
                      }
                    ],
                    defaultValue: response.data.published,
                    ruleChange: true
                  },
                  {
                    'name': 'publishDate',
                    'label': '发布日期',
                    'type': 'date',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    hidden: !response.data.published,
                    defaultValue: response.data.published ? response.data.publishDate : undefined
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
                id: 'media-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'media-update-form',
                error
              })
            })
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('published')) {
              if (params.changed.published) {
                return [
                  {
                    'name': 'publishDate',
                    'hidden': false
                  }
                ]
              } else {
                return [
                  {
                    'name': 'publishDate',
                    'hidden': true
                  }
                ]
              }
            }
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
