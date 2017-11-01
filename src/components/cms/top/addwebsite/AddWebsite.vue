<template>
  <div class="form-website-detail form-detail">
    <panel>
      <h1 slot="header">新增网站</h1>
      <vform id="website-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.website.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.website.list,
          saveUrl: commonUrls.website.save
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            axios.request(ruleChangeConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '网站名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '网站名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '网站名称'
                  },
                  {
                    'name': 'websiteId',
                    'label': '网站ID',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '网站ID'
                  },
                  {
                    'name': 'themeId',
                    'label': '关联主题',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    items: response.data.themes
                  },
                  {
                    'name': 'url',
                    'label': '网站地址',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请填写符合格式的网站地址',
                      'regex': '^http(s)?://[\\w-.]+(:[\\d]+)?(/[\\w-.#]*)*(/[\\w-.\\?%&=]*)?$'
                    }],
                    'placeholder': '网站地址'
                  },
                  {
                    'name': 'title',
                    'label': '网站标题',
                    'type': 'text',
                    'placeholder': '网站标题'
                  },
                  {
                    'name': 'subtitle',
                    'label': '网站子标题',
                    'type': 'text',
                    'placeholder': '网站子标题'
                  },
                  {
                    'name': 'phone',
                    'label': '电话',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入正确的手机号',
                      'regex': '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|(17|18)[0|1|2|3|5|6|7|8|9])\\d{8}$'
                    }],
                    'placeholder': '手机号',
                    required: false
                  },
                  {
                    'name': 'email',
                    'label': 'Email',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入正确的Email',
                      'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                    }],
                    'placeholder': 'Email',
                    required: false
                  },
                  {
                    'name': 'screenshotFiles',
                    'label': '网站截图',
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
                rules.items.splice(8, 0, {
                  'name': 'relatedUserIds',
                  'label': '关联用户',
                  'type': 'checkbox',
                  items: response.data.relatedUsers,
                  required: false
                })
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'website-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'website-add-form',
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
