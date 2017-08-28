<template>
  <!--登录页面，需要考虑的是module，panel以及-->
  <panel id="registration-wrapper" :col="6">
    <h1 slot="header">用户注册</h1>
    <vform id="registration-form" :actionUrls="formActionUrls" :actions="formActions"></vform>
    <modalTpl :confirmModal="false"
              type="success"
              :trigger="succeed" v-on:closeEvent="routeToLogin">
      <span slot="header">注册成功</span>
      <div slot="body">点击返回登录页面</div>
    </modalTpl>
  </panel>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/login'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let modalTpl = huodhVuePlugins.modalTpl
  export default {
    data () {
      return {
        succeed: false,
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
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '账号'
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
                    }],
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
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '账号由英文，数字和 _ 组成，并在2-40个字符之间',
                      'regex': '^\\S{2,40}$'
                    }],
                    'placeholder': '姓名'
                  },
                  {
                    'name': 'phone',
                    'label': '电话',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '请输入正确的手机号',
                      'regex': '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|(17|18)[0|1|2|3|5|6|7|8|9])\\d{8}$'
                    }],
                    'placeholder': '手机号'
                  },
                  {
                    'name': 'email',
                    'label': 'Email',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }, {
                      'errorMsg': '请输入正确的Email',
                      'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                    }],
                    'placeholder': 'Email'
                  },
                  {
                    'name': 'photoFiles',
                    'label': '头像',
                    'type': 'file',
                    'validate': [{
                      'errorMsg': '只能为图片文件',
                      'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                    }],
                    'maxSize': 50000,
                    required: false
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
          save: function ({key, data, multipart}) {
            let config = {
              headers: {'Content-Type': 'multipart/form-data'},
              url: commonUrls.registration,
              method: 'post',
              data: this.$Vue.generateFormData(data)
            }
            const _this = this
            axios.request(config).then(function (response) {
              if (response.data && response.data.error) {
                global.store.commit('FORM_SAVE_SUCCESS', {
                  id: 'registration-form',
                  data: response.data
                })
              } else {
                // trigger the module,and the route to the right login page
                _this.succeed = !_this.succeed
              }
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {
                id: 'registration-form',
                error
              })
            })
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.repassword !== undefined) {
              for (let key in params.items) {
                if (params.items[key].name === 'password') {
                  if (params.items[key].defaultValue !== params.changed.repassword) {
                    return [
                      {
                        'name': 'repassword',
                        'validatedMsg': '密码不一致'
                      }
                    ]
                  } else {
                    return [
                      {
                        'name': 'repassword'
                      }
                    ]
                  }
                }
              }
            } else if (params.changed.password !== undefined) {
              for (let key in params.items) {
                if (params.items[key].name === 'repassword') {
                  if (params.items[key].defaultValue !== params.changed.password) {
                    return [
                      {
                        'name': 'repassword',
                        'validatedMsg': '密码不一致'
                      }
                    ]
                  } else {
                    return [
                      {
                        'name': 'repassword'
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        formActionUrls: {
          login: commonUrls.loginPage
        }
      }
    },
    methods: {
      routeToLogin () {
        // go to the login page
        this.$router.push(commonUrls.loginPage)
      }
    },
    components: {
      panel, vform, modalTpl
    }
  }
</script>

<style scoped>
</style>
