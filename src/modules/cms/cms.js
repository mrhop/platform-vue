require('./cms.scss')
import utils from '../../components/common/utils'
import CKEditorConfig from './CKEditorConfig'
import Vue from 'vue'
import router from '../../router/cms'
import Vuex from 'vuex'
import App from '../../components/common/App'
import huodhVuePlugins from 'huodh-vue-plugins'
import {commonUrls} from '../../components/common/cms'
global.getCookie = utils.getCookie
global.shadeRGBColor = utils.shadeRGBColor
global.CKEditorConfig = CKEditorConfig
Vue.use(Vuex)
Vue.use(huodhVuePlugins.config)
global.store = huodhVuePlugins.generateStore()
// 首先获取到tree之后再进行页面的显示
/* eslint-disable no-new */
// 此处获取到头部的tree和按钮
var leftMenu = global.getCookie('leftmenu')
new Vue({
  el: '#app',
  data () {
    return {
      leftTree: leftMenu,
      topTree: commonUrls.topTree,
      topNavigate: commonUrls.topnavigate,
      subTitle: global.getCookie('topSubTitle')
    }
  },
  methods: {
    navigateClick (args) {
      // 注意当前页面的导向
      if (args.value === 'theme') {
        router.push(commonUrls.vuerouter.theme.list)
        this.leftTree = commonUrls.themeMenu + '?type=theme'
        document.cookie = 'topSubTitle=' + '主题管理'
        this.subTitle = '主题管理'
      } else if (args.value === 'website') {
        router.push(commonUrls.vuerouter.website.list)
        this.leftTree = commonUrls.websiteMenu + '?type=website'
        document.cookie = 'topSubTitle=' + '网站管理'
        this.subTitle = '网站管理'
      } else if (args.value === 'blocktag') {
        router.push(commonUrls.vuerouter.blockTag.list)
        this.leftTree = commonUrls.blockTagMenu + '?type=blocktag'
        document.cookie = 'topSubTitle=' + 'blockTag管理'
        this.subTitle = 'blockTag管理'
      }
      document.cookie = 'leftmenu=' + this.leftTree
    },
    topTreeClick (args) {
      if (args.type === 'theme') {
        router.push(commonUrls.vuerouter.theme.info + '/' + args.value)
        this.leftTree = commonUrls.subThemeMenu + '?type=theme&id=' + args.value
        document.cookie = 'topSubTitle=' + '主题[' + args.label + ']管理'
        this.subTitle = '主题[' + args.label + ']管理'
      } else if (args.type === 'website') {
        router.push(commonUrls.vuerouter.website.info + '/' + args.value)
        this.leftTree = commonUrls.subWebsiteMenu + '?id=' + args.value
        document.cookie = 'topSubTitle=' + '网站[' + args.label + ']管理'
        this.subTitle = '网站[' + args.label + ']管理'
      }
      document.cookie = 'leftmenu=' + this.leftTree
    }
  },
  router,
  store: global.store,
  template: '<App appName="内容" :subTitle="subTitle" :treeData="leftTree" :topTree="topTree" :topNavigate="topNavigate" v-on:topTreeClick="topTreeClick" v-on:navigateClick="navigateClick"/>',
  components: {App}
})
