require('./file.scss')

import utils from '../../components/common/utils'
import Vue from 'vue'
import router from '../../router/file'
import Vuex from 'vuex'
import huodhVuePlugins from 'huodh-vue-plugins'
Vue.use(Vuex)
Vue.use(huodhVuePlugins.config)
global.getCookie = utils.getCookie
global.store = huodhVuePlugins.generateStore()
// 首先获取到tree之后再进行页面的显示
/* eslint-disable no-new */
// 此处获取到头部的tree和按钮
new Vue({
  el: '#app',
  router,
  store: global.store,
  template: '<router-view></router-view>'
})
