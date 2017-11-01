<template>
  <div class="form-theme-detail form-detail">
    <panel>
      <h1 slot="header">新增主题</h1>
      <vform id="theme-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.theme.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.theme.list,
          saveUrl: commonUrls.theme.save
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            axios.request(ruleChangeConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '主题名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '主题名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '主题名称'
                  },
                  {
                    'name': 'themeId',
                    'label': '主题ID',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '主题ID'
                  },
                  {
                    'name': 'screenshotFiles',
                    'label': '主题截图',
                    'type': 'image',
                    'validate': [{
                      'errorMsg': '只能为图片文件',
                      'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                    }],
                    'maxSize': 200000,
                    'quantity': 5,
                    'required': false
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
              if (response.data.relatedUsers) {
                rules.items.splice(2, 0, {
                  'name': 'relatedUserIds',
                  'label': '关联用户',
                  'type': 'checkbox',
                  items: response.data.relatedUsers,
                  required: false
                })
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'theme-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'theme-add-form',
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
