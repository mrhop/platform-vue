<template>
  <div class="form-template-add form-add">
    <panel>
      <h1 slot="header">新增模板</h1>
      <vform ref="tplForm" id="template-add-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel class="tabPanel">
      <tabTpl>
        <ul slot="header">
          <li class="active">block列表</li>
          <li>新增block</li>
        </ul>
        <ul>
          <li class="active">
            <vtable id="block-list"
                    :actions="blockListActions"></vtable>
          </li>
          <li>
            <vform ref="blockForm" id="block-add-form" :actions="blockAddactions"></vform>
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
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let tabTpl = huodhVuePlugins.tabTpl
  let vform = huodhVuePlugins.vform
  let vtable = huodhVuePlugins.vtable
  let contentPosition = null
  let nameChanged = null
  let blockContentPosition = null
  let blockNameChanged = null
  let blockList = []
  export default {
    data () {
      return {
        positionShow: false,
        actionUrls: {
          backupUrl: commonUrls.vuerouter.template.list,
          saveUrl: commonUrls.template.save
        },
        actions: {
          reinit: false,
          init: function (params) {
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
                  'ruleChange': true,
                  defaultValue: nameChanged
                },
                {
                  'name': 'contentPosition',
                  'label': '内容位置',
                  'type': 'text',
                  defaultValue: contentPosition && JSON.stringify(contentPosition),
                  locked: true
                },
                {
                  'name': 'blocks',
                  'type': 'hidden',
                  defaultValue: blockList
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
              id: 'template-add-form',
              data: {
                rules
              }
            })
          },
          ruleChange: function (params) {
            if (params.changed.name) {
              nameChanged = params.changed.name
            }
          }
        },
        blockListActions: {
          reinit: false,
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = {themeId: this.$route.params.key}
            var sorts = args.sorts
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
                      'info': true,
                      'delete': true
                    },
                    'feature': {
                      'pager': true,
                      filter: false
                    }
                  },
                  'data': blockList
                },
                callParameters: {pager, init: true}
              })
            } else {
              global.store.commit('TABLE_SUCCESS', {
                id: 'block-list',
                data: {
                  'data': blockList
                },
                callParameters: {pager, filters, sorts}
              })
            }
          }.bind(this)
        },
        blockAddactions: {
          reinit: false,
          init: function (params) {
            let rules = {
              'items': [
                {
                  'name': 'name',
                  'label': 'block名称',
                  'type': 'text',
                  'validate': [{
                    'errorMsg': 'block名称在2-40个字符之间，且前后不能有空格',
                    'regex': '^\\S.{0,38}\\S$'
                  }],
                  'placeholder': 'block名称',
                  'ruleChange': true,
                  defaultValue: blockNameChanged
                },
                {
                  'name': 'content',
                  'label': 'block内容',
                  'type': 'ckeditor'
                },
                {
                  'name': 'script',
                  'label': 'block脚本',
                  'type': 'ckeditor'
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
                  defaultValue: blockContentPosition
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
          },
          save: function (params) {
            blockList.add([params.data.name, params.data.position, params.data.content, params.data.script])
            blockContentPosition = null
            blockNameChanged = null
            this.blockAddactions.reinit = true
          }.bind(this),
          ruleChange: function (params) {
            if (params.changed.name) {
              blockNameChanged = params.changed.name
            }
          }
        }
      }
    },
    components: {
      panel, vform, vtable, tabTpl
    },
    methods: {
      colClick (index, event) {
        index = +index
        if (event.altKey) {
          // 根据算法连续选中
          if (event.target.getAttribute('class').indexOf('content') < 0 && event.target.getAttribute('class').indexOf('block') < 0) {
            let temp = lodash.cloneDeep(contentPosition)
            if (index % 6 < contentPosition.begin.x) {
              temp.begin.x = index % 6
            } else if (index % 6 + 1 > contentPosition.end.x) {
              temp.end.x = index % 6 + 1
            }
            if (Math.floor(index / 6) < contentPosition.begin.y) {
              temp.begin.y = Math.floor(index / 6)
            } else if (Math.floor(index / 6) + 1 > contentPosition.end.y) {
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
            contentPosition = temp
            for (let j in cols) {
              if (j < cols.length) {
                let className = cols[j].getAttribute('class')
                if (positionsSelected.includes(j) && className.indexOf('content') < 0) {
                  cols[j].setAttribute('class', 'col content active')
                }
              }
            }
            if (contentPosition && (contentPosition.begin.x === contentPosition.end.x) && (contentPosition.begin.y === contentPosition.end.y)) {
              contentPosition = null
            }
            this.actions.reinit = true
          }
        } else {
          // 选中单独的col
          if (event.target.getAttribute('class').indexOf('content') > -1) {
            if (index % 6 === contentPosition.begin.x) {
              contentPosition.begin.x += 1
            } else if (index % 6 + 1 === contentPosition.end.x) {
              contentPosition.end.x -= 1
            }
            if (Math.floor(index / 6) === contentPosition.begin.y) {
              contentPosition.begin.y += 1
            } else if (Math.floor(index / 6) + 1 === contentPosition.end.y) {
              contentPosition.end.y -= 1
            }
            let positionsSelected = []
            for (let x = contentPosition.begin.x; x < contentPosition.end.x; x++) {
              for (let y = contentPosition.begin.y; y < contentPosition.end.y; y++) {
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
            contentPosition = {
              begin: {x: index % 6, y: Math.floor(index / 6)}, end: {x: index % 6 + 1, y: Math.floor(index / 6) + 1}
            }
          }
          if (contentPosition && (contentPosition.begin.x === contentPosition.end.x) && (contentPosition.begin.y === contentPosition.end.y)) {
            contentPosition = null
          }
          this.actions.reinit = true
        }
      }
    },
    mounted () {
      let formEl = this.$refs.tplForm.$el.querySelector('input[name="contentPosition"]')
      formEl.addEventListener('click', function () {
        console.log('you click it')
        this.positionShow = !this.positionShow
      }.bind(this))
      formEl.parentNode.appendChild(this.$refs.positionMap)
      let cols = this.$refs.positionMap.querySelectorAll('div.col')
      for (let i in cols) {
        if (i < cols.length) {
          let className = cols[i].getAttribute('class')
          if (className && className.indexOf('block') < 0) {
            cols[i].addEventListener('click', this.colClick.bind(this, i))
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .form-template-add {
    .position-map {
      padding: 15px;
      .row {
        height: 100px;
        border: 1px solid #ccc;
        border-bottom: none;
        &:last-child {
          border-bottom: 1px solid #ccc;
        }
        .col {
          &:hover {
            background-color: #ccc;
          }
          &:active, &.content.active {
            background-color: #00ccff;
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
