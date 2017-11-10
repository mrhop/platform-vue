<template>
  <div class="form-media-add form-add">
    <panel>
      <h1 slot="header">新增媒体</h1>
      <vform id="media-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.media.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.media.list,
          saveUrl: commonUrls.media.save
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            axios.request(ruleChangeConfig).then(function (response) {
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
                    required: false,
                    'placeholder': '媒体名称'
                  },
                  {
                    'name': 'mediaTagId',
                    'label': '媒体库',
                    'type': 'select',
                    items: response.data.mediaTags,
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }]
                  },
                  {
                    'name': 'files',
                    'label': '媒体文件',
                    'type': 'file',
                    'maxSize': 2000000,
                    'required': true
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
                    hidden: true
                  }
                ],
                action: {
                  save: {
                    label: '保存'
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
                id: 'media-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'media-add-form',
                error
              })
            })
          },
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
