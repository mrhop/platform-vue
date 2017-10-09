<template>
  <div class="file-list">
    <panel>
      <h1 slot="header">文件列表</h1>
      <vtable id="file-list" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'

  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  let responseRows = null
  export default {
    data () {
      return {
        actions: {
          list: function (args) {
            let config = {
              url: global.getCookie('filebrowserListUrl'),
              method: 'post',
              data: args
            }
            let ruleChangeConfig = {
              url: global.getCookie('filebrowserRuleChangeUrl'),
              method: 'post',
              data: {type: 'list'}
            }
            config.data = args
            let pager = args.pager
            let filters = args.filters
            let sorts = args.sorts
            if (args.init) {
              axios.request(config).then(function (response) {
                axios.request(ruleChangeConfig).then(function (responseInner) {
                  global.store.commit('TABLE_SUCCESS', {
                    id: 'file-list',
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
                            items: responseInner.data.types,
                            filter: true
                          },
                          {
                            'name': 'fileLibId',
                            'title': '文件库',
                            'type': 'select',
                            items: responseInner.data.fileLibs,
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
                          }
                        ],
                        'action': {
                          events: [
                            {
                              key: 'useThisFile',
                              label: '使用该文件'
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
                  responseRows = response.data.rows
                }).catch(function (error) {
                  global.store.commit('TABLE_FAILURE', {id: 'file-list', error})
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'file-list', error})
              })
            } else {
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'file-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
                responseRows = response.data.rows
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'file-list', error})
              })
            }
          },
          useThisFile: function (key) {
            let params = new RegExp('CKEditorFuncNum=([^\\&]*)', 'i').exec(window.location.search)
            let funcNum = params ? params[1] : null
            // 使用该文件，根据Key找到url
            if (responseRows) {
              for (let index in responseRows) {
                if (responseRows[index].key === key) {
                  window.opener.CKEDITOR.tools.callFunction(funcNum, responseRows[index].value[5])
                  break
                }
              }
            }
            window.close()
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
