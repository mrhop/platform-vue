<template>
  <div class="form-orderdiscount-detail form-detail">
    <panel>
      <h1 slot="header">新增订单折扣规则</h1>
      <vform id="orderdiscount-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'
  import axios from 'axios'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let ruleChangeConfig = {
    url: commonUrls.orderDiscount.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.orderDiscount.list,
          saveUrl: commonUrls.orderDiscount.save
        },
        actions: {
          init: function (params) {
            axios.request(ruleChangeConfig).then(function (response) {
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
                    'name': 'quota',
                    'label': '订单金额下限',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入整数或者2小数位的小数',
                      'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                    }],
                    'placeholder': '最低订单消费金额',
                    'ruleChange': true
                  },
                  {
                    'name': 'type',
                    'label': '折扣类型',
                    'type': 'select',
                    items: [
                      {
                        label: '满减',
                        value: 'reduce'
                      },
                      {
                        label: '打折',
                        value: 'discount'
                      }
                    ],
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    'ruleChange': true
                  },
                  {
                    'name': 'discount',
                    'label': '折扣',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入小于1的且小数位小于2的小数',
                      'regex': '^(0?\\.\\d{1,2})$'
                    }],
                    palceholder: '折扣＞0且<1',
                    hidden: true
                  },
                  {
                    'name': 'reduce',
                    'label': '减免',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '请输入整数或者2小数位的小数',
                      'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                    }],
                    palceholder: '减免金额需小于设定订单金额',
                    hidden: true,
                    'ruleChange': true
                  },
                  {
                    'name': 'clientLevelId',
                    'label': '客户级别',
                    'type': 'select',
                    items: response.data.clientLevels
                  },
                  {
                    'name': 'beginDate',
                    'label': '起始日期',
                    'type': 'date',
                    'ruleChange': true
                  },
                  {
                    'name': 'endDate',
                    'label': '结束日期',
                    'type': 'date',
                    'ruleChange': true
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
                id: 'orderdiscount-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'orderdiscount-add-form',
                error
              })
            })
          },
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('type')) {
              let returnArr = []
              if (params.changed.type) {
                if (params.changed.type === 'reduce') {
                  returnArr = [
                    {
                      'name': 'reduce',
                      hidden: false,
                      init: false
                    },
                    {
                      'name': 'discount',
                      hidden: true,
                      defaultValue: undefined
                    }
                  ]
                } else if (params.changed.type === 'discount') {
                  returnArr = [
                    {
                      'name': 'reduce',
                      hidden: true,
                      defaultValue: undefined
                    },
                    {
                      'name': 'discount',
                      hidden: false,
                      init: false
                    }
                  ]
                }
              } else {
                returnArr = [
                  {
                    'name': 'reduce',
                    hidden: true,
                    defaultValue: undefined
                  },
                  {
                    'name': 'discount',
                    hidden: true,
                    defaultValue: undefined
                  }
                ]
              }
              for (let i in params.items) {
                if (params.items[i].name === 'quota') {
                  if (new RegExp(params.items[i].validate[0].regex).test(params.items[i].defaultValue)) {
                    returnArr = returnArr.concat([{
                      'name': 'quota',
                      validatedMsg: undefined
                    }])
                  }
                }
              }
              return returnArr
            } else if (params.changed.hasOwnProperty('quota')) {
              for (let i in params.items) {
                if (params.changed.quota !== null && params.changed.quota !== undefined && params.items[i].name === 'quota') {
                  if (!new RegExp(params.items[i].validate[0].regex).test(params.changed.quota)) {
                    return
                  }
                }
                if (params.items[i].name === 'reduce') {
                  if (!new RegExp(params.items[i].validate[0].regex).test(params.items[i].defaultValue)) {
                    return
                  }
                }
              }
              for (let key in params.items) {
                if (params.items[key].name === 'reduce') {
                  if (!params.items[key].validatedMsg && params.items[key].defaultValue !== undefined && params.items[key].defaultValue !== null && params.items[key].hidden !== true && +params.changed.quota <= +params.items[key].defaultValue) {
                    return [
                      {
                        name: 'quota',
                        'validatedMsg': '订单设定总额不能小于减免额'
                      }
                    ]
                  } else {
                    return [
                      {
                        name: 'quota',
                        'validatedMsg': undefined
                      },
                      {
                        name: 'reduce',
                        'validatedMsg': undefined
                      }
                    ]
                  }
                }
              }
            } else if (params.changed.hasOwnProperty('reduce')) {
              for (let i in params.items) {
                if (params.items[i].name === 'quota') {
                  if (!new RegExp(params.items[i].validate[0].regex).test(params.items[i].defaultValue)) {
                    return
                  }
                }
                if (params.changed.reduce !== null && params.changed.reduce !== undefined && params.items[i].name === 'reduce') {
                  if (!new RegExp(params.items[i].validate[0].regex).test(params.changed.reduce)) {
                    return
                  }
                }
              }
              for (let key in params.items) {
                if (params.items[key].name === 'quota') {
                  if (!params.items[key].validatedMsg && params.items[key].defaultValue !== undefined && params.items[key].defaultValue !== null && +params.changed.reduce >= +params.items[key].defaultValue) {
                    return [
                      {
                        name: 'reduce',
                        'validatedMsg': '减免额不能大于订单设定总额'
                      }
                    ]
                  } else {
                    return [
                      {
                        name: 'quota',
                        'validatedMsg': undefined
                      },
                      {
                        name: 'reduce',
                        'validatedMsg': undefined
                      }
                    ]
                  }
                }
              }
            } else if (params.changed.hasOwnProperty('beginDate')) {
              for (let key in params.items) {
                if (params.items[key].name === 'endDate') {
                  if (params.items[key].defaultValue !== undefined && params.items[key].defaultValue !== null && +params.changed.beginDate >= +params.items[key].defaultValue) {
                    return [
                      {
                        name: 'beginDate',
                        'validatedMsg': '开始日期必须小于结束日期'
                      }
                    ]
                  } else {
                    return [
                      {
                        name: 'beginDate',
                        'validatedMsg': undefined
                      },
                      {
                        name: 'endDate',
                        'validatedMsg': undefined
                      }
                    ]
                  }
                }
              }
            } else if (params.changed.hasOwnProperty('endDate')) {
              for (let key in params.items) {
                if (params.items[key].name === 'beginDate') {
                  if (params.items[key].defaultValue !== undefined && params.items[key].defaultValue !== null && +params.changed.endDate <= +params.items[key].defaultValue) {
                    return [
                      {
                        name: 'endDate',
                        'validatedMsg': '结束日期必须大于开始日期'
                      }
                    ]
                  } else {
                    return [
                      {
                        name: 'beginDate',
                        'validatedMsg': undefined
                      },
                      {
                        name: 'endDate',
                        'validatedMsg': undefined
                      }
                    ]
                  }
                }
              }
            }
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
