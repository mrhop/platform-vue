<template>
  <div class="form-event form-detail">
    <panel>
      <h1 slot="header">新增活动</h1>
      <vform id="event-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
            <vform ref="blockForm" id="block-add-form" :actions="blockAddactions"
                   :updateRule="blockFormUpdateRule"></vform>
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
  import lodash from 'lodash'
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
  let eventSaveConfig = {
    url: commonUrls.event.save,
    method: 'post'
  }
  let initBlockListConfig = {
    url: commonUrls.block.list,
    method: 'post'
  }
  let initTplConfig = {
    url: commonUrls.template.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.event.list
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
                    'name': 'subtitle',
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
                    required: false,
                    'placeholder': '链接别名'
                  },
                  {
                    'name': 'articleTags',
                    'label': '活动TAG',
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
                id: 'event-add-form',
                data: {
                  rules
                }
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {id: 'event-add-form', error})
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
                initTplConfig.params = {key: params.changed.templateId}
                initBlockListConfig.params = {templateKey: params.changed.templateId}
                axios.request(initTplConfig).then(function (responseOuter) {
                  axios.request(initBlockListConfig).then(function (response) {
                    let cols = this.$refs.positionMap.querySelectorAll('div.col')
                    for (let i in cols) {
                      if (i < cols.length) {
                        cols[i].removeAttribute('style')
                        cols[i].setAttribute('class', 'col')
                      }
                    }
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
                  }.bind(this)).catch(function (error) {
                    console.log('error:' + error)
                  })
                }.bind(this)).catch(function (error) {
                  console.log('error:' + error)
                })
              } else {
                this.blocksShow = false
                this.positionShow = false
              }
            }
          }.bind(this),
          save: function (params) {
            let templateBlocks = []
            for (let templateBlockIndex in this.blockList) {
              if (templateBlockIndex < this.blockList.length) {
                templateBlocks.push(this.blockList[templateBlockIndex].value)
              }
            }
            params.data.blocks = templateBlocks
            eventSaveConfig.data = params.data
            axios.request(eventSaveConfig).then(function (response) {
              global.store.commit('FORM_SAVE_SUCCESS', {
                id: 'event-add-form',
                data: {}
              })
            }).catch(function (error) {
              global.store.commit('FORM_SAVE_FAILURE', {id: 'event-add-form', error})
            })
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
            for (var keyInnner in this.blockList) {
              if (this.blockList[keyInnner].key === args.key) {
                this.blockIdChanged = args.key
                this.blockContentPositionNew = JSON.parse(this.blockList[keyInnner].value[1])
                this.blockNameChanged = this.blockList[keyInnner].value[0]
                this.blockContent = this.blockList[keyInnner].value[2]
                this.blockScript = this.blockList[keyInnner].value[3]
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
                break
              }
            }
          }.bind(this),
          delete: function (args) {
            for (var keyInnner in this.blockList) {
              if (this.blockList[keyInnner].key === args.key) {
                let position = JSON.parse(this.blockList[keyInnner].value[1])
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
                Vue.delete(this.blockList, +keyInnner)
                this.blockListActions.reinit = true
                break
              }
            }
          }.bind(this)
        },
        blockAddactions: {
          reinit: false,
          init: function (params) {
            let rules = {
              'items': [
                {
                  'name': 'id',
                  'type': 'hidden',
                  defaultValue: this.blockIdChanged
                },
                {
                  'name': 'name',
                  'label': 'block名称',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': 'block名称在2-40个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,38}\\S$'
                  }],
                  'placeholder': 'block名称',
                  defaultValue: this.blockNameChanged
                },
                {
                  'name': 'content',
                  'label': 'block内容',
                  'type': 'ckeditor',
                  defaultValue: this.blockContent
                },
                {
                  'name': 'script',
                  'label': 'block脚本',
                  'type': 'textarea',
                  defaultValue: this.blockScript
                },
                {
                  'name': 'position',
                  'label': '内容位置',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': '不能为空',
                    'regex': '^\\S+$'
                  }],
                  locked: true,
                  defaultValue: this.blockContentPositionNew && JSON.stringify(this.blockContentPositionNew)
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
              id: 'block-add-form',
              data: {
                rules
              }
            })
          }.bind(this),
          save: function (params) {
            if (params.data.id !== -1) {
              for (var keyInnner in this.blockList) {
                if (this.blockList[keyInnner].key === params.data.id) {
                  this.blockList[keyInnner].value = [params.data.name, params.data.position, params.data.content, params.data.script]
                  break
                }
              }
            } else {
              this.blockList.push({
                key: new Date().getTime(),
                value: [params.data.name, params.data.position, params.data.content, params.data.script]
              })
            }
            let position = JSON.parse(params.data.position)
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
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
                    cols[i].innerHTML = '<p>' + params.data.name + '</p>'
                  }
                }
              }
            }
            this.blockIdChanged = -1
            this.blockContentPositionNew = null
            this.blockNameChanged = null
            this.blockContent = null
            this.blockScript = null
            this.blockAddactions.reinit = true
            this.tabSelected = 0
            this.blockListActions.reinit = true
            global.store.commit('FORM_SAVE_SUCCESS', {
              id: 'block-add-form',
              data: {}
            })
          }.bind(this)
        },
        blockFormUpdateRule: {},
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
        defaultBlockBorderColor: 'rgb(240, 173, 78)',
        // list 使用
        blockList: [],
        tabSelected: 2,
        positionShow: false,
        positionCurrent: null
      }
    },
    methods: {
      blockColClick (index, event) {
        index = +index
        if (event.target.getAttribute('class').indexOf('content') < 0 && event.target.getAttribute('class').indexOf('block-added') < 0) {
          if (event.altKey) {
            // 根据算法连续选中
            if (this.blockContentPositionNew && event.target.getAttribute('class').indexOf('content') < 0 && event.target.getAttribute('class').indexOf('block-added') < 0) {
              let temp = lodash.cloneDeep(this.blockContentPositionNew)
              if (index % 6 < this.blockContentPositionNew.begin.x) {
                temp.begin.x = index % 6
              } else if (index % 6 + 1 > this.blockContentPositionNew.end.x) {
                temp.end.x = index % 6 + 1
              }
              if (Math.floor(index / 6) < this.blockContentPositionNew.begin.y) {
                temp.begin.y = Math.floor(index / 6)
              } else if (Math.floor(index / 6) + 1 > this.blockContentPositionNew.end.y) {
                temp.end.y = Math.floor(index / 6) + 1
              }
              let positionsSelected = []
              for (let x = temp.begin.x; x < temp.end.x; x++) {
                for (let y = temp.begin.y; y < temp.end.y; y++) {
                  positionsSelected.push('' + (y * 6 + x))
                }
              }
              let cols = this.$refs.positionMap.querySelectorAll('div.col')
              for (let i in cols) {
                if (i < cols.length) {
                  let className = cols[i].getAttribute('class')
                  if (className && className.indexOf('content') >= 0 || className && className.indexOf('block-added') >= 0) {
                    if (positionsSelected.includes(i)) {
                      return
                    }
                  }
                }
              }
              this.blockContentPositionNew = temp
              for (let j in cols) {
                if (j < cols.length) {
                  let className = cols[j].getAttribute('class')
                  if (positionsSelected.includes(j) && className.indexOf('block-temp') < 0) {
                    cols[j].setAttribute('class', 'col block-temp active')
                  }
                }
              }
              if (this.blockContentPositionNew && (this.blockContentPositionNew.begin.x === this.blockContentPositionNew.end.x) && (this.blockContentPositionNew.begin.y === this.blockContentPositionNew.end.y)) {
                this.blockContentPositionNew = null
              }
              Vue.set(this.blockFormUpdateRule, 'position', this.blockContentPositionNew && JSON.stringify(this.blockContentPositionNew))
            }
          } else {
            // 选中单独的col
            if (event.target.getAttribute('class').indexOf('block-temp') > -1) {
              if (index % 6 === this.blockContentPositionNew.begin.x) {
                this.blockContentPositionNew.begin.x += 1
              } else if (index % 6 + 1 === this.blockContentPositionNew.end.x) {
                this.blockContentPositionNew.end.x -= 1
              }
              if (Math.floor(index / 6) === this.blockContentPositionNew.begin.y) {
                this.blockContentPositionNew.begin.y += 1
              } else if (Math.floor(index / 6) + 1 === this.blockContentPositionNew.end.y) {
                this.blockContentPositionNew.end.y -= 1
              }
              let positionsSelected = []
              for (let x = this.blockContentPositionNew.begin.x; x < this.blockContentPositionNew.end.x; x++) {
                for (let y = this.blockContentPositionNew.begin.y; y < this.blockContentPositionNew.end.y; y++) {
                  positionsSelected.push('' + (y * 6 + x))
                }
              }
              let cols = this.$refs.positionMap.querySelectorAll('div.col')
              for (let i in cols) {
                if (i < cols.length) {
                  let className = cols[i].getAttribute('class')
                  if (className && className.indexOf('content') < 0 && className.indexOf('block-added') < 0) {
                    if (!positionsSelected.includes(i)) {
                      cols[i].setAttribute('class', 'col')
                    }
                  }
                }
              }
            } else {
              let cols = this.$refs.positionMap.querySelectorAll('div.col')
              for (let i in cols) {
                if (i < cols.length) {
                  let className = cols[i].getAttribute('class')
                  if (className && className.indexOf('content') < 0 && className.indexOf('block-added') < 0) {
                    cols[i].setAttribute('class', 'col')
                  }
                }
              }
              event.target.setAttribute('class', 'col block-temp active')
              this.blockContentPositionNew = {
                begin: {x: index % 6, y: Math.floor(index / 6)}, end: {x: index % 6 + 1, y: Math.floor(index / 6) + 1}
              }
            }
            if (this.blockContentPositionNew && (this.blockContentPositionNew.begin.x === this.blockContentPositionNew.end.x) && (this.blockContentPositionNew.begin.y === this.blockContentPositionNew.end.y)) {
              this.blockContentPositionNew = null
            }
            Vue.set(this.blockFormUpdateRule, 'position', this.blockContentPositionNew && JSON.stringify(this.blockContentPositionNew))
          }
        }
      },
      tabClick: function (index, event) {
        this.tabSelected = index
        if (index === 0) {
          this.positionCurrent = 'blockList'
          this.blockListActions.reinit = true
        } else if (index === 1) {
          if (this.positionCurrent !== 'block-tab' && this.positionCurrent !== 'block') {
            this.positionCurrent = 'block-tab'
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            if (this.blockIdChanged !== -1) {
              for (let keyInnner in this.blockList) {
                if (this.blockList[keyInnner].key === this.blockIdChanged) {
                  let position = JSON.parse(this.blockList[keyInnner].value[1])
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
                  Vue.set(this.blockFormUpdateRule, 'position', this.blockList[keyInnner].value[1])
                  break
                }
              }
            }
          }
        } else if (index === 2) {
          // remove click？继续完成，同时在第一个模块上给出title，同时给出不同的颜色
          this.positionShow = true
          if (this.positionCurrent !== 'blockMap') {
            this.positionCurrent = 'blockMap'
            this.$refs.blockMap.appendChild(this.$refs.positionMap)
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            for (let i in cols) {
              if (i < cols.length) {
                cols[i].removeEventListener('click', this.blockPositionMapAction[i])
                cols[i].removeEventListener('click', this.positionMapAction[i])
                if (cols[i].getAttribute('class').indexOf('block-temp') > -1) {
                  cols[i].setAttribute('class', 'col')
                }
              }
            }
            if (this.blockIdChanged !== -1) {
              for (let keyInnner in this.blockList) {
                if (this.blockList[keyInnner].key === this.blockIdChanged) {
                  let position = JSON.parse(this.blockList[keyInnner].value[1])
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
                          cols[i].innerHTML = '<p>' + this.blockList[keyInnner].value[0] + '</p>'
                        }
                      }
                    }
                  }
                  break
                }
              }
            }
          }
        }
      }
    },
    mounted () {
      let cols = this.$refs.positionMap.querySelectorAll('div.col')
      for (let i in cols) {
        if (i < cols.length) {
          let className = cols[i].getAttribute('class')
          if (className && className.indexOf('block-added') < 0) {
            let blockColClick = this.blockColClick.bind(this, i)
            this.blockPositionMapAction.push(blockColClick)
          }
        }
      }
      let blockFormEl = this.$refs.blockForm.$el.querySelector('input[name="position"]')
      blockFormEl.addEventListener('click', function () {
        if (this.positionCurrent !== 'block') {
          blockFormEl.parentNode.appendChild(this.$refs.positionMap)
          this.positionShow = true
          let cols = this.$refs.positionMap.querySelectorAll('div.col')
          for (let i in cols) {
            if (i < cols.length) {
              cols[i].removeEventListener('click', this.positionMapAction[i])
              let className = cols[i].getAttribute('class')
              if (className && className.indexOf('content') < 0 && className.indexOf('block-added') < 0) {
                cols[i].addEventListener('click', this.blockPositionMapAction[i])
              }
            }
          }
        } else {
          this.positionShow = !this.positionShow
        }
        this.positionCurrent = 'block'
      }.bind(this))
    },
    components: {
      panel, vform, tabTpl, vtable
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "../../../../scss/import";

  .form-event {
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
