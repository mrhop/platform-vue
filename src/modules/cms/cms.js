require('./cms.scss')

import Vue from 'vue'
import router from '../../router/cms'
import Vuex from 'vuex'
import App from '../../components/common/App'
import huodhVuePlugins from 'huodh-vue-plugins'
import {commonUrls} from '../../components/common/cms'
Vue.use(Vuex)
Vue.use(huodhVuePlugins.config)
global.store = huodhVuePlugins.generateStore()
// 首先获取到tree之后再进行页面的显示
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      leftTree: commonUrls.leftTree
    }
  },
  router,
  store: global.store,
  template: '<App appName="内容" :treeData="leftTree"/>',
  components: {App}
})
