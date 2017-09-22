<template>
  <div class="form-article form-detail">
    <panel>
      <h1 slot="header">新增文章</h1>
      <vform id="article-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel class="tabPanel" v-show="blocksShow">
      <tabTpl :tabSelected="tabSelected" v-on:headerClick="tabClick">
        <ul slot="header">
          <li>block列表</li>
          <li>新增/更新block</li>
          <li>block Map</li>
        </ul>
        <ul>
          <li>
            <vtable id="block-list"
                    :actions="blockListActions"></vtable>
          </li>
          <li>
            <!--<vform ref="blockForm" id="block-add-form" :actions="blockAddactions"-->
            <!--:updateRule="blockFormUpdateRule"></vform>-->
          </li>
          <li ref="blockMap">
          </li>
        </ul>
      </tabTpl>
    </panel>
    <div ref="positionMap" v-show="positionShow" class="position-map">
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
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let tabTpl = huodhVuePlugins.tabTpl
  let vtable = huodhVuePlugins.vtable
  let ruleChangeConfig = {
    url: commonUrls.article.rulechange,
    method: 'post',
    data: {type: 'form'}
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.article.list,
          saveUrl: commonUrls.article.save
        },
        actions: {
          init: function (params) {
            axios.request(ruleChangeConfig).then(function (responseInner) {
              let rules = {
                'items': [
                  {
                    'name': 'title',
                    'label': '标题',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '标题在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '标题'
                  },
                  {
                    'name': 'title',
                    'label': '子标题',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '子标题在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    required: false,
                    'placeholder': '子标题'
                  },
                  {
                    'name': 'aliasUrl',
                    'label': '链接别名',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '链接别名由英文，数字和 _ 组成，并在5-40个字符之间',
                      'regex': '^\\w{5,40}$'
                    }],
                    'placeholder': '链接别名'
                  },
                  {
                    'name': 'articleTags',
                    'label': '文章TAG',
                    'type': 'checkbox',
                    items: responseInner.data.articleTags
                  },
                  {
                    'name': 'published',
                    'label': '已发布',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
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
                    ruleChange: true
                  },
                  {
                    'name': 'publishDate',
                    'label': '发布日期',
                    'type': 'date',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    hidden: true
                  },
                  {
                    'name': 'templateId',
                    'label': '使用模板',
                    'type': 'select',
                    'validate': [{
                      'errorMsg': '不能为空',
                      'regex': '^\\S+$'
                    }],
                    items: responseInner.data.templates,
                    ruleChange: true
                  },
                  {
                    'name': 'content',
                    'label': '内容',
                    'type': 'ckeditor'
                  },
                  {
                    'name': 'script',
                    'label': '脚本',
                    'type': 'textarea'
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
                id: 'article-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('TABLE_FAILURE', {id: 'article-list', error})
            })
          },
          ruleChange: function (params) {
            if (params.changed.hasOwnProperty('published')) {
              if (params.changed.published) {
                return [
                  {
                    'name': 'publishDate',
                    'hidden': false
                  }
                ]
              } else {
                return [
                  {
                    'name': 'publishDate',
                    'hidden': true
                  }
                ]
              }
            } else if (params.changed.hasOwnProperty('templateId')) {
              console.log('changed')
              // 同时reinitblocklist以及addblockform
              this.blockList = []
              this.blockListActions.reinit = true
              this.blockContentPositionNew = null
              this.blockNameChanged = null
              this.blockContent = null
              this.blockScript = null
              this.blockIdChanged = -1
              if (params.changed.templateId) {
                // 此处应该获取到 template的具体内容 axios,然后将col刷新
                this.$refs.blockMap.appendChild(this.$refs.positionMap)
                this.tabSelected = 2
                this.blocksShow = true
                this.positionShow = true
              } else {
                this.blocksShow = false
                this.positionShow = false
              }
            }
          }.bind(this)
        },
        blockListActions: {
          reinit: false,
          list: function (args) {
            var init = args.init
            if (init) {
              global.store.commit('TABLE_SUCCESS', {
                id: 'block-list',
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
                        'name': 'position',
                        'title': 'block位置',
                        'type': 'text'
                      }
                    ],
                    'action': {
                      'add': true,
                      'update': true,
                      'delete': true
                    },
                    'feature': {
                      'pager': false,
                      filter: false
                    }
                  },
                  'data': {rows: this.blockList, totalCount: this.blockList.length}
                },
                callParameters: {init: true}
              })
            } else {
              global.store.commit('TABLE_SUCCESS', {
                id: 'block-list',
                data: {
                  'data': this.blockList
                },
                callParameters: {}
              })
            }
          }.bind(this),
          addAction: function (args) {
            this.tabSelected = 1
          }.bind(this),
          updateAction: function (args) {
            console.log('do update' + args.key)
            this.blockIdChanged = args.key
            this.blockContentPositionNew = JSON.parse(this.blockList[args.key].value[1])
            this.blockNameChanged = this.blockList[args.key].value[0]
            this.blockContent = this.blockList[args.key].value[2]
            this.blockScript = this.blockList[args.key].value[3]
            this.blockAddactions.reinit = true
            this.tabSelected = 1
            let position = this.blockContentPositionNew
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            for (let i in cols) {
              if (i < cols.length) {
                if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                  cols[i].setAttribute('class', 'col block-temp active')
                  cols[i].removeAttribute('style')
                  if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                    cols[i].innerHTML = ''
                  }
                }
              }
            }
          }.bind(this),
          delete: function (args) {
            let position = JSON.parse(this.blockList[args.key].value[1])
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            for (let i in cols) {
              if (i < cols.length) {
                if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                  cols[i].setAttribute('class', 'col')
                  cols[i].removeAttribute('style')
                  if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                    cols[i].innerHTML = ''
                  }
                }
              }
            }
            Vue.delete(this.blockList, args.key)
            this.blockListActions.reinit = true
          }.bind(this)
        },
        blocksShow: false,
        contentPosition: null,
        //  let blockContentPosition = {}
        blockContentPositionNew: null,
        blockNameChanged: null,
        blockContent: null,
        blockScript: null,
        blockIdChanged: -1,
        positionMapAction: [],
        blockPositionMapAction: [],
        // blockadded
        defaultBlockColor: 'rgb(0, 0, 0)',
        // list 使用
        blockList: [],
        tabSelected: 2,
        positionShow: false,
        positionCurrent: null
      }
    },
    methods: {
      tabClick: function (index, event) {
        this.tabSelected = index
        if (index === 0) {
          // this.blockListActions.reinit = true
        } else if (index === 1) {
//          if (this.positionCurrent !== 'block-tab' && this.positionCurrent !== 'block') {
//            this.positionCurrent = 'block-tab'
//            let cols = this.$refs.positionMap.querySelectorAll('div.col')
//            if (this.blockIdChanged !== -1) {
//              let position = JSON.parse(this.blockList[this.blockIdChanged].value[1])
//              for (let i in cols) {
//                if (i < cols.length) {
//                  if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
//                    cols[i].setAttribute('class', 'col block-temp active')
//                    cols[i].removeAttribute('style')
//                    if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
//                      cols[i].innerHTML = ''
//                    }
//                  }
//                }
//              }
//              Vue.set(this.blockFormUpdateRule, 'position', this.blockList[this.blockIdChanged].value[1])
//            }
//          }
        } else if (index === 2) {
          // remove click？继续完成，同时在第一个模块上给出title，同时给出不同的颜色
          this.positionShow = true
          if (this.positionCurrent !== 'blockMap') {
            this.positionCurrent = 'blockMap'
            this.$refs.blockMap.appendChild(this.$refs.positionMap)
//            let cols = this.$refs.positionMap.querySelectorAll('div.col')
//            for (let i in cols) {
//              if (i < cols.length) {
//                cols[i].removeEventListener('click', this.blockPositionMapAction[i])
//                cols[i].removeEventListener('click', this.positionMapAction[i])
//                if (this.blockIdChanged !== -1) {
//                  let position = JSON.parse(this.blockList[this.blockIdChanged].value[1])
//                  let color = this.blockList[this.blockIdChanged].color
//                  if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
//                    cols[i].setAttribute('class', 'col block-added')
//                    cols[i].setAttribute('style', 'background-color:' + color)
//                    if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
//                      cols[i].innerHTML = '<p>' + this.blockList[this.blockIdChanged].value[0] + '</p>'
//                    }
//                  }
//                  if (cols[i].getAttribute('class').indexOf('block-temp') > -1) {
//                    cols[i].setAttribute('class', 'col')
//                  }
//                }
//              }
//            }
          }
        }
      }
    },
    components: {
      panel, vform, tabTpl, vtable
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "../../../../scss/import";

  .form-article {
    .position-map {
      margin: 15px 0;
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
