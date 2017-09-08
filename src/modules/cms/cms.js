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
// 此处获取到头部的tree和按钮
new Vue({
  el: '#app',
  data () {
    return {
      leftTree: null,
      topTree: commonUrls.topTree,
      topNavigate: commonUrls.topnavigate
    }
  },
  methods: {
    navigateClick (args) {
      // 注意当前页面的导向
      if (args.value === 'theme') {
        router.push(commonUrls.vuerouter.theme.dashboard)
        this.leftTree = commonUrls.themeMenu + '?type=theme'
      } else if (args.value === 'website') {
        router.push(commonUrls.vuerouter.website.dashboard)
        this.leftTree = commonUrls.websiteMenu + '?type=website'
      }
    },
    topTreeClick (args) {
      console.log('you got here1')
      if (args.type === 'theme') {
        this.leftTree = commonUrls.subThemeMenu + '?type=theme&id=' + args.value
      } else if (args.type === 'website') {
        this.leftTree = commonUrls.subWebsiteMenu + '?type=website&id=' + args.value
      }
    }
  },
  router,
  store: global.store,
  template: '<App appName="内容"  :treeData="leftTree" :topTree="topTree" :topNavigate="topNavigate" v-on:topTreeClick="topTreeClick" v-on:navigateClick="navigateClick"/>',
  components: {App}
})
