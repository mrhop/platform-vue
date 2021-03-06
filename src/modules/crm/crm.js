require('./crm.scss')
import utils from '../../components/common/utils'
import Vue from 'vue'
import router from '../../router/crm'
import Vuex from 'vuex'
import App from '../../components/common/App'
import huodhVuePlugins from 'huodh-vue-plugins'
import crmStore from './crmStore'
import {commonUrls} from '../../components/common/crm'
global.getCookie = utils.getCookie

Vue.use(Vuex)
Vue.use(huodhVuePlugins.config)
global.store = huodhVuePlugins.generateStore({additionalModules: {crm: crmStore}})
// 首先获取到tree之后再进行页面的显示
/* eslint-disable no-new */
// 此处获取到头部的tree和按钮
var leftMenu = commonUrls.leftTree
new Vue({
  el: '#app',
  data () {
    return {
      leftTree: leftMenu
    }
  },
  methods: {},
  router,
  store: global.store,
  template: '<App appName="客户关系" :treeData="leftTree"/>',
  components: {App}
})
