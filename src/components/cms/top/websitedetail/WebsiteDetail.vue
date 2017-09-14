<template>
  <div class="form-website-detail form-detail">
    <panel>
      <h1 slot="header">网站详情</h1>
      <vform id="website-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.website.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.website.list
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
                      'label': '网站名称',
                      'type': 'text',
                      'defaultValue': response.data.name,
                      'placeholder': '网站名称',
                      locked: true
                    },
                    {
                      'name': 'websiteId',
                      'label': '网站ID',
                      'type': 'text',
                      'defaultValue': response.data.websiteId,
                      locked: true
                    },
                    {
                      'name': 'themeName',
                      'label': '关联主题',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.themeName
                    },
                    {
                      'name': 'url',
                      'label': '网站地址',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.url
                    },
                    {
                      'name': 'title',
                      'label': '网站标题',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.title
                    },
                    {
                      'name': 'subtitle',
                      'label': '网站子标题',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.subtitle
                    },
                    {
                      'name': 'phone',
                      'label': '电话',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.phone
                    },
                    {
                      'name': 'email',
                      'label': 'Email',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.email
                    },
                    {
                      'name': 'relatedUsers',
                      'label': '关联用户',
                      'type': 'checkbox',
                      'defaultValue': response.data.relatedUsers ? response.data.relatedUsers : [],
                      items: responseInner.data,
                      locked: true
                    },
                    {
                      'name': 'screenshotFiles',
                      'label': '网站截图',
                      'type': 'image',
                      locked: true,
                      'path': response.data.screenshots ? response.data.screenshots : undefined
                    }
                  ],
                  action: {
                    backup: {
                      label: '返回列表'
                    }
                  }
                }
                global.store.commit('FORM_SUCCESS', {
                  id: 'website-detail-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'website-detail-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'website-detail-form',
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
