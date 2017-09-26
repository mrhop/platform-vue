<template>
  <div class="media-list">
    <panel>
      <h1 slot="header">媒体列表</h1>
      <vtable id="media-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
  let config = {
    url: commonUrls.media.list,
    method: 'post'
  }
  let ruleChangeConfig = {
    url: commonUrls.media.rulechange,
    method: 'post',
    data: {type: 'list'}
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.media.add,
          detailUrl: commonUrls.vuerouter.media.detail,
          infoUrl: commonUrls.vuerouter.media.edit,
          deleteUrl: commonUrls.media.delete
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            config.data = args
            if (init) {
              axios.request(config).then(function (response) {
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'media-list',
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
                            'name': 'type',
                            'title': '类型',
                            'type': 'select',
                            items: [
                              {
                                label: 'image',
                                value: 'image'
                              },
                              {
                                label: 'video',
                                value: 'video'
                              },
                              {
                                label: 'audio',
                                value: 'audio'
                              },
                              {
                                label: 'document',
                                value: 'document'
                              }
                            ],
                            filter: true
                          },
                          {
                            'name': 'mediaTagId',
                            'title': '媒体库',
                            'type': 'select',
                            items: responseInner.data.mediaTags,
                            filter: true
                          },
                          {
                            'name': 'fileType',
                            'title': '文件类型',
                            'type': 'text'
                          },
                          {
                            'name': 'size',
                            'title': '文件大小（Byte）',
                            'type': 'text'
                          },
                          {
                            'name': 'published',
                            'title': '已发布',
                            'type': 'select',
                            'editable': true,
                            items: [
                              {
                                label: '是',
                                value: true
                              },
                              {
                                label: '否',
                                value: false
                              }
                            ],
                            filter: true
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
                  global.store.commit('TABLE_FAILURE', {id: 'media-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'media-list', error})
              })
            } else {
              let config = {
                url: commonUrls.media.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'media-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'media-list', error})
              })
            }
          },
          edit: function (args) {
            if (args && args.headerItem && args.headerItem.name === 'published') {
              let config = {
                'axiosConfig': {
                  url: commonUrls.media.publish,
                  method: 'get',
                  params: {key: args.key, published: args.data['published']}
                }
              }
              return config
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
