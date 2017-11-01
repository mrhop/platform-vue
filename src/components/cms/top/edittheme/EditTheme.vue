<template>
  <div class="form-theme-detail form-detail">
    <panel>
      <h1 slot="header">更新主题</h1>
      <vform id="theme-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
    </panel>
    <panel canHide="true">
      <h1 slot="header">静态资源</h1>
      <vtable id="staticresource-list" :actionUrls="staticresourceActionUrls"
              :actions="staticresourceActions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../../common/cms'

  let panel = huodhVuePlugins.panel
  let vform = huodhVuePlugins.vform
  let vtable = huodhVuePlugins.vtable
  let ruleChangeConfig = {
    url: commonUrls.theme.rulechange,
    method: 'get'
  }
  let initConfig = {
    url: commonUrls.theme.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.theme.list,
          saveUrl: commonUrls.theme.update,
          afterSaveUrl: commonUrls.vuerouter.theme.list
        },
        actions: {
          init: function (params) {
            initConfig.params = {key: params.key}
            axios.request(initConfig).then(function (response) {
              axios.request(ruleChangeConfig).then(function (responseInner) {
                let rules = {
                  'items': [
                    {
                      'name': 'name',
                      'label': '主题名称',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '主题名称在2-40个字符之间，且前后不能有空格',
                        'regex': '^\\S.{0,38}\\S$'
                      }],
                      'defaultValue': response.data.name,
                      'placeholder': '主题名称'
                    },
                    {
                      'name': 'themeId',
                      'label': '主题ID',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.themeId
                    },
                    {
                      'name': 'screenshotFiles',
                      'label': '主题截图',
                      'type': 'image',
                      'validate': [{
                        'errorMsg': '只能为图片文件',
                        'regex': '\\.(png|jpe?g|gif|svg)(\\?.*)?$'
                      }],
                      'path': response.data.screenshots ? response.data.screenshots : undefined,
                      'maxSize': 200000,
                      'quantity': 5,
                      'required': false
                    }
                  ],
                  action: {
                    save: {
                      label: '更新'
                    },
                    reset: {
                      label: '重置'
                    },
                    backup: {
                      label: '返回列表'
                    }
                  }
                }

                if (responseInner.data.relatedUsers) {
                  rules.items.splice(2, 0, {
                    'name': 'relatedUserIds',
                    'label': '关联用户',
                    'type': 'checkbox',
                    'defaultValue': response.data.relatedUserIds,
                    items: responseInner.data.relatedUsers,
                    required: false
                  })
                }
                global.store.commit('FORM_SUCCESS', {
                  id: 'theme-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'theme-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'theme-update-form',
                error
              })
            })
          }
        },
        staticresourceActionUrls: {
          addUrl: commonUrls.vuerouter.staticresource.add + '?themeId=' + this.$route.query.key,
          detailUrl: commonUrls.vuerouter.staticresource.detail,
          infoUrl: commonUrls.vuerouter.staticresource.edit,
          deleteUrl: commonUrls.staticresource.delete
        },
        staticresourceActions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = {themeId: this.$route.query.key}
            var sorts = args.sorts
            if (init) {
              let config = {
                url: commonUrls.staticresource.list,
                method: 'post',
                data: {pager, filters, sorts, init: true}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'staticresource-list',
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
                              label: 'css',
                              value: 'stylesheet'
                            },
                            {
                              label: 'js',
                              value: 'script'
                            },
                            {
                              label: 'image',
                              value: 'image'
                            },
                            {
                              label: 'font',
                              value: 'font'
                            },
                            {
                              label: 'document',
                              value: 'document'
                            }
                          ],
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
                          'name': 'resourceOrder',
                          'title': '资源顺序（Byte）',
                          'type': 'text'
                        }
                      ],
                      'action': {
                        'add': true,
                        'detail': true,
                        'update': true,
                        'delete': true
                      },
                      'feature': {
                        'pager': true,
                        filter: true
                      }
                    },
                    'data': response.data
                  },
                  callParameters: {pager, init: true}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'staticresource-list', error})
              })
            } else {
              args.filters = args.filters || {}
              args.filters.themeId = this.$route.query.key
              let config = {
                url: commonUrls.staticresource.list,
                method: 'post',
                data: {pager, filters: args.filters, sorts}
              }
              axios.request(config).then(function (response) {
                global.store.commit('TABLE_SUCCESS', {
                  id: 'staticresource-list',
                  data: {
                    'data': response.data
                  },
                  callParameters: {pager, filters, sorts}
                })
              }).catch(function (error) {
                global.store.commit('TABLE_FAILURE', {id: 'staticresource-list', error})
              })
            }
          }.bind(this)
        }
      }
    },
    components: {
      panel, vform, vtable
    },
    created: function () {
      document.cookie = 'staticResourceBackUrl=' + this.$route.fullPath
    }
  }
</script>

<style scoped>

</style>
