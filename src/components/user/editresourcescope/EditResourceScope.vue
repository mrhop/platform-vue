<template>
  <div class="form-resourcescope-detail form-detail">
    <panel>
      <h1 slot="header">更新资源范围</h1>
      <vform id="resourcescope-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.resourceScopeInfo,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.resourcescopelist
        },
        actions: {
          init: function (params) {
            // 首先需要考虑权限，然后给出rule change
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '资源范围名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '姓名在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '资源范围名',
                    'defaultValue': response.data.name
                  },
                  {
                    'name': 'scopeId',
                    'label': '资源范围账号',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '账号由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '资源范围账号',
                    'defaultValue': response.data.scopeId,
                    'locked': true
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
                id: 'resourcescope-update-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'resourcescope-update-form',
                error
              })
            })
          },
          save: function ({key, data, multipart}) {
            let config = {
              url: commonUrls.resourceScopeUpdate,
              method: 'post',
              params: {key},
              data: data
            }
            const _this = this
            axios.request(config).then(function (response) {
              if (response.data && response.data.error) {
                global.store.commit('FORM_SAVE_SUCCESS', {
                  id: 'resourcescope-update-form',
                  data: response.data
                })
              } else if (response.data && response.data.success) {
                _this.$router.push(commonUrls.vuerouter.resourcescopelist)
              }
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {
                id: 'resourcescope-update-form',
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
