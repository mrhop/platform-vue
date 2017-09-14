<template>
  <div class="form-staticresource-detail form-detail">
    <panel>
      <h1 slot="header">新增静态资源</h1>
      <vform id="staticresource-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform

  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: global.staticResourceBackUrl,
          saveUrl: commonUrls.staticresource.save
        },
        actions: {
          init: function (params) {
            let hiddenId = this.$route.query.themeId ? {
              'name': 'themeId',
              'type': 'hidden',
              defaultValue: this.$route.query.themeId
            } : null
            if (!hiddenId) {
              hiddenId = this.$route.query.websiteId ? {
                'name': 'websiteId',
                'type': 'hidden',
                defaultValue: this.$route.query.websiteId
              } : {}
            }
            let rules = {
              'items': [
                hiddenId,
                {
                  'name': 'name',
                  'label': '名称',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '主题名称在2-255个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,253}\\S$'
                  }],
                  'placeholder': '名称'
                },
                {
                  'name': 'files',
                  'label': '文件',
                  'type': 'file',
                  'maxSize': 10000000,
                  required: true
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
              id: 'staticresource-add-form',
              data: {
                rules
              }
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
