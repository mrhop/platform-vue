<template>

  <panel id="login-wrapper" :col="6">
    <h1 slot="header">用户登录</h1>
    <vform id="login-form" :actionUrls="formActionUrls" :actions="formActions"></vform>
  </panel>
  <!--登录页面，需要考虑的是module，panel以及-->
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  // 此处需要根据url获取需要redirect的url或者是关联的clientId,将formrule进行对应的更改
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
                      'errorMsg': '请输入正确的账号，手机号或者Email',
                      'regex': '^(\\w{5,40})|(\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)|((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|(17|18)[0|1|2|3|5|6|7|8|9])\\d{8})$'
                    }],
                    'placeholder': '账号/手机号/Email',
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
                    }]
                  }
                ],
                'action': {
                  'save': {
                    'label': '登录'
                  },
                  'others': [{
                    'key': 'registration',
                    'label': '没有账号？请注册!'
                  }]
                }
              }
            }
          }
        },
        formActionUrls: {
          saveUrl: commonUrls.login.login,
          registration: commonUrls.login.registrationPage
        }
      }
    },
    methods: {},
    components: {
      panel, vform
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../scss/import.scss";
</style>
