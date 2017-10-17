<template>
  <div class="form-orderstatus-detail form-detail">
    <panel>
      <h1 slot="header">新增订单状态【状态码不可重复，新增后不可更改】</h1>
      <vform id="orderstatus-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
          backupUrl: commonUrls.vuerouter.orderStatus.list,
          saveUrl: commonUrls.orderStatus.save
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
                  'name': 'code',
                  'label': '状态码',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '状态码由英文，数字和 _ 组成，并在5-40个字符之间',
                    'regex': '^\\w{5,40}$'
                  }],
                  'placeholder': '订单状态码，谨慎设置，不可更改'
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
              id: 'orderstatus-add-form',
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
