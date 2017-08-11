import Vue from 'vue'
import router from '../../router/login'
import Vuex from 'vuex'
import App from './App'
import huodhVuePlugins from 'huodh-vue-plugins'

Vue.use(Vuex)
Vue.use(huodhVuePlugins.config)
global.store = huodhVuePlugins.generateStore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: global.store,
  template: '<App/>',
  components: {App}
})
