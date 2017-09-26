<template>
  <div class="form-media-detail form-detail">
    <panel>
      <h1 slot="header">媒体详情</h1>
      <vform id="media-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.media.list
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
                    'defaultValue': response.data.name,
                    locked: true
                  },
                  {
                    'name': 'mediaTagName',
                    'label': '媒体库',
                    'type': 'text',
                    locked: true,
                    'defaultValue': response.data.mediaTagName
                  },
                  {
                    'name': 'files',
                    'label': '媒体文件',
                    'type': 'file',
                    'maxSize': 2000000,
                    'path': response.data.url ? [response.data.url] : undefined,
                    locked: true
                  },
                  {
                    'name': 'published',
                    'label': '已发布',
                    'type': 'text',
                    defaultValue: response.data.published ? '是' : '否',
                    locked: true
                  },
                  {
                    'name': 'publishDate',
                    'label': '发布日期',
                    'type': 'date',
                    hidden: !response.data.published,
                    defaultValue: response.data.published ? response.data.publishDate : undefined,
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
                id: 'media-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'media-detail-form',
                error
              })
            })
          }.bind(this)
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
