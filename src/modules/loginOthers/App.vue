<template>
  <panel id="login-wrapper" :col="6">
    <h1 slot="header">用户登录</h1>
    <p v-if="authenticationError" class="error">
      用户名或密码错误,请重新输入
    </p>
    <vform id="login-form" :actionUrls="formActionUrls" :actions="formActions"></vform>
  </panel>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../components/common/loginOthers'

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
                    'name': 'username',
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
                  }
                }
              }
            }
          }
        },
        formActionUrls: {
          directSaveUrl: commonUrls.login
        },
        authenticationError: false
      }
    },
    methods: {},
    components: {
      panel, vform
    },
    mounted () {
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
      var results = regex.exec(window.location.href)
      if (results && results[2]) {
        this.authenticationError = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../scss/import.scss";

  #login-wrapper {
    padding: 0;
    background: $base-background;
    border-radius: 5px;
    color: #fff;
    overflow: hidden;
    @media(min-width: $screen-sm-min) {
      position: absolute;
      margin-left: 25%;
      top: 50%;
    }
    .panel-wrapper {
      margin: 0;
      border: 0;
      > header {
        margin-top: 10px;
        background: none;
        color: #fff;
        text-align: center;
      }
      .form-wrapper {
        .actions {
          a.registration, a.login {
            color: #fff;
            text-decoration: underline;
            position: absolute;
            right: 0;
            bottom: 0;
            &:hover {
              color: $brand-primary;
            }
          }
        }
      }
    }
    p.error {
      text-align: right;
      margin: 5px 20px 0 0;
      color: $brand-danger;
    }
  }

  #login-wrapper {
    @media(min-width: $screen-sm-min) {
      margin-top: -103px;
    }
  }

  #registration-wrapper {
    @media(min-width: $screen-sm-min) {
      margin-top: -182px;
    }
  }
</style>
