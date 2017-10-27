/**
 * Created by Donghui Huo on 2017/3/21.
 */
let basePath = 'http://localhost:9093/'
var commonUrls = {
  leftTree: basePath + 'leftmenu',
  // leftTree: 'static/demo-data/crm/lefttree.json',
  userStatus: basePath + 'userstatus',
  dashBoard: {
    options: basePath + 'dashboard/options',
    clientOrigin: basePath + 'dashboard/clientorigin',
    country: basePath + 'dashboard/country',
    clientAmount: basePath + 'dashboard/clientamount',
    userAmount: basePath + 'dashboard/useramount',
    orderSum: basePath + 'dashboard/ordersum',
    userOrder: basePath + 'dashboard/userordersum',
    newClient: basePath + 'dashboard/newclient',
    clientTrace: basePath + 'dashboard/clienttrace'
  },
  clientLevel: {
    list: basePath + 'clientlevel/list',
    info: basePath + 'clientlevel/info',
    update: basePath + 'clientlevel/update',
    save: basePath + 'clientlevel/save',
    delete: basePath + 'clientlevel/delete'
  },
  clientOrigin: {
    list: basePath + 'clientorigin/list',
    info: basePath + 'clientorigin/info',
    update: basePath + 'clientorigin/update',
    save: basePath + 'clientorigin/save',
    delete: basePath + 'clientorigin/delete'
  },
  client: {
    list: basePath + 'client/list',
    info: basePath + 'client/info',
    update: basePath + 'client/update',
    save: basePath + 'client/save',
    delete: basePath + 'client/delete',
    rulechange: basePath + 'client/form/rulechange'
  },
  clientTrack: {
    list: basePath + 'clienttrack/list',
    info: basePath + 'clienttrack/info',
    update: basePath + 'clienttrack/update',
    save: basePath + 'clienttrack/save',
    delete: basePath + 'clienttrack/delete',
    rulechange: basePath + 'clienttrack/form/rulechange'
  },
  country: {
    list: basePath + 'country/list',
    info: basePath + 'country/info',
    update: basePath + 'country/update',
    save: basePath + 'country/save',
    delete: basePath + 'country/delete'
  },
  deliveryMethod: {
    list: basePath + 'deliverymethod/list',
    info: basePath + 'deliverymethod/info',
    update: basePath + 'deliverymethod/update',
    save: basePath + 'deliverymethod/save',
    delete: basePath + 'deliverymethod/delete'
  },
  order: {
    list: basePath + 'order/list',
    info: basePath + 'order/info',
    update: basePath + 'order/update',
    save: basePath + 'order/save',
    delete: basePath + 'order/delete',
    rulechange: basePath + 'order/form/rulechange',
    status: basePath + 'order/status',
    priceestimate: basePath + 'order/price/estimate'
  },
  orderDiscount: {
    list: basePath + 'orderdiscount/list',
    info: basePath + 'orderdiscount/info',
    update: basePath + 'orderdiscount/update',
    save: basePath + 'orderdiscount/save',
    delete: basePath + 'orderdiscount/delete',
    rulechange: basePath + 'orderdiscount/form/rulechange'
  },
  orderProduct: {
    list: basePath + 'orderproduct/list',
    updatenum: basePath + 'orderproduct/updatenum',
    save: basePath + 'orderproduct/save',
    delete: basePath + 'orderproduct/delete'
  },
  orderStatus: {
    list: basePath + 'orderstatus/list',
    info: basePath + 'orderstatus/info',
    update: basePath + 'orderstatus/update',
    save: basePath + 'orderstatus/save',
    delete: basePath + 'orderstatus/delete'
  },
  payType: {
    list: basePath + 'paytype/list',
    info: basePath + 'paytype/info',
    update: basePath + 'paytype/update',
    save: basePath + 'paytype/save',
    delete: basePath + 'paytype/delete'
  },
  product: {
    list: basePath + 'product/list',
    info: basePath + 'product/info',
    update: basePath + 'product/update',
    save: basePath + 'product/save',
    delete: basePath + 'product/delete',
    rulechange: basePath + 'product/form/rulechange'
  },
  productCategory: {
    list: basePath + 'productcategory/list',
    info: basePath + 'productcategory/info',
    update: basePath + 'productcategory/update',
    save: basePath + 'productcategory/save',
    delete: basePath + 'productcategory/delete'
  },
  productPriceHistory: {
    list: basePath + 'productpricehistory/list'
  },
  user: {
    list: basePath + 'relateduser/list',
    info: basePath + 'relateduser/info',
    update: basePath + 'relateduser/update',
    validate: basePath + 'relateduser/validate'
  },
  vuerouter: {
    clientLevel: {
      list: '/clientlevel/list',
      add: '/clientlevel/add',
      edit: '/clientlevel/edit',
      detail: '/clientlevel/detail'
    },
    clientOrigin: {
      list: '/clientorigin/list',
      add: '/clientorigin/add',
      edit: '/clientorigin/edit',
      detail: '/clientorigin/detail'
    },
    client: {
      list: '/client/list',
      add: '/client/add',
      edit: '/client/edit',
      detail: '/client/detail'
    },
    clientTrack: {
      add: '/clienttrack/add',
      edit: '/clienttrack/edit',
      detail: '/clienttrack/detail'
    },
    country: {
      list: '/country/list',
      add: '/country/add',
      edit: '/country/edit',
      detail: '/country/detail'
    },
    deliveryMethod: {
      list: '/deliverymethod/list',
      add: '/deliverymethod/add',
      edit: '/deliverymethod/edit',
      detail: '/deliverymethod/detail'
    },
    order: {
      list: '/order/list',
      add: '/order/add',
      edit: '/order/edit',
      detail: '/order/detail'
    },
    orderDiscount: {
      list: '/orderdiscount/list',
      add: '/orderdiscount/add',
      edit: '/orderdiscount/edit',
      detail: '/orderdiscount/detail'
    },
    orderStatus: {
      list: '/orderstatus/list',
      add: '/orderstatus/add',
      edit: '/orderstatus/edit',
      detail: '/orderstatus/detail'
    },
    payType: {
      list: '/paytype/list',
      add: '/paytype/add',
      edit: '/paytype/edit',
      detail: '/paytype/detail'
    },
    product: {
      list: '/product/list',
      add: '/product/add',
      edit: '/product/edit',
      detail: '/product/detail'
    },
    productCategory: {
      list: '/productcategory/list',
      add: '/productcategory/add',
      edit: '/productcategory/edit',
      detail: '/productcategory/detail'
    },
    user: {
      list: '/user/list',
      edit: '/user/edit',
      detail: '/user/detail'
    }
  }
}
export {
  commonUrls
}
