<template>
  <div class="form-clientTrack-detail form-detail">
    <panel>
      <h1 slot="header">新增客户追踪</h1>
      <vform id="clientTrack-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform

  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: global.getCookie('clientTraceBackUrl'),
          saveUrl: commonUrls.clientTrack.save
        },
        actions: {
          init: function (params) {
            let hiddenId = {
              'name': 'clientId',
              'type': 'hidden',
              defaultValue: this.$route.query.clientId
            }
            let rules = {
              'items': [
                hiddenId,
                {
                  'name': 'trackDate',
                  'label': '追踪时间',
                  'type': 'date',
                  'placeholder': '追踪时间'
                },
                {
                  name: 'trackMethod',
                  label: '追踪方式',
                  type: 'select',
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  items: [
                    {
                      label: '电话',
                      value: 'phone'
                    },
                    {
                      label: '邮件',
                      value: 'email'
                    },
                    {
                      label: 'skype',
                      value: 'skype'
                    },
                    {
                      label: '微信',
                      value: 'wechat'
                    },
                    {
                      label: '其他',
                      value: 'others'
                    }
                  ]
                },
                {
                  'name': 'duration',
                  'label': '沟通时间',
                  'type': 'select',
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  items: [
                    {
                      label: '10分钟内',
                      value: 0
                    },
                    {
                      label: '30分钟内',
                      value: 1
                    },
                    {
                      label: '1个小时',
                      value: 2
                    }
                  ]
                },
                {
                  'name': 'result',
                  'label': '结果',
                  'type': 'select',
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  items: [
                    {
                      label: '无法沟通',
                      value: -3
                    },
                    {
                      label: '非常消极',
                      value: -2
                    },
                    {
                      label: '消极',
                      value: -1
                    },
                    {
                      label: '可以继续',
                      value: 0
                    },
                    {
                      label: '积极',
                      value: 1
                    },
                    {
                      label: '非常积极',
                      value: 2
                    },
                    {
                      label: '有望成单',
                      value: 3
                    }
                  ]
                },
                {
                  name: 'comment',
                  label: '备注',
                  placeholder: '备注',
                  type: 'textarea'
                }
              ],
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
              id: 'clientTrack-add-form',
              data: {
                rules
              }
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
