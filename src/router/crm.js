import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {commonUrls} from '@/components/common/crm.js'
import Dashboard from '@/components/crm/dashboard/Dashboard'
import NotFound from '@/components/crm/dashboard/NotFound'

import AddClientLevel from '@/components/crm/client/clientlevel/Add'
import ClientLevelDetail from '@/components/crm/client/clientlevel/Detail'
import EditClientLevel from '@/components/crm/client/clientlevel/Edit'
import ClientLevelList from '@/components/crm/client/clientlevel/List'

import AddClientOrigin from '@/components/crm/client/clientorigin/Add'
import ClientOriginDetail from '@/components/crm/client/clientorigin/Detail'
import EditClientOrigin from '@/components/crm/client/clientorigin/Edit'
import ClientListOrigin from '@/components/crm/client/clientorigin/List'

import AddClient from '@/components/crm/client/client/Add'
import ClientDetail from '@/components/crm/client/client/Detail'
import EditClient from '@/components/crm/client/client/Edit'
import ClientList from '@/components/crm/client/client/List'

import AddClientTrack from '@/components/crm/client/clienttrack/Add'
import ClientDetailTrack from '@/components/crm/client/clienttrack/Detail'
import EditClientTrack from '@/components/crm/client/clienttrack/Edit'

import AddCountry from '@/components/crm/country/Add'
import CountryDetail from '@/components/crm/country/Detail'
import EditCountry from '@/components/crm/country/Edit'
import CountryList from '@/components/crm/country/List'

import AddDeliveryMethod from '@/components/crm/order/deliverymethod/Add'
import DeliveryMethodDetail from '@/components/crm/order/deliverymethod/Detail'
import EditDeliveryMethod from '@/components/crm/order/deliverymethod/Edit'
import DeliveryMethodList from '@/components/crm/order/deliverymethod/List'

import AddOrder from '@/components/crm/order/order/Add'
import OrderDetail from '@/components/crm/order/order/Detail'
import EditOrder from '@/components/crm/order/order/Edit'
import OrderList from '@/components/crm/order/order/List'

import AddOrderDiscount from '@/components/crm/order/orderdiscount/Add'
import OrderDiscountDetail from '@/components/crm/order/orderdiscount/Detail'
import EditOrderDiscount from '@/components/crm/order/orderdiscount/Edit'
import OrderDiscountList from '@/components/crm/order/orderdiscount/List'

import AddOrderStatus from '@/components/crm/order/orderstatus/Add'
import OrderStatusDetail from '@/components/crm/order/orderstatus/Detail'
import EditOrderStatus from '@/components/crm/order/orderstatus/Edit'
import OrderStatusList from '@/components/crm/order/orderstatus/List'

import AddPayType from '@/components/crm/order/paytype/Add'
import PayTypeDetail from '@/components/crm/order/paytype/Detail'
import EditPayType from '@/components/crm/order/paytype/Edit'
import PayTypeList from '@/components/crm/order/paytype/List'

import AddProduct from '@/components/crm/product/product/Add'
import ProductDetail from '@/components/crm/product/product/Detail'
import EditProduct from '@/components/crm/product/product/Edit'
import ProductList from '@/components/crm/product/product/List'

import AddProductCategory from '@/components/crm/product/productcategory/Add'
import ProductCategoryDetail from '@/components/crm/product/productcategory/Detail'
import EditProductCategory from '@/components/crm/product/productcategory/Edit'
import ProductCategoryList from '@/components/crm/product/productcategory/List'

