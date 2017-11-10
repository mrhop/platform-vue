<template>
  <div class="form-mediatag-detail form-detail">
    <panel>
      <h1 slot="header">新增媒体库</h1>
      <vform id="mediatag-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.mediaTag.list,
          saveUrl: commonUrls.mediaTag.save
        },
        actions: {
          init: function (params) {
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
                  'placeholder': '媒体库名称'
                },
                {
                  'name': 'tagId',
                  'label': '媒体库ID',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '媒体库ID由英文，数字和 _ 组成，并在5-40个字符之间',
                    'regex': '^\\w{5,40}$'
                  }],
                  'placeholder': '媒体库ID'
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
              id: 'mediatag-add-form',
              data: {
                rules
              }
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
