<template>
  <div class="form-resourcescope-detail form-detail">
    <panel>
      <h1 slot="header">新增资源范围</h1>
      <vform id="resourcescope-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.resourcescopelist,
          saveUrl: commonUrls.resourceScopeSave
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            let rules = {
              'items': [
                {
                  'name': 'name',
                  'label': '资源范围名称',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,38}\\S$'
                  }],
                  'placeholder': '资源范围名'
                },
                {
                  'name': 'scopeId',
                  'label': '资源范围账号',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                    'regex': '^\\w{5,40}$'
                  }],
                  'placeholder': '资源范围账号'
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
            return {
              rules
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
