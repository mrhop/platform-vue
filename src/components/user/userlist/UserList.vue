<template>
  <div class="user-list">
    <panel>
      <h1 slot="header">用户列表</h1>
      <vtable :id="1" :editable="true" :actionUrls="actionUrls" :actions="actions"></vtable>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/user'
  let panel = huodhVuePlugins.panel
  let tab = huodhVuePlugins.tab
  let vtable = huodhVuePlugins.vtable
  export default{
    data () {
      return {
        actionUrls: {
          addUrl: commonUrls.vuerouter.adduser,
          detailUrl: commonUrls.vuerouter.userdetail,
          infoUrl: commonUrls.vuerouter.edituser
        },
        actions: {
          list: function (args) {
            var pager = args.pager
            var init = args.init
            var filters = args.filters
            var sorts = args.sorts
            if (init) {
              // 初始化
              // 初始化获取data
              var config = {
                url: commonUrls.userList,
                method: 'post',
                data: {pager, init: true}
              }
              axios.request(config).then(function (response) {
                // 如何将数据回传？
              })
              return {
                'rules': {
                  'header': [
                    {
                      'name': '#sn',
                      'title': '#sn'
                    },
                    {
                      'name': 'username',
                      'title': '账号',
                      'type': 'text',
                      'filter': true,
                      'sortable': true
                    },
                    {
                      'name': 'name',
                      'title': '姓名',
                      'type': 'text',
                      'filter': true
                    },
                    {
                      'name': 'email',
                      'title': 'Email',
                      'type': 'text',
                      'filter': true
                    },
                    {
                      'name': 'phone',
                      'title': '手机',
                      'type': 'text',
                      'filter': true
                    },
                    {
                      'name': 'enabled',
                      'title': '已激活',
                      'type': 'select',
                      'editable': true,
                      'filter': true,
                      'sortable': true,
                      'items': [
                        {
                          'label': '是',
                          'value': true
                        },
                        {
                          'label': '否',
                          'value': false
                        }
                      ]
                    },
                    {
                      'name': 'createUser',
                      'title': '创建人',
                      'type': 'text'
                    },
                    {
                      'name': 'createdDate',
                      'title': '创建日期',
                      'type': 'date',
                      'sortable': true
                    }
                  ],
                  'action': {
                    'add': true,
                    'detail': true,
                    'update': true,
                    'delete': true
                  },
                  'feature': {
                    'filter': true,
                    'pager': true
                  }
                },
                'data': {
                  'rows': null,
                  'totalCount': 0,
                  pager
                }
              }
            } else {
              return {
                'data': {
                  'rows': null,
                  'totalCount': 0,
                  pager,
                  filters,
                  sorts
                }
              }
            }
          },
          delete: function (args) {
            console.log('do delete by actions delete function')
            // var id = parseInt(args.key)
          },
          edit: function (args) {
            console.log('this is for editing')
            if (args && args.headerItem && (args.headerItem.type === 'file' || args.headerItem.type === 'image')) {
              return 'http://www.hopever.cn/mogilefs/images/user/photo/14817789496788475104059462733375755.jpg'
            }
          }
        }
      }
    },
    components: {
      panel, tab, vtable
    }
  }
</script>

<style scoped>

</style>
