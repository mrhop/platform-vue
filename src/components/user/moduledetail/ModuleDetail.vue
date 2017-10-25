<template>
  <div class="form-module-detail form-detail">
    <panel>
      <h1 slot="header">模块详情</h1>
      <vform id="module-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/user'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.moduleInfo,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.moduleFormRuleUpdate,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.modulelist
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              ruleChangeConfig.params = {key: params.key}
              delete ruleChangeConfig.data
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'moduleName',
                      'label': '模块名称',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.moduleName
                    },
                    {
                      'name': 'moduleId',
                      'label': '模块ID',
                      'type': 'text',
                      'locked': true,
                      'defaultValue': response.data.moduleId
                    },
                    {
                      'name': 'moduleUrl',
                      'label': '模块链接',
                      'type': 'text',
                      defaultValue: response.data.moduleUrl
                    },
                    {
                      'name': 'iconClass',
                      'label': '图标样式',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.iconClass
                    },
                    {
                      'name': 'activated',
                      'label': '已激活',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.activated ? '是' : '否'
                    },
                    {
                      'name': 'available',
                      'label': '是否可见',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.available ? '是' : '否'
                    },
                    {
                      'name': 'clientName',
                      'label': '所属应用',
                      'type': 'text',
                      defaultValue: response.data.clientName,
                      locked: true
                    },
                    {
                      'name': 'parentId',
                      'label': '父模块',
                      'type': 'text',
                      defaultValue: response.data.parentName
                    },
                    {
                      'name': 'beforeId',
                      'label': '前置模块',
                      'type': 'select',
                      defaultValue: response.data.beforeName
                    }
                  ],
                  action: {
                    backup: {
                      label: '返回列表'
                    }
                  }
                }
                global.store.commit('FORM_SUCCESS', {
                  id: 'module-detail-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'module-detail-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'module-detail-form',
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
