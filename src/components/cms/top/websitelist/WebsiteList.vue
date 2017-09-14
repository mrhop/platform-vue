<template>
  <div class="website-list">
    <panel>
      <h1 slot="header">网站列表</h1>
      <vtable id="website-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable

  let ruleChangeConfig = {
    url: commonUrls.website.rulechange,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.website.add,
          detailUrl: commonUrls.vuerouter.website.detail,
          infoUrl: commonUrls.vuerouter.website.edit,
          deleteUrl: commonUrls.website.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.website.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'website-list',
                    data: {
                      'rules': {
                        'header': [
                          {
                            'name': '#sn',
                            'title': '#sn'
                          },
                          {
                            'name': 'name',
                            'title': '名称',
                            'type': 'text',
                            filter: true
                          },
                          {
                            'name': 'websiteId',
                            'title': '网站ID',
                            'type': 'text'
                          },
                          {
                            'name': 'themeId',
                            'title': '关联主题',
                            'type': 'select',
                            filter: true,
                            items: responseInner.data.themes
                          },
                          {
                            'name': 'url',
                            'title': '地址',
                            'type': 'text'
                          },
                          {
                            'name': 'email',
                            'title': '邮箱',
                            'type': 'text'
                          },
                          {
                            'name': 'relatedUsers',
                            'title': '关联用户',
                            'type': 'text'
                          }
                        ],
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
                  global.store.commit('TABLE_FAILURE', {id: 'website-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'website-list', error})
              })
            } else {
              let config = {
                url: commonUrls.website.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'website-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'website-list', error})
              })
            }
          }
        }
      }
    },
    components: {
      panel, tab, vtable
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
