import Vue from 'vue'
import router from '../../router/user'
import Vuex from 'vuex'
import App from '../../components/common/App'
import huodhVuePlugins from 'huodh-vue-plugins'
import {commonUrls} from '../../components/common/user'
Vue.use(Vuex)
Vue.use(huodhVuePlugins.config)
const store = huodhVuePlugins.generateStore()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      leftTree: commonUrls.leftTree
    }
  },
  router,
  store,
  template: '<App appName="用户" :treeData="leftTree"/>',
  components: {App}
})
