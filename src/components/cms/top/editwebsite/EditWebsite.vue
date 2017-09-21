<template>
  <div class="form-website-detail form-detail">
    <panel>
      <h1 slot="header">更新网站</h1>
      <vform id="website-update-form" :actions="actions" :actionUrls="actionUrls"></vform>
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
    url: commonUrls.website.rulechange,
    method: 'get'
  }
  let initConfig = {
    url: commonUrls.website.info,
    method: 'get'
  }
  export default {
    data () {
      return {
        actionUrls: {
          backupUrl: commonUrls.vuerouter.website.list,
          saveUrl: commonUrls.website.update,
          afterSaveUrl: commonUrls.vuerouter.website.list
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
                      'label': '网站名称',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '网站名称在2-40个字符之间，且前后不能有空格',
                        'regex': '^\\S.{0,38}\\S$'
                      }],
                      'defaultValue': response.data.name,
                      'placeholder': '网站名称'
                    },
                    {
                      'name': 'websiteId',
                      'label': '网站ID',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.websiteId,
                      'placeholder': '网站ID'
                    },
                    {
                      'name': 'themeName',
                      'label': '关联主题',
                      'type': 'text',
                      locked: true,
                      'defaultValue': response.data.themeName
                    },
                    {
                      'name': 'url',
                      'label': '网站地址',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '请填写符合格式的网站地址',
                        'regex': '^http(s)?://[\\w-.]+(:[\\d]+)?(/[\\w-.#]*)*(/[\\w-.\\?%&=]*)?$'
                      }],
                      'placeholder': '网站地址',
                      'defaultValue': response.data.url
                    },
                    {
                      'name': 'title',
                      'label': '网站标题',
                      'type': 'text',
                      'placeholder': '网站标题',
                      'defaultValue': response.data.title
                    },
                    {
                      'name': 'subtitle',
                      'label': '网站子标题',
                      'type': 'text',
                      'placeholder': '网站子标题',
                      'defaultValue': response.data.subtitle
                    },
                    {
                      'name': 'phone',
                      'label': '电话',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '请输入正确的手机号',
                        'regex': '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|(17|18)[0|1|2|3|5|6|7|8|9])\\d{8}$'
                      }],
                      'placeholder': '手机号',
                      required: false,
                      'defaultValue': response.data.phone
                    },
                    {
                      'name': 'email',
                      'label': 'Email',
                      'type': 'text',
                      'validate': [{
                        'errorMsg': '请输入正确的Email',
                        'regex': '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                      }],
                      'placeholder': 'Email',
                      required: false,
                      'defaultValue': response.data.email
                    },
                    {
                      'name': 'relatedUsers',
                      'label': '关联用户',
                      'type': 'checkbox',
                      'defaultValue': response.data.relatedUsers ? response.data.relatedUsers : [],
                      items: responseInner.data.relatedUsers,
                      required: false
                    },
                    {
                      'name': 'screenshotFiles',
                      'label': '网站截图',
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
                global.store.commit('FORM_SUCCESS', {
                  id: 'website-update-form',
                  data: {
                    rules
                  }
                })
              }).catch(function (error) {
                global.store.commit('FORM_FAILURE', {
                  id: 'website-update-form',
                  error
                })
              })
            }).catch(function (error) {
              global.store.commit('FORM_FAILURE', {
                id: 'website-update-form',
                error
              })
            })
          }
        },
        staticresourceActionUrls: {
          addUrl: commonUrls.vuerouter.staticresource.add + '?websiteId=' + this.$route.query.key,
          detailUrl: commonUrls.vuerouter.staticresource.detail,
          infoUrl: commonUrls.vuerouter.staticresource.edit,
          deleteUrl: commonUrls.staticresource.delete
        },
        staticresourceActions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = {websiteId: this.$route.query.key}
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
