<template>
  <div class="form-client-detail form-detail">
    <panel>
      <h1 slot="header">新增客户</h1>
      <vform id="client-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'
  import axios from 'axios'
  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let ruleChangeConfig = {
    url: commonUrls.client.rulechange,
    method: 'post',
    data: {
      type: 'form'
    }
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.client.list,
          saveUrl: commonUrls.client.save
        },
        actions: {
          init: function (params) {
            axios.request(ruleChangeConfig).then(function (responseInner) {
              let items = [
                {
                  'name': 'name',
                  'label': '名称',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '名称在2-40个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,38}\\S$'
                  }],
                  'placeholder': '名称'
                },
                {
                  'name': 'contact',
                  'label': '联系人',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '联系人在2-40个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,38}\\S$'
                  }],
                  'placeholder': '联系人'
                },
                {
                  'name': 'cellphone',
                  'label': '手机',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '请输入正确的手机格式',
                    'regex': '^(\\+\\d{1,3}[- ]?)?\\d{10,11}$'
                  }],
                  'placeholder': '手机'
                },
                {
                  'name': 'email',
                  'label': '邮箱',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '请输入正确的Email',
                    'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                  }],
                  'placeholder': '邮箱'
                },
                {
                  'name': 'address',
                  'label': '地址',
                  'type': 'textarea',
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '[\\s\\S]*\\S+[\\s\\S]*'
                  }],
                  'placeholder': '地址'
                },
                {
                  'name': 'clientOriginId',
                  'label': '客户来源',
                  'type': 'select',
                  items: responseInner.data.clientOrigins,
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }]
                },
                {
                  'name': 'clientLevelId',
                  'label': '客户级别',
                  'type': 'select',
                  items: responseInner.data.clientLevels,
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }]
                },
                {
                  'name': 'countryId',
                  'label': '所属国家',
                  'type': 'select',
                  items: responseInner.data.countries,
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }]
                },
                {
                  'name': 'additionalMsg',
                  'label': '补充信息',
                  'type': 'textarea'
                }
              ]
              if (responseInner.data.relatedUsers) {
                items.splice(8, 0, {
                  'name': 'relatedUserIds',
                  'label': '可操作用户',
                  'type': 'checkbox',
                  items: responseInner.data.relatedUsers,
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }]
                })
              }
              let rules = {
                items,
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
                id: 'client-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'client-add-form',
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
