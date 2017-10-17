<template>
  <div class="form-user-detail form-detail">
    <panel>
      <h1 slot="header">更新用户</h1>
      <vform id="user-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.user.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.user.list,
          saveUrl: commonUrls.user.update,
          afterSaveUrl: commonUrls.vuerouter.user.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'account',
                    'label': '账号',
                    'type': 'text',
                    defaultValue: response.data.account,
                    locked: true
                  },
                  {
                    'name': 'name',
                    'label': '名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '名称',
                    defaultValue: response.data.name
                  },
                  {
                    'name': 'customDiscount',
                    'label': '自定义折扣',
                    'type': 'select',
                    items: [
                      {
                        label: '是',
                        value: true
                      },
                      {
                        label: '否',
                        value: false
                      }
                    ],
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    defaultValue: response.data.customDiscount,
                    ruleChange: true
                  },
                  {
                    'name': 'lowerLimit',
                    'label': '折扣限制',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入小于1的且小数位小于2的小数',
                      'regex': '^(0?\\.\\d{1,2})$'
                    }],
                    palceholder: '折扣限制＞0且<1',
                    hidden: !response.data.customDiscount,
                    defaultValue: response.data.lowerLimit
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
                id: 'user-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'user-update-form',
                error
              })
            })
          },
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('customDiscount')) {
              if (params.changed.customDiscount) {
                return [
                  {
                    'name': 'lowerLimit',
                    hidden: false,
                    init: false
                  }
                ]
              } else {
                return [
                  {
                    'name': 'lowerLimit',
                    hidden: true,
                    defaultValue: undefined
                  }
                ]
              }
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
