<template>
  <div class="form-template-update form-add">
    <panel>
      <h1 slot="header">更新模板</h1>
      <vform ref="tplForm" id="template-update-form" :actions="actions" :actionUrls="actionUrls"
             :updateRule="templateFormUpdateRule"></vform>
    </panel>
    <panel class="tabPanel">
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
  import lodash from 'lodash'
  import axios from 'axios'
  import Vue from 'vue'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let tabTpl = huodhVuePlugins.tabTpl
  let vform = huodhVuePlugins.vform
  let vtable = huodhVuePlugins.vtable

  let initConfig = {
    url: commonUrls.template.info,
    method: 'get'
  }
  let initBlockListConfig = {
    url: commonUrls.block.list,
    method: 'post'
  }
  let initBlockInfoConfig = {
    url: commonUrls.block.info,
    method: 'get'
  }
  let blockDelConfig = {
    url: commonUrls.block.delete,
    method: 'get'
  }
  let blockSaveConfig = {
    url: commonUrls.block.save,
    method: 'post'
  }
  let blockUpdateConfig = {
    url: commonUrls.block.update,
    method: 'post'
  }
  export default {
    data () {
      return {
        tplName: null,
        contentPosition: null,
        blockContentPositionNew: null,
        blockNameChanged: null,
        blockContent: null,
        blockScript: null,
        blockIdChanged: -1,
        positionMapAction: [],
        blockPositionMapAction: [],
        blockList: {},
        defaultBlockColor: 'rgb(0, 0, 0)',
        defaultBlockBorderColor: 'rgb(240, 173, 78)',
        colorList: {},
        tabSelected: 1,
        positionShow: false,
        positionCurrent: 'template',
        actionUrls: {
          backupUrl: commonUrls.vuerouter.template.list,
          saveUrl: commonUrls.template.update
        },
        actions: {
          reinit: false,
          init: function (params) {
            initConfig.params = {key: this.$route.query.key}
            axios.request(initConfig).then(function (response) {
              this.tplName = response.data.name
              this.contentPosition = response.data.contentPosition && JSON.parse(response.data.contentPosition)
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '模板名称',
                    'type': 'text',
                    'validate': [{
                      'errorMsg': '模板名称在2-40个字符之间，且前后不能有空格',
                      'regex': '^\\S.{0,38}\\S$'
                    }],
                    'placeholder': '模板名称',
                    defaultValue: this.tplName
                  },
                  {
                    'name': 'contentPosition',
                    'label': '内容位置',
                    'type': 'text',
                    locked: true,
                    defaultValue: response.data.contentPosition,
                    clickEvent: this.contentPositionClick.bind(this)
                  },
                  {
                    'name': 'blocks',
                    'type': 'hidden'
                  }
                ],
                action: {
                  save: {
                    label: '保存'
                  }
                }
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'template-update-form',
                data: {
                  rules
                }
              })
              if (this.contentPosition) {
                let cols = this.$refs.positionMap.querySelectorAll('div.col')
                for (let index in cols) {
                  if (index < cols.length) {
                    if (index % 6 >= this.contentPosition.begin.x && index % 6 < this.contentPosition.end.x && Math.floor(index / 6) >= this.contentPosition.begin.y && Math.floor(index / 6) < this.contentPosition.end.y) {
                      cols[index].setAttribute('class', 'col content active')
                    }
                  }
                }
              }
            }.bind(this))
          }.bind(this)
        },
        blockListActions: {
          reinit: false,
          list: function (args) {
            var init = args.init
            let _this = this
            initBlockListConfig.params = {templateKey: this.$route.query.key}
            if (init) {
              axios.request(initBlockListConfig).then(function (response) {
                _this.blockList = {}
                if (response.data.rows && response.data.rows.length > 0) {
                  let cols = _this.$refs.positionMap.querySelectorAll('div.col')
                  for (let k in response.data.rows) {
                    _this.blockList[response.data.rows[k].key] = {
                      value: [response.data.rows[k].value[0], response.data.rows[k].value[1]]
                    }
                    let position = JSON.parse(response.data.rows[k].value[1])
                    for (let i in cols) {
                      if (i < cols.length) {
                        if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                          cols[i].removeAttribute('style')
                          cols[i].setAttribute('class', 'col block-added')
                          if (i % 6 === position.begin.x) {
                            cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-left-color:' + _this.defaultBlockBorderColor) : ('border-left-color:' + _this.defaultBlockBorderColor))
                          }
                          if (i % 6 === (position.end.x - 1)) {
                            cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-right-color:' + _this.defaultBlockBorderColor) : ('border-right-color:' + _this.defaultBlockBorderColor))
                          }
                          if (Math.floor(i / 6) === position.begin.y) {
                            cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-top-color:' + _this.defaultBlockBorderColor) : ('border-top-color:' + _this.defaultBlockBorderColor))
                          }
                          if (Math.floor(i / 6) === (position.end.y - 1)) {
                            cols[i].setAttribute('style', cols[i].getAttribute('style') ? (cols[i].getAttribute('style') + ';border-bottom-color:' + _this.defaultBlockBorderColor) : ('border-bottom-color:' + _this.defaultBlockBorderColor))
                          }
                          if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                            cols[i].innerHTML = '<p>' + response.data.rows[k].value[0] + '</p>'
                          }
                        }
                      }
                    }
                  }
                }
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
                    'data': response.data
                  },
                  callParameters: {init: true}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'block-list', error})
              })
            } else {
              axios.request(initBlockListConfig).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'block-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'block-list', error})
              })
            }
          }.bind(this),
          addAction: function (args) {
            this.blockIdChanged = -1
            this.blockContentPositionNew = null
            this.blockNameChanged = null
            this.blockContent = null
            this.blockScript = null
            this.blockAddactions.reinit = true
            this.tabSelected = 1
          }.bind(this),
          updateAction: function (args) {
            initBlockInfoConfig.params = {key: args.key}
//            let _this = this
            axios.request(initBlockInfoConfig).then(function (response) {
              this.blockIdChanged = args.key
              this.blockContentPositionNew = JSON.parse(response.data.position)
              this.blockNameChanged = response.data.name
              this.blockContent = response.data.content
              this.blockScript = response.data.script
              this.blockAddactions.reinit = true
              this.tabSelected = 1
              let position = this.blockContentPositionNew
              let cols = this.$refs.positionMap.querySelectorAll('div.col')
              for (let i in cols) {
                if (i < cols.length) {
                  let classes = cols[i].getAttribute('class')
                  if (classes.indexOf('block-added') > -1 || classes.indexOf('content') > -1) {
                    cols[i].removeEventListener('click', this.blockPositionMapAction[i])
                    cols[i].removeEventListener('click', this.positionMapAction[i])
                  }
                  if (i < cols.length) {
                    if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                      cols[i].addEventListener('click', this.blockPositionMapAction[i])
                      cols[i].setAttribute('class', 'col block-temp active')
                      cols[i].removeAttribute('style')
                      if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                        cols[i].innerHTML = ''
                      }
                    } else {

                    }
                  }
                }
              }
            }.bind(this))
          }.bind(this),
          delete: function (args) {
            blockDelConfig.params = {key: args.key}
            axios.request(blockDelConfig).then(function (response) {
              let position = JSON.parse(response.data.position)
              let cols = this.$refs.positionMap.querySelectorAll('div.col')
              for (let i in cols) {
                if (i < cols.length) {
                  if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                    cols[i].setAttribute('class', 'col')
                    cols[i].removeAttribute('style')
                    if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                      cols[i].innerHTML = ''
                    }
                  } else if (cols[i].getAttribute('class').indexOf('block-temp') > -1) {
                    cols[i].setAttribute('class', 'col')
                  }
                }
              }
              this.blockListActions.reinit = true
              if (this.blockIdChanged === args.key) {
                this.blockIdChanged = -1
                this.blockContentPositionNew = null
                this.blockNameChanged = null
                this.blockContent = null
                this.blockScript = null
                this.blockAddactions.reinit = true
              }
            }.bind(this))
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
                  defaultValue: this.blockContent,
                  config: global.CKEditorConfig
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
            let blockActionConfig = params.data.id !== -1 ? blockUpdateConfig : blockSaveConfig
            blockActionConfig.data = params.data
            if (params.data.id !== -1) {
              blockActionConfig.params = {key: params.data.id}
            } else {
              blockActionConfig.params = {templateKey: this.$route.query.key}
            }
            axios.request(blockActionConfig).then(function (response) {
              global.store.commit('FORM_SAVE_SUCCESS', {
                id: 'block-add-form',
                data: {}
              })
              this.blockIdChanged = -1
              this.blockContentPositionNew = null
              this.blockNameChanged = null
              this.blockContent = null
              this.blockScript = null
              this.blockAddactions.reinit = true
              this.blockListActions.reinit = true
              this.tabSelected = 0
            }.bind(this))
          }.bind(this)
        },
        templateFormUpdateRule: {},
        blockFormUpdateRule: {}
      }
    },
    components: {
      panel, vform, vtable, tabTpl
    },
    methods: {
      colClick (index, event) {
        index = +index
        if (event.target.getAttribute('class').indexOf('block') < 0) {
          if (event.altKey) {
            // 根据算法连续选中
            if (this.contentPosition && event.target.getAttribute('class').indexOf('content') < 0) {
              let temp = lodash.cloneDeep(this.contentPosition)
              if (index % 6 < this.contentPosition.begin.x) {
                temp.begin.x = index % 6
              } else if (index % 6 + 1 > this.contentPosition.end.x) {
                temp.end.x = index % 6 + 1
              }
              if (Math.floor(index / 6) < this.contentPosition.begin.y) {
                temp.begin.y = Math.floor(index / 6)
              } else if (Math.floor(index / 6) + 1 > this.contentPosition.end.y) {
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
                  if (className && className.indexOf('block') >= 0) {
                    if (positionsSelected.includes(i)) {
                      return
                    }
                  }
                }
              }
              this.contentPosition = temp
              for (let j in cols) {
                if (j < cols.length) {
                  let className = cols[j].getAttribute('class')
                  if (positionsSelected.includes(j) && className.indexOf('content') < 0) {
                    cols[j].setAttribute('class', 'col content active')
                  }
                }
              }
              if (this.contentPosition && (this.contentPosition.begin.x === this.contentPosition.end.x) && (this.contentPosition.begin.y === this.contentPosition.end.y)) {
                this.contentPosition = null
              }
            }
          } else {
            // 选中单独的col
            if (event.target.getAttribute('class').indexOf('content') > -1) {
              if (index % 6 === this.contentPosition.begin.x) {
                this.contentPosition.begin.x += 1
              } else if (index % 6 + 1 === this.contentPosition.end.x) {
                this.contentPosition.end.x -= 1
              }
              if (Math.floor(index / 6) === this.contentPosition.begin.y) {
                this.contentPosition.begin.y += 1
              } else if (Math.floor(index / 6) + 1 === this.contentPosition.end.y) {
                this.contentPosition.end.y -= 1
              }
              let positionsSelected = []
              for (let x = this.contentPosition.begin.x; x < this.contentPosition.end.x; x++) {
                for (let y = this.contentPosition.begin.y; y < this.contentPosition.end.y; y++) {
                  positionsSelected.push('' + (y * 6 + x))
                }
              }
              let cols = this.$refs.positionMap.querySelectorAll('div.col')
              for (let i in cols) {
                if (i < cols.length) {
                  let className = cols[i].getAttribute('class')
                  if (className && className.indexOf('block') < 0) {
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
                  if (className && className.indexOf('block') < 0) {
                    cols[i].setAttribute('class', 'col')
                  }
                }
              }
              event.target.setAttribute('class', 'col content active')
              this.contentPosition = {
                begin: {x: index % 6, y: Math.floor(index / 6)}, end: {x: index % 6 + 1, y: Math.floor(index / 6) + 1}
              }
            }
            if (this.contentPosition && (this.contentPosition.begin.x === this.contentPosition.end.x) && (this.contentPosition.begin.y === this.contentPosition.end.y)) {
              this.contentPosition = null
            }
          }
          Vue.set(this.templateFormUpdateRule, 'contentPosition', this.contentPosition && JSON.stringify(this.contentPosition))
        }
      },
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
          if (this.positionCurrent !== 'block-list') {
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            for (let temp in cols) {
              if (temp < cols.length) {
                cols[temp].innerHTML = ''
              }
            }
            for (let k in this.blockList) {
              let position = JSON.parse(this.blockList[k].value[1])
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
                      cols[i].innerHTML = '<p>' + this.blockList[k].value[0] + '</p>'
                    }
                  }
                }
              }
            }
          }
          this.positionCurrent = 'block-list'
        } else if (index === 1) {
          if (this.positionCurrent !== 'block-tab' && this.positionCurrent !== 'block') {
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            if (this.blockIdChanged !== -1) {
              let position = JSON.parse(this.blockList[this.blockIdChanged].value[1])
              for (let i in cols) {
                if (i < cols.length) {
                  if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                    cols[i].setAttribute('class', 'col block-temp active')
                    cols[i].removeAttribute('style')
                    if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                      cols[i].innerHTML = ''
                    }
                  } else if (cols[i].getAttribute('class').indexOf('block-temp') > -1) {
                    cols[i].setAttribute('class', 'col')
                  }
                }
              }
              Vue.set(this.blockFormUpdateRule, 'position', this.blockList[this.blockIdChanged].value[1])
            }
          }
          this.positionCurrent = 'block-tab'
        } else if (index === 2) {
          // remove click？继续完成，同时在第一个模块上给出title，同时给出不同的颜色
          this.positionShow = true
          if (this.positionCurrent !== 'blockMap') {
            this.$refs.blockMap.appendChild(this.$refs.positionMap)
            let cols = this.$refs.positionMap.querySelectorAll('div.col')
            for (let i in cols) {
              if (i < cols.length) {
                cols[i].removeEventListener('click', this.blockPositionMapAction[i])
                cols[i].removeEventListener('click', this.positionMapAction[i])
                if (this.blockIdChanged !== -1) {
                  let position = JSON.parse(this.blockList[this.blockIdChanged].value[1])
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
                      cols[i].innerHTML = '<p>' + this.blockList[this.blockIdChanged].value[0] + '</p>'
                    }
                  }
                  if (cols[i].getAttribute('class').indexOf('block-temp') > -1) {
                    cols[i].setAttribute('class', 'col')
                  }
                }
              }
            }
          }
          this.positionCurrent = 'blockMap'
        }
      },
      contentPositionClick: function () {
        if (this.positionCurrent !== 'template') {
          let formEl = this.$refs.tplForm.$el.querySelector('input[name="contentPosition"]')
          this.positionShow = true
          formEl.parentNode.appendChild(this.$refs.positionMap)
          let cols = this.$refs.positionMap.querySelectorAll('div.col')
          for (let i in cols) {
            if (i < cols.length) {
              let className = cols[i].getAttribute('class')
              cols[i].removeEventListener('click', this.blockPositionMapAction[i])
              if (className && className.indexOf('block-added') < 0 && className && className.indexOf('block-temp') < 0) {
                cols[i].addEventListener('click', this.positionMapAction[i])
              }
            }
          }
        } else {
          this.positionShow = !this.positionShow
        }
        this.positionCurrent = 'template'
      }
    },
    mounted () {
      let cols = this.$refs.positionMap.querySelectorAll('div.col')
      for (let i in cols) {
        if (i < cols.length) {
          let className = cols[i].getAttribute('class')
          if (className && className.indexOf('block-added') < 0) {
            let clickCol = this.colClick.bind(this, i)
            this.positionMapAction.push(clickCol)
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../../scss/import";

  .form-template-update {
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
