<template>
  <div class="article-list">
    <panel>
      <h1 slot="header">文章列表</h1>
      <vtable id="article-list" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
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
  let config = {
    url: commonUrls.article.list,
    method: 'post'
  }
  let ruleChangeConfig = {
    url: commonUrls.article.rulechange,
    method: 'post',
    data: {type: 'list'}
  }
  export default {
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.article.add,
          detailUrl: commonUrls.vuerouter.article.detail,
          infoUrl: commonUrls.vuerouter.article.edit,
          deleteUrl: commonUrls.article.delete
        },
        actions: {
          reinit: false,
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
                    id: 'article-list',
                    data: {
                      'rules': {
                        'header': [
                          {
                            'name': '#sn',
                            'title': '#sn'
                          },
                          {
                            'name': 'title',
                            'title': '名称',
                            'type': 'text',
                            filter: true
                          },
                          {
                            'name': 'aliasUrl',
                            'title': '个性url',
                            'type': 'text'
                          },
                          {
                            'name': 'articleTagsStr',
                            'title': '文章Tag',
                            'type': 'select',
                            items: responseInner.data.articleTags,
                            filter: true
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
                          },
                          {
                            'name': 'publishDate',
                            'title': '发布日期',
                            'type': 'date'
                          },
                          {
                            'name': 'createUser',
                            'title': '创建人',
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
                              key: 'copyArticle',
                              label: '复制文章'
                            }
                          ]
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
                  global.store.commit('TABLE_FAILURE', {id: 'article-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'article-list', error})
              })
            } else {
              let config = {
                url: commonUrls.article.list,
                method: 'post',
                data: {pager, filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'article-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'article-list', error})
              })
            }
          },
          edit: function (args) {
            if (args && args.headerItem && args.headerItem.name === 'published') {
              let config = {
                'axiosConfig': {
                  url: commonUrls.article.publish,
                  method: 'get',
                  params: {key: args.key, published: args.data['published']}
                }
              }
              return config
            }
          },
          preview: function (key) {
            let config = {
              url: commonUrls.article.preview,
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
          copyArticle: function (key) {
            let config = {
              url: commonUrls.article.copyArticle,
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
