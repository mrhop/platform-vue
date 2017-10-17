<template>
  <div class="form-clientlevel-detail form-detail">
    <panel>
      <h1 slot="header">新增客户级别</h1>
      <vform id="clientlevel-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.clientLevel.list,
          saveUrl: commonUrls.clientLevel.save
        },
        actions: {
          init: function (params) {
            let rules = {
              'items': [
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
                  'name': 'orderAmount',
                  'label': '订单金额',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '请输入整数或者2小数位的小数',
                    'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                  }],
                  'placeholder': '最低完成的订单金额',
                  required: false
                },
                {
                  'name': 'additionalMsg',
                  'label': '补充信息',
                  'type': 'textarea',
                  'placeholder': '补充信息'
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
              id: 'clientlevel-add-form',
              data: {
                rules
              }
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
