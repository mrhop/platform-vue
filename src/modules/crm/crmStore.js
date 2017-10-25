/**
 * Created by Donghui Huo on 2017/10/20.
 */
export default {
  state: {
    crm: {
      orderStatusCode: null,
      userStatus: {
        isAdmin: false,
        firstPage: undefined
      }
    }
  },
  getters: {
    getOrderStatusCode (state) {
      return state.crm.orderStatusCode
    },
    getUserStatus (state) {
      return state.crm.userStatus
    }
  },
  mutations: {
    setOrderStatusCode (state, {code}) {
      state.crm.orderStatusCode = code
    },
    setUserStatus (state, {userStatus}) {
      state.crm.userStatus = userStatus
    }
  }
}
