<template>
  <div class="form-articletag-detail form-detail">
    <panel>
      <h1 slot="header">新增文章TAG</h1>
      <vform id="articletag-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.articleTag.list,
          saveUrl: commonUrls.articleTag.save
        },
        actions: {
          init: function (params) {
            let rules = {
              'items': [
                {
                  'name': 'name',
                  'label': 'TAG名称',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': 'TAG名称在2-40个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,38}\\S$'
                  }],
                  'placeholder': 'TAG名称'
                },
                {
                  'name': 'tagId',
                  'label': 'TAGID',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                    'regex': '^\\w{5,40}$'
                  }],
                  'placeholder': 'TAGID'
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
              id: 'articletag-add-form',
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
