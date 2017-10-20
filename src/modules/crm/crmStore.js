/**
 * Created by Donghui Huo on 2017/10/20.
 */
export default {
  state: {
    crm: {
      orderStatusCode: null
    }
  },
  getters: {
    getOrderStatusCode (state) {
      return state.crm.orderStatusCode
    }
  },
  mutations: {
    setOrderStatusCode (state, {code}) {
      state.crm.orderStatusCode = code
    }
  }
}
