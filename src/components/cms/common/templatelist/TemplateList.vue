<template>
  <div class="template-list">
    <panel>
      <h1 slot="header">模板列表</h1>
      <vtable id="template-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
    <div class="iframe-container" v-show="frameShow">
      <div class="top-header">
        <span class="h4">预览页面</span>
        <span class="close-btn" @click="closePreview"></span>
      </div>
      <iframe ref="previewIframe"></iframe>
    </div>
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
          addUrl: commonUrls.vuerouter.template.add,
          detailUrl: commonUrls.vuerouter.template.detail,
          infoUrl: commonUrls.vuerouter.template.edit,
          deleteUrl: commonUrls.template.delete
        },
        actions: {
          reinit: false,
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.template.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'template-list',
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
                          'name': 'contentPosition',
                          'title': '内容位置',
                          'type': 'text'
                        }
                      ],
                      'action': {
                        'add': true,
                        'detail': true,
                        'update': true,
                        'delete': true,
                        events: [
                          {
                            key: 'preview',
                            label: '预览'
                          },
                          {
                            key: 'copyTpl',
                            label: '复制模板'
                          }
                        ]
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
                global.store.commit('TABLE_FAILURE', {id: 'template-list', error})
              })
            } else {
              let config = {
                url: commonUrls.template.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'template-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'template-list', error})
              })
            }
          },
          preview: function (key) {
            let config = {
              url: commonUrls.template.preview,
              method: 'get'
            }
            config.params = {key, originPath: document.location.origin}
            axios.request(config).then(function (response) {
              // 进行ifram的创建和response.data的注入
              this.$refs.previewIframe.src = 'data:text/html;charset=utf-8,' + encodeURI(response.data)
              this.frameShow = true
            }.bind(this)).catch(function (error) {
              console.log('error' + error)
            })
          }.bind(this),
          copyTpl: function (key) {
            let config = {
              url: commonUrls.template.copyTpl,
              method: 'get'
            }
            config.params = {key}
            axios.request(config).then(function (response) {
              this.actions.reinit = true
            }.bind(this)).catch(function (error) {
              console.log('error' + error)
            })
          }.bind(this)
        },
        frameShow: false
      }
    },
    methods: {
      closePreview: function () {
        this.frameShow = false
      }
    },
    components: {
      panel, tab, vtable
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
