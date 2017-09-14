<template>
  <div class="form-blocktag-detail form-detail">
    <panel>
      <h1 slot="header">新增功能TAG</h1>
      <vform id="blocktag-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.blockTag.list,
          saveUrl: commonUrls.blockTag.save
        },
        actions: {
          init: function (params) {
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
                  'placeholder': '功能TAG名称'
                },
                {
                  'name': 'tagId',
                  'label': '功能TAGID',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                    'regex': '^\\w{5,40}$'
                  }],
                  'placeholder': '功能TAGID'
                },
                {
                  'name': 'description',
                  'label': '详细说明',
                  'type': 'textarea',
                  required: false
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
              id: 'blocktag-add-form',
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