import UserDetail from '@/components/crm/user/Detail'
import EditUser from '@/components/crm/user/Edit'
import UserList from '@/components/crm/user/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
      // beforeEnter: (to, from, next) => {
      //   let userStatus = global.store.getters.getUserStatus
      //   if (userStatus.firstPage) {
      //     if (userStatus.firstPage === '/' || userStatus.firstPage === '/dashboard') {
      //       next()
      //     } else {
      //       next(userStatus.firstPage)
      //     }
      //   } else {
      //     let config = {
      //       url: commonUrls.userStatus,
      //       method: 'get'
      //     }
      //     axios.request(config).then(function (response) {
      //       userStatus = response.data
      //       global.store.commit('setUserStatus', {userStatus})
      //       if (userStatus.firstPage) {
      //         if (userStatus.firstPage === '/' || userStatus.firstPage === '/dashboard') {
      //           next()
      //         } else {
      //           next(userStatus.firstPage)
      //         }
      //       }
      //     }).catch(function (error) {
      //       console.log(error)
      //       next('/404')
      //     })
      //   }
      // }
    },
    {
      path: '/clientlevel/add',
      name: 'AddClientLevel',
      component: AddClientLevel
    },
    {
      path: '/clientlevel/detail',
      name: 'ClientLevelDetail',
      component: ClientLevelDetail
    },
    {
      path: '/clientlevel/edit',
      name: 'EditClientLevel',
      component: EditClientLevel
    },
    {
      path: '/clientlevel/list',
      name: 'ClientLevelList',
      component: ClientLevelList
    },
    {
      path: '/clientorigin/add',
      name: 'AddClientOrigin',
      component: AddClientOrigin
    },
    {
      path: '/clientorigin/detail',
      name: 'ClientOriginDetail',
      component: ClientOriginDetail
    },
    {
      path: '/clientorigin/edit',
      name: 'EditClientOrigin',
      component: EditClientOrigin
    },
    {
      path: '/clientorigin/list',
      name: 'ClientListOrigin',
      component: ClientListOrigin
    },
    {
      path: '/client/add',
      name: 'AddClient',
      component: AddClient
    },
    {
      path: '/client/detail',
      name: 'ClientDetail',
      component: ClientDetail
    },
    {
      path: '/client/edit',
      name: 'EditClient',
      component: EditClient
    },
    {
      path: '/client/list',
      name: 'ClientList',
      component: ClientList
    },
    {
      path: '/clienttrack/add',
      name: 'AddClientTrack',
      component: AddClientTrack
    },
    {
      path: '/clienttrack/detail',
      name: 'ClientDetailTrack',
      component: ClientDetailTrack
    },
    {
      path: '/clienttrack/edit',
      name: 'EditClientTrack',
      component: EditClientTrack
    },
    {
      path: '/country/add',
      name: 'AddCountry',
      component: AddCountry
    },
    {
      path: '/country/detail',
      name: 'CountryDetail',
      component: CountryDetail
    },
    {
      path: '/country/edit',
      name: 'EditCountry',
      component: EditCountry
    },
    {
      path: '/country/list',
      name: 'CountryList',
      component: CountryList
    },
    {
      path: '/deliverymethod/add',
      name: 'AddDeliveryMethod',
      component: AddDeliveryMethod
    },
    {
      path: '/deliverymethod/detail',
      name: 'DeliveryMethodDetail',
      component: DeliveryMethodDetail
    },
    {
      path: '/deliverymethod/edit',
      name: 'EditDeliveryMethod',
      component: EditDeliveryMethod
    },
    {
      path: '/deliverymethod/list',
      name: 'DeliveryMethodList',
      component: DeliveryMethodList
    },
    {
      path: '/order/add',
      name: 'AddOrder',
      component: AddOrder
    },
    {
      path: '/order/detail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/order/edit',
      name: 'EditOrder',
      component: EditOrder,
      beforeEnter: (to, from, next) => {
        // 将值设置给state
        let config = {
          url: commonUrls.order.status,
          params: {
            key: to.query.key
          },
          method: 'get'
        }
        axios.request(config).then(function (response) {
          global.store.commit('setOrderStatusCode', {code: response.data})
          next()
        })
      }
    },
    {
      path: '/order/list',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/orderdiscount/add',
      name: 'AddOrderDiscount',
      component: AddOrderDiscount
    },
    {
      path: '/orderdiscount/detail',
      name: 'OrderDiscountDetail',
      component: OrderDiscountDetail
    },
    {
      path: '/orderdiscount/edit',
      name: 'EditOrderDiscount',
      component: EditOrderDiscount
    },
    {
      path: '/orderdiscount/list',
      name: 'OrderDiscountList',
      component: OrderDiscountList
    },
    {
      path: '/orderstatus/add',
      name: 'AddOrderStatus',
      component: AddOrderStatus
    },
    {
      path: '/orderstatus/detail',
      name: 'OrderStatusDetail',
      component: OrderStatusDetail
    },
    {
      path: '/orderstatus/edit',
      name: 'EditOrderStatus',
      component: EditOrderStatus
    },
    {
      path: '/orderstatus/list',
      name: 'OrderStatusList',
      component: OrderStatusList
    },
    {
      path: '/paytype/add',
      name: 'AddPayType',
      component: AddPayType
    },
    {
      path: '/paytype/detail',
      name: 'PayTypeDetail',
      component: PayTypeDetail
    },
    {
      path: '/paytype/edit',
      name: 'EditPayType',
      component: EditPayType
    },
    {
      path: '/paytype/list',
      name: 'PayTypeList',
      component: PayTypeList
    },
    {
      path: '/product/add',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/product/detail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/product/edit',
      name: 'EditProduct',
      component: EditProduct
    },
    {
      path: '/product/list',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/productcategory/add',
      name: 'AddProductCategory',
      component: AddProductCategory
    },
    {
      path: '/productcategory/detail',
      name: 'ProductCategoryDetail',
      component: ProductCategoryDetail
    },
    {
      path: '/productcategory/edit',
      name: 'EditProductCategory',
      component: EditProductCategory
    },
    {
      path: '/productcategory/list',
      name: 'ProductCategoryList',
      component: ProductCategoryList
    },
    {
      path: '/user/detail',
      name: 'UserDetail',
      component: UserDetail
    },
    {
      path: '/user/edit',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/user/list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/*',
      name: 'All',
      component: NotFound
    }
  ]
})
