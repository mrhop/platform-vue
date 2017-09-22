<template>
  <div class="articletag-list">
    <panel>
      <h1 slot="header">文章TAG列表</h1>
      <vtable id="articletag-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.articleTag.add,
          detailUrl: commonUrls.vuerouter.articleTag.detail,
          infoUrl: commonUrls.vuerouter.articleTag.edit,
          deleteUrl: commonUrls.articleTag.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.articleTag.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'articletag-list',
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
                          'type': 'text'
                        },
                        {
                          'name': 'tagId',
                          'title': 'TAGID',
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
                        'filter': false,
                        'pager': true
                      }
                    },
                    'data': response.data
                  },
                  callParameters: {pager, init: true}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'articletag-list', error})
              })
            } else {
              let config = {
                url: commonUrls.articleTag.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'articletag-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'articletag-list', error})
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
