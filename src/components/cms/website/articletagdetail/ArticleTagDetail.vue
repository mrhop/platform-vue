<template>
  <div class="form-blocktag-detail form-detail">
    <panel>
      <h1 slot="header">功能TAG详情</h1>
      <vform id="blocktag-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let ruleChangeConfig = {
    url: commonUrls.relatedUsers,
    method: 'get'
  }
  let initConfig = {
    url: commonUrls.blockTag.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.blockTag.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'name',
                      'label': '功能TAG名称',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.name
                    },
                    {
                      'name': 'tagId',
                      'label': '功能TAGID',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.tagId
                    },
                    {
                      'name': 'description',
                      'label': '详细说明',
                      'type': 'textarea',
                      locked: true,
                      'defaultValue': response.data.description
                    }
                  ],
                  action: {
                    backup: {
                      label: '返回列表'
                    }
                  }
                }
                global.store.commit('FORM_SUCCESS', {
                  id: 'blocktag-detail-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'blocktag-detail-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'blocktag-detail-form',
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
