<template>
  <div class="form-clientTrack-detail form-detail">
    <panel>
      <h1 slot="header">客户追踪详情</h1>
      <vform id="clientTrack-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.clientTrack.info,
    method: 'get'
  }

  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: global.getCookie('clientTraceBackUrl')
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let trackMethod
              switch (response.data.trackMethod) {
                case 'phone':
                  trackMethod = '电话'
                  break
                case 'email':
                  trackMethod = '邮箱'
                  break
                case 'skype':
                  trackMethod = 'skype'
                  break
                case 'wechat':
                  trackMethod = '微信'
                  break
                case 'others':
                  trackMethod = '其他'
                  break
              }
              let duration
              switch (response.data.duration) {
                case 0:
                  duration = '10分钟内'
                  break
                case 1:
                  duration = '30分钟内'
                  break
                case 2:
                  duration = '1个小时'
                  break
              }
              let result
              switch (response.data.result) {
                case -3:
                  result = '无法沟通'
                  break
                case -2:
                  result = '非常消极'
                  break
                case -1:
                  result = '消极'
                  break
                case 0:
                  result = '可以继续'
                  break
                case 1:
                  result = '积极'
                  break
                case 2:
                  result = '非常积极'
                  break
                case 3:
                  result = '有望成单'
                  break
              }
              let rules = {
                'items': [
                  {
                    'name': 'trackDate',
                    'label': '追踪时间',
                    'type': 'date',
                    locked: true,
                    defaultValue: response.data.trackDate
                  },
                  {
                    name: 'trackMethod',
                    label: '追踪方式',
                    type: 'text',
                    locked: true,
                    defaultValue: trackMethod
                  },
                  {
                    'name': 'duration',
                    'label': '沟通时间',
                    'type': 'text',
                    locked: true,
                    defaultValue: duration
                  },
                  {
                    'name': 'result',
                    'label': '结果',
                    'type': 'text',
                    locked: true,
                    defaultValue: result
                  },
                  {
                    name: 'comment',
                    label: '备注',
                    type: 'textarea',
                    locked: true,
                    defaultValue: response.data.comment
                  }
                ],
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'clientTrack-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'clientTrack-detail-form',
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
