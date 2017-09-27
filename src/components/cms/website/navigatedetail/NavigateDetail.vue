<template>
  <div class='form-navigate-detail form-detail'>
    <panel>
      <h1 slot='header'>导航详情</h1>
      <vform id='navigate-detail-form' :actions='actions' :actionUrls='actionUrls'></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let initConfig = {
    url: commonUrls.navigate.info,
    method: 'get'
  }
  let ruleChangeConfig = {
    url: commonUrls.navigate.rulechange,
    method: 'post'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.navigate.list
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: this.$route.query.key}
            axios.request(initConfig).then(function (response) {
              ruleChangeConfig.params = {
                type: 'form',
                key: this.$route.query.key,
                parentId: response.data.parentId,
                relateType: response.data.relateType
              }
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'name',
                      'label': '导航名称',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.name
                    },
                    {
                      'name': 'relateType',
                      'label': '关联类型',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.relateType === 0 ? '文章' : (response.data.relateType === 1 ? '新闻' : '活动')
                    },
                    {
                      'name': 'articleTitle',
                      'label': '关联文章/新闻/活动',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.articleTitle
                    },
                    {
                      'name': 'activated',
                      'label': '已激活',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.activated ? '是' : '否'
                    },
                    {
                      'name': 'parentName',
                      'label': '父导航',
                      'type': 'text',
                      locked: true,
                      defaultValue: response.data.parentName
                    },
                    {
                      'name': 'beforeId',
                      'label': '前置导航',
                      'type': 'text',
                      locked: true,
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
                  id: 'navigate-detail-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'navigate-detail-form',
                  error
                })
              })
            }.bind(this)).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'navigate-detail-form',
                error
              })
            })
          }.bind(this)
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
