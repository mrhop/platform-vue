<template>
  <!--登录页面，需要考虑的是module，panel以及-->
  <panel id="registration-wrapper" :col="6">
    <h1 slot="header">用户注册</h1>
    <vform id="registration-form" :actionUrls="formActionUrls" :actions="formActions"></vform>
  </panel>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/login'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  export default{
    data () {
      return {
        formActions: {
          init: function (params) {
            return {
              'rules': {
                'items': [
                  {
                    'name': 'account',
                    'label': '账号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '账号',
                    'locked': false,
                    'error': true
                  },
                  {
                    'name': 'phone',
                    'label': '手机号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '请输入正确的手机号',
                      'regex': '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|(17|18)[0|1|2|3|5|6|7|8|9])\\d{8}$'
                    }],
                    'placeholder': '手机号',
                    'locked': false,
                    'error': true
                  },
                  {
                    'name': 'email',
                    'label': '邮箱',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '请输入正确的Email',
                      'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                    }],
                    'placeholder': 'Email',
                    'locked': false,
                    'error': true
                  },
                  {
                    'name': 'password',
                    'label': '密码',
                    'type': 'password',
                    'placeholder': '密码',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '至少包含数字，字母以及特殊字符【!@#$%^&*_】中任意两种,并在5-15字符之间',
                      'regex': '^(?![a-zA-Z]+$)(?!\\d+$)(?![!@#$%^&*_]+$)[\\w!@#$%^&*]{5,15}$'
                    }]
                  },
                  {
                    'name': 'repeatPassword',
                    'label': '确认密码',
                    'type': 'password',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }]
                  }
                ],
                'action': {
                  'save': {
                    'label': '注册'
                  },
                  'others': [{
                    'key': 'login',
                    'label': '返回登录!'
                  }]
                }
              }
            }
          },
          save: function (params) {
            if (params.data) {
              console.log('these data will be saved:' + JSON.stringify(params.data))
            }
            // 此处需要判断密码是否一致，然后post到数据库
            console.log('deal with the data by this save function itself')
            return {
              success: {
                title: '保存数据',
                message: '保存成功'
              }
            }
          }
        },
        formActionUrls: {
          login: commonUrls.loginPage
        }
      }
    },
    methods: {},
    components: {
      panel, vform
    }
  }
</script>

<style scoped>
</style>
