<template>
  <div class="form-template-detail form-add">
    <panel>
      <h1 slot="header">模板详情</h1>
      <vform ref="tplForm" id="template-detail-form" :actions="actions" :actionUrls="actionUrls"></vform>
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

  let initConfig = {
    url: commonUrls.template.info,
    method: 'get'
  }
  let initBlockListConfig = {
    url: commonUrls.block.list,
    method: 'post'
  }

  export default {
    data () {
      return {
        tplName: null,
        defaultBlockColor: 'rgb(0, 0, 0)',
        actionUrls: {
          backupUrl: commonUrls.vuerouter.template.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              let contentPosition = response.data.contentPosition && JSON.parse(response.data.contentPosition)
              if (contentPosition) {
                let cols = this.$refs.positionMap.querySelectorAll('div.col')
                for (let index in cols) {
                  if (index < cols.length) {
                    if (index % 6 >= contentPosition.begin.x && index % 6 < contentPosition.end.x && Math.floor(index / 6) >= contentPosition.begin.y && Math.floor(index / 6) < contentPosition.end.y) {
                      cols[index].setAttribute('class', 'col content active')
                    }
                  }
                }
              }
              let rules = {
                'items': [
                  {
                    'name': 'name',
                    'label': '模板名称',
                    'type': 'text',
                    defaultValue: response.data.name,
                    locked: true
                  },
                  {
                    'name': 'contentPosition',
                    'label': '内容位置',
                    'type': 'text',
                    defaultValue: response.data.contentPosition,
                    locked: true
                  },
                  {
                    'name': 'blocks',
                    'type': 'hidden'
                  }
                ],
                action: {}
              }
              global.store.commit('FORM_SUCCESS', {
                id: 'template-detail-form',
                data: {
                  rules
                }
              })
            }.bind(this))
          }.bind(this)
        }
      }
    },
    components: {
      panel, vform
    },
    mounted () {
      let cols = this.$refs.positionMap.querySelectorAll('div.col')
      initBlockListConfig.params = {templateKey: this.$route.query.key}
      axios.request(initBlockListConfig).then(function (response) {
        let color = this.defaultBlockColor
        for (let k in response.data.rows) {
          let position = JSON.parse(response.data.rows[k].value[1])
          for (let i in cols) {
            if (i < cols.length) {
              if (i % 6 >= position.begin.x && i % 6 < position.end.x && Math.floor(i / 6) >= position.begin.y && Math.floor(i / 6) < position.end.y) {
                cols[i].setAttribute('class', 'col block-added')
                cols[i].setAttribute('style', 'background-color:' + color)
                if (i % 6 === position.begin.x && Math.floor(i / 6) === position.begin.y) {
                  cols[i].innerHTML = '<p>' + response.data.rows[k].value[0] + '</p>'
                }
              }
            }
          }
          color = global.shadeRGBColor(color, 0.2)
        }
      }.bind(this))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../../scss/import";

  .form-template-detail {
    .position-map {
      margin: 15px 15px;
      overflow: hidden;
      .row {
        margin: 0;
        height: 100px;
        border:none;
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
