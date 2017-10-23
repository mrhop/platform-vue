client
<template>
  <div class="form-client-detail form-detail">
    <panel>
      <h1 slot="header">客户详情</h1>
      <vform id="client-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel canHide="true">
      <h1 slot="header">客户追踪记录</h1>
      <vtable id="clientTrace-list" :editable="true" :actionUrls="clientTraceActionUrls"
              :actions="clientTraceActions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/crm'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let vtable = huodhVuePlugins.vtable
  let vchart = huodhVuePlugins.vchart
  let initConfig = {
    url: commonUrls.client.info,
    method: 'get'
  }
  let clientTrackRuleChangeConfig = {
    url: commonUrls.clientTrack.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.client.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let items = [
                {
                  'name': 'code',
                  'label': '客户代码',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.code
                },
                {
                  'name': 'name',
                  'label': '名称',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.name
                },
                {
                  'name': 'contact',
                  'label': '联系人',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.contact
                },
                {
                  'name': 'cellphone',
                  'label': '手机',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.cellphone
                },
                {
                  'name': 'email',
                  'label': '邮箱',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.email
                },
                {
                  'name': 'address',
                  'label': '地址',
                  'type': 'textarea',
                  locked: true,
                  defaultValue: response.data.address
                },
                {
                  'name': 'clientOriginName',
                  'label': '客户来源',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.clientOriginName
                },
                {
                  'name': 'clientLevelName',
                  'label': '客户级别',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.clientLevelName
                },
                {
                  'name': 'countryName',
                  'label': '所属国家',
                  'type': 'text',
                  locked: true,
                  defaultValue: response.data.countryName
                },
                {
                  'name': 'additionalMsg',
                  'label': '补充信息',
                  'type': 'textarea',
                  locked: true,
                  defaultValue: response.data.additionalMsg
                }
              ]
              let rules = {
                items,
                action: {
                  backup: {
                    label: '返回列表'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'client-detail-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'client-detail-form',
                error
              })
            })
          }
        },
        clientTraceActionUrls: {
          addUrl: commonUrls.vuerouter.clientTrack.add + '?clientId=' + this.$route.query.key,
          detailUrl: commonUrls.vuerouter.clientTrack.detail,
          infoUrl: commonUrls.vuerouter.clientTrack.edit,
          deleteUrl: commonUrls.clientTrack.delete
        },
        clientTraceActions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.clientTrack.list,
                method: 'post',
                params: {clientId: this.$route.query.key},
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                axios.request(clientTrackRuleChangeConfig).then(function (responseInner) {
                  let header = [
                    {
                      'name': '#sn',
                      'title': '#sn'
                    },
                    {
                      'name': 'trackDate',
                      'title': '追踪日期',
                      'type': 'date',
                      sortable: true
                    },
                    {
                      'name': 'result',
                      'title': '结果',
                      'type': 'select',
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
                      ],
                      filter: true
                    },
                    {
                      'name': 'duration',
                      'title': '沟通时间',
                      'type': 'select',
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
                      ],
                      filter: true
                    }
                  ]
                  if (responseInner.data.trackUsers) {
                    header.push({
                      'name': 'trackUserId',
                      'title': '创建人',
                      'type': 'select',
                      filter: true,
                      items: responseInner.data.trackUsers
                    })
                  }
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'clientTrace-list',
                    data: {
                      'rules': {
                        header,
                        'action': {
                          'add': true,
                          'detail': true,
                          'update': true,
                          'delete': true
                        },
                        'feature': {
                          'filter': true,
                          'pager': true
                        }
                      },
                      'data': response.data
                    },
                    callParameters: {pager, init: true}
                  })
                }).catch(function (error) {
                  global.store.commit('TABLE_FAILURE', {id: 'clientTrace-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'clientTrace-list', error})
              })
            } else {
              let config = {
                url: commonUrls.clientTrack.list,
                method: 'post',
                params: {clientId: this.$route.query.key},
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'clientTrace-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'clientTrace-list', error})
              })
            }
          }.bind(this)
        }
      }
    },
    created: function () {
      document.cookie = 'clientTraceBackUrl=' + this.$route.fullPath
    },
    components: {
      panel, vform, vtable, vchart
    }
  }
</script>

<style scoped>

</style>
