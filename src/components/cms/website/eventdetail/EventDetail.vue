<template>
  <div class="form-event-detail form-add">
    <panel>
      <h1 slot="header">活动详情</h1>
      <vform ref="tplForm" id="event-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel>
      <h1 slot="header">block Map</h1>
      <div ref="blockMap">
        <div ref="positionMap" class="position-map">
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform

  let ruleChangeConfig = {
    url: commonUrls.article.rulechange,
    method: 'post',
    data: {type: 'form'}
  }
  let initConfig = {
    url: commonUrls.event.info,
    method: 'get'
  }
  let initBlockListConfig = {
    url: commonUrls.block.list,
    method: 'post',
    params: {}
  }
  let initTplConfig = {
    url: commonUrls.template.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        defaultBlockBorderColor: 'rgb(240, 173, 78)',
        actionUrls: {
          backupUrl: commonUrls.vuerouter.event.list
        },
        actions: {
          reinit: false,
          init: function (params) {
            initConfig.params = {key: this.$route.query.key}
            axios.request(initConfig).then(function (response) {
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'title',
                      'label': '标题',
                      'type': 'text',
                      'locked': true,
                      defaultValue: response.data.title
                    },
                    {
                      'name': 'subtitle',
                      'label': '子标题',
                      'type': 'text',
                      'locked': true,
                      'placeholder': '子标题',
                      defaultValue: response.data.subtitle
                    },
                    {
                      'name': 'aliasUrl',
                      'label': '链接别名',
                      'type': 'text',
                      'locked': true,
                      'placeholder': '链接别名',
                      defaultValue: response.data.aliasUrl
                    },
                    {
                      'name': 'articleTags',
                      'label': '活动TAG',
                      'type': 'text',
                      'locked': true,
                      defaultValue: response.data.articleTagsStr
                    },
                    {
                      'name': 'published',
                      'label': '已发布',
                      'type': 'text',
                      'locked': true,
                      defaultValue: response.data.published ? '是' : '否'
                    },
                    {
                      'name': 'publishDate',
                      'label': '发布日期',
                      'type': 'date',
                      'locked': true,
                      hidden: !response.data.published,
                      defaultValue: response.data.published ? response.data.publishDate : undefined
                    },
                    {
                      'name': 'templateId',
                      'label': '使用模板',
                      'type': 'text',
                      'locked': true,
                      defaultValue: response.data.templateName
                    },
                    {
                      'name': '',
                      'label': '内容',
                      'type': 'ckeditor',
                      'locked': true,
                      defaultValue: response.data.content
                    },
                    {
                      'name': 'script',
                      'label': '脚本',
                      'type': 'textarea',
                      'locked': true,
                      defaultValue: response.data.script
                    }
                  ],
                  action: {
                    backup: {
                      label: '返回列表'
                    }
                  }
                }
                global.store.commit('FORM_SUCCESS', {
                  id: 'event-detail-form',
                  data: {
                    rules
                  }
                })
                this.$refs.blockMap.appendChild(this.$refs.positionMap)
                initTplConfig.params = {key: response.data.templateId}
                initBlockListConfig.params = {templateKey: response.data.templateId}
                axios.request(initTplConfig).then(function (responseOuter) {
                  axios.request(initBlockListConfig).then(function (response) {
                    let cols = this.$refs.positionMap.querySelectorAll('div.col')
                    let position = responseOuter.data.contentPosition && JSON.parse(responseOuter.data.contentPosition)
                    if (position) {
                      for (let i in cols) {
                        if (i < cols.length) {
                          if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                            cols[i].setAttribute('class', 'col content active')
                          }
                        }
                      }
                    }
                    let list = response.data.rows
                    if (list) {
                      for (let key in list) {
                        if (key < list.length) {
                          let position = JSON.parse(list[key].value[1])
                          let name = list[key].value[0]
                          for (let i in cols) {
                            if (i < cols.length) {
                              if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                                cols[i].setAttribute('class', 'col block-added')
                                if (i % 6 === position.begin.x) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-left-color:' + this.defaultBlockBorderColor) : ('border-left-color:' + this.defaultBlockBorderColor))
                                }
                                if (i % 6 === (position.end.x - 1)) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-right-color:' + this.defaultBlockBorderColor) : ('border-right-color:' + this.defaultBlockBorderColor))
                                }
                                if (Math.floor(i / 6) === position.begin.y) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-top-color:' + this.defaultBlockBorderColor) : ('border-top-color:' + this.defaultBlockBorderColor))
                                }
                                if (Math.floor(i / 6) === (position.end.y - 1)) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-bottom-color:' + this.defaultBlockBorderColor) : ('border-bottom-color:' + this.defaultBlockBorderColor))
                                }
                                if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                                  cols[i].innerHTML = '<p>' + name + '</p>'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    initBlockListConfig.params.articleKey = this.$route.query.key
                    axios.request(initBlockListConfig).then(function (response) {
                      if (response.data.rows && response.data.rows.length > 0) {
                        let cols = this.$refs.positionMap.querySelectorAll('div.col')
                        for (let k in response.data.rows) {
                          let position = JSON.parse(response.data.rows[k].value[1])
                          for (let i in cols) {
                            if (i < cols.length) {
                              if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                                cols[i].removeAttribute('style')
                                cols[i].setAttribute('class', 'col block-added')
                                if (i % 6 === position.begin.x) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-left-color:' + this.defaultBlockBorderColor) : ('border-left-color:' + this.defaultBlockBorderColor))
                                }
                                if (i % 6 === (position.end.x - 1)) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-right-color:' + this.defaultBlockBorderColor) : ('border-right-color:' + this.defaultBlockBorderColor))
                                }
                                if (Math.floor(i / 6) === position.begin.y) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-top-color:' + this.defaultBlockBorderColor) : ('border-top-color:' + this.defaultBlockBorderColor))
                                }
                                if (Math.floor(i / 6) === (position.end.y - 1)) {
                                  cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-bottom-color:' + this.defaultBlockBorderColor) : ('border-bottom-color:' + this.defaultBlockBorderColor))
                                }
                                if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                                  cols[i].innerHTML = '<p>' + response.data.rows[k].value[0] + '</p>'
                                }
                              }
                            }
                          }
                        }
                      }
                    }.bind(this)).catch(function (error) {
                      console.log('error:' + error)
                    })
                  }.bind(this)).catch(function (error) {
                    console.log('error:' + error)
                  })
                }.bind(this)).catch(function (error) {
                  console.log('error:' + error)
                })
              }.bind(this)).catch(function (error) {
                global.store.commit('FORM_FAILURE', {id: 'event-detail-form', error})
              })
            }.bind(this)).catch(function (error) {
              global.store.commit('FORM_FAILURE', {id: 'event-detail-form', error})
            })
          }.bind(this)
        }
      }
    },
    components: {
      panel, vform
    },
    methods: {},
    mounted () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../../scss/import";

  .form-event-detail {
    .position-map {
      margin: 15px 15px;
      overflow: hidden;
      .row {
        margin: 0;
        height: 100px;
        border: none;
        .col {
          &:hover {
            background-color: #ccc;
          }
          &.content.active {
            background-color: #fff;
          }
          &.block-temp.active {
            background-color: $brand-warning;
          }
          width: 16.66%;
          float: left;
          border: 1px solid #ccc;
          height: 100px;
        }
      }
    }
    .tabPanel {
      .panel-wrapper {
        > header {
          display: none;
        }
      }

    }
  }
</style>
