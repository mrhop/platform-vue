<template>
  <div class="form-client-detail form-detail">
    <panel>
      <h1 slot="header">更新客户</h1>
      <vform id="client-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.client.info,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.client.rulechange,
    method: 'post',
    params: {},
    data: {
      type: 'form'
    }
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.client.list,
          saveUrl: commonUrls.client.update,
          afterSaveUrl: commonUrls.vuerouter.client.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
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
                    'placeholder': '名称',
                    defaultValue: response.data.name
                  },
                  {
                    'name': 'contact',
                    'label': '联系人',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '联系人在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '联系人',
                    defaultValue: response.data.contact
                  },
                  {
                    'name': 'cellphone',
                    'label': '手机',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入正确的手机格式',
                      'regex': '^(\\+\\d{1,3}[- ]?)?\\d{10,11}$'
                    }],
                    'placeholder': '手机',
                    defaultValue: response.data.cellphone
                  },
                  {
                    'name': 'email',
                    'label': '邮箱',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入正确的Email',
                      'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                    }],
                    'placeholder': '邮箱',
                    defaultValue: response.data.email
                  },
                  {
                    'name': 'address',
                    'label': '地址',
                    'type': 'textarea',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '[\\s\\S]*\\S+[\\s\\S]*'
                    }],
                    'placeholder': '地址',
                    defaultValue: response.data.address
                  },
                  {
                    'name': 'clientOriginId',
                    'label': '客户来源',
                    'type': 'select',
                    items: responseInner.data.clientOrigins,
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    defaultValue: response.data.clientOriginId
                  },
                  {
                    'name': 'countryId',
                    'label': '所属国家',
                    'type': 'select',
                    items: responseInner.data.countries,
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    defaultValue: response.data.countryId
                  },
                  {
                    'name': 'additionalMsg',
                    'label': '补充信息',
                    'type': 'textarea',
                    defaultValue: response.data.additionalMsg
                  }
                ]
                if (responseInner.data.clientLevels) {
                  items.splice(6, 0, {
                    'name': 'clientLevelId',
                    'label': '客户级别',
                    'type': 'select',
                    items: responseInner.data.clientLevels,
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    defaultValue: response.data.clientLevelId
                  })
                } else {
                  items.splice(6, 0, {
                    'name': 'clientLevelName',
                    'label': '客户级别',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.clientLevelName
                  })
                }
                if (responseInner.data.relatedUsers) {
                  items.splice(8, 0, {
                    'name': 'relatedUserIds',
                    'label': '可操作用户',
                    'type': 'checkbox',
                    items: responseInner.data.relatedUsers,
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    defaultValue: response.data.relatedUserIds
                  })
                }
                let rules = {
                  items,
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
                  id: 'client-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'client-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'client-update-form',
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
