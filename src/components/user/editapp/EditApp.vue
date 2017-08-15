<template>
  <div class="form-app-detail form-detail">
    <panel>
      <h1 slot="header">更新应用</h1>
      <vform id="app-update-form" :actions="actions" :actionUrls="actionUrls"
             v-on:afterSaved="backToAppList"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import axios from 'axios'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.userInfo,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.applist,
          saveUrl: commonUrls.appUpdate
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            //  去除掉save的操作，目的是为了测试afterSaved的处理
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'username',
                    'label': '账号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '账号',
                    'defaultValue': response.data.username
                  },
                  {
                    'name': 'password',
                    'label': '密码',
                    'type': 'password',
                    'placeholder': '密码',
                    'validate': [{
                      'errorMsg': '至少包含数字，字母以及特殊字符【!@#$%^&*_】中任意两种,并在5-15字符之间',
                      'regex': '^(?![a-zA-Z]+$)(?!\\d+$)(?![!@#$%^&*_]+$)[\\w!@#$%^&*]{5,15}$'
                    }],
                    'required': false,
                    'ruleChange': true
                  },
                  {
                    'name': 'repassword',
                    'label': '重复密码',
                    'type': 'password',
                    'placeholder': '重复密码',
                    'ruleChange': true
                  },
                  {
                    'name': 'name',
                    'label': '姓名',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '姓名',
                    'defaultValue': response.data.name
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
                    'defaultValue': response.data.phone
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
                    'defaultValue': response.data.email
                  },
                  {
                    'name': 'photoFiles',
                    'label': '头像',
                    'type': 'image',
                    'validate': [{
                      'errorMsg': '只能为图片文件',
                      'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                    }],
                    'maxSize': 50000,
                    'path': response.data.photo ? [response.data.photo] : undefined,
                    'required': false
                  },
                  {
                    'name': 'enabled',
                    'label': '是否激活',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'items': [
                      {
                        'label': '激活',
                        'value': true
                      },
                      {
                        'label': '未激活',
                        'value': false
                      }
                    ],
                    'defaultValue': response.data.enabled
                  },
                  {
                    'name': 'limitedDate',
                    'label': '有效期',
                    'type': 'date',
                    'defaultValue': response.data.limitedDate
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
                id: 'app-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'app-update-form',
                error
              })
            })
          }
        }
      }
    },
    methods: {
      backToAppList: function () {
        this.$router.push(commonUrls.vuerouter.userlist)
      }
    },
    components: {
      panel, vform
    }
  }
</script>

<style scoped>

</style>
