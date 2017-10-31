<template>
  <div class="dashboard">
    <panel v-if="isAdmin" col="6" :canHide="true">
      <h1 slot="header">客户来源分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label>订单金额下限</label>
            <formElement id="orderAmount" :options="charts.clientOrigin.formFilters.orderAmount"
                         :dataFromParent="charts.clientOrigin.filters"
                         v-on:ruleChange="charts.clientOrigin.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.clientOrigin.chartConfig"
                :chartTrigger="charts.clientOrigin.chartTrigger"/>
        <!--【过滤，订单金额数】-->
        <!--饼图 【客户数，来源】-->
      </div>
    </panel>
    <panel v-if="isAdmin" col="6" :canHide="true">
      <h1 slot="header">关联国家分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.country.formFilters.beginDate"
                         :dataFromParent="charts.country.filters"
                         v-on:ruleChange="charts.country.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.country.formFilters.endDate"
                         :dataFromParent="charts.country.filters"
                         v-on:ruleChange="charts.country.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.country.chartConfig"
                :chartTrigger="charts.country.chartTrigger"/>
        <!--【过滤，时间段】-->
        <!--订单数量【完成】，金额，客户关联国家柱状图-->
      </div>
    </panel>
    <panel v-if="isAdmin" col="6" :canHide="true">
      <h1 slot="header">客户成交额分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.clientAmount.formFilters.beginDate"
                         :dataFromParent="charts.clientAmount.filters"
                         v-on:ruleChange="charts.clientAmount.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.clientAmount.formFilters.endDate"
                         :dataFromParent="charts.clientAmount.filters"
                         v-on:ruleChange="charts.clientAmount.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.clientAmount.chartConfig"
                :chartTrigger="charts.clientAmount.chartTrigger"/>
        <!--【过滤，时间段】-->
        <!--客户成交金额 饼图-->
      </div>
    </panel>
    <panel v-if="isAdmin" col="6" :canHide="true">
      <h1 slot="header">用户成交额分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.userAmount.formFilters.beginDate"
                         :dataFromParent="charts.userAmount.filters"
                         v-on:ruleChange="charts.userAmount.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.userAmount.formFilters.endDate"
                         :dataFromParent="charts.userAmount.filters"
                         v-on:ruleChange="charts.userAmount.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.userAmount.chartConfig"
                :chartTrigger="charts.userAmount.chartTrigger"/>
        <!--【过滤，时间段】-->
        <!--每个用户成交金额 饼图-->
      </div>
    </panel>
    <panel v-if="isAdmin" col="6" :canHide="true">
      <h1 slot="header">客户成交状况分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label>客户名</label>
            <formElement id="client" :options="charts.orderSum.formFilters.client"
                         :dataFromParent="charts.orderSum.filters"
                         v-on:ruleChange="charts.orderSum.filterFun"></formElement>
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.orderSum.formFilters.beginDate"
                         :dataFromParent="charts.orderSum.filters"
                         v-on:ruleChange="charts.orderSum.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.orderSum.formFilters.endDate"
                         :dataFromParent="charts.orderSum.filters"
                         v-on:ruleChange="charts.orderSum.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.orderSum.chartConfig"
                :chartTrigger="charts.orderSum.chartTrigger"/>
        <!--【过滤，时间段，客户】-->
        <!--成交订单数量，金额折线图，多折线【数量和金额】-->
      </div>
    </panel>
    <panel col="6" :canHide="true">
      <h1 slot="header">用户成交状况分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label v-if="charts.userOrder.formFilters.users">用户名</label>
            <formElement v-if="charts.userOrder.formFilters.users" :options="charts.userOrder.formFilters.users"
                         :dataFromParent="charts.userOrder.filters"
                         v-on:ruleChange="charts.userOrder.filterFun"></formElement>
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.userOrder.formFilters.beginDate"
                         :dataFromParent="charts.userOrder.filters"
                         v-on:ruleChange="charts.userOrder.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.userOrder.formFilters.endDate"
                         :dataFromParent="charts.userOrder.filters"
                         v-on:ruleChange="charts.userOrder.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.userOrder.chartConfig"
                :chartTrigger="charts.userOrder.chartTrigger"/>
        <!--【时间过滤】，【查询类型（订单数，订单金额）】-->
        <!--成交订单，多折线【针对不同的用户】-->
      </div>
    </panel>
    <panel col="6" :canHide="true">
      <h1 slot="header">新增客户状况</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label v-if="charts.newClient.formFilters.users">用户名</label>
            <formElement v-if="charts.newClient.formFilters.users" :options="charts.newClient.formFilters.users"
                         :dataFromParent="charts.newClient.filters"
                         v-on:ruleChange="charts.newClient.filterFun"></formElement>
            <label>客户级别</label>
            <formElement id="clientLevel" :options="charts.newClient.formFilters.clientLevel"
                         :dataFromParent="charts.newClient.filters"
                         v-on:ruleChange="charts.newClient.filterFun"></formElement>
          </div>
          <div class="form-group">
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.newClient.formFilters.beginDate"
                         :dataFromParent="charts.newClient.filters"
                         v-on:ruleChange="charts.newClient.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.newClient.formFilters.endDate"
                         :dataFromParent="charts.newClient.filters"
                         v-on:ruleChange="charts.newClient.filterFun"></formElement>

          </div>
        </div>
        <vchart :chartConfig="charts.newClient.chartConfig"
                :chartTrigger="charts.newClient.chartTrigger"/>
        <!--【客户级别，时间过滤】-->
        <!--新增客户数，多折线【针对不同的用户】-->
      </div>
    </panel>
    <panel col="6" :canHide="true">
      <h1 slot="header">客户追踪状况分析</h1>
      <div>
        <div class="form-filter">
          <div class="form-group">
            <label v-if="charts.clientTrace.formFilters.users">用户名</label>
            <formElement v-if="charts.clientTrace.formFilters.users" :options="charts.clientTrace.formFilters.users"
                         :dataFromParent="charts.clientTrace.filters"
                         v-on:ruleChange="charts.clientTrace.filterFun"></formElement>
            <label>客户名</label>
            <formElement id="client" :options="charts.clientTrace.formFilters.client"
                         :dataFromParent="charts.clientTrace.filters"
                         v-on:ruleChange="charts.clientTrace.filterFun"></formElement>
          </div>
          <div class="form-group">
            <label>起始日期</label>
            <formElement id="beginDate" :options="charts.clientTrace.formFilters.beginDate"
                         :dataFromParent="charts.clientTrace.filters"
                         v-on:ruleChange="charts.clientTrace.filterFun"></formElement>
            <label>结束日期</label>
            <formElement id="endDate" :options="charts.clientTrace.formFilters.endDate"
                         :dataFromParent="charts.clientTrace.filters"
                         v-on:ruleChange="charts.clientTrace.filterFun"></formElement>
          </div>
        </div>
        <vchart :chartConfig="charts.clientTrace.chartConfig"
                :chartTrigger="charts.clientTrace.chartTrigger"/>
        <!--【客户名称【当没有客户名称时，是同一时间总的追踪数量】*，时间过滤】-->
        <!--客户追踪记录，多折线【针对不同的用户】-->
      </div>
    </panel>
  </div>
</template>

<script>
  import axios from 'axios'
  import lodash from 'lodash'
  import Chart from 'chart.js'
  import moment from 'moment'
  import huodhVuePlugins from 'huodh-vue-plugins'
  import {commonUrls} from '../../common/crm'
  let panel = huodhVuePlugins.panel
  let vchart = huodhVuePlugins.vchart
  let formElement = huodhVuePlugins.formElement

  let clientOptionConfig = {
    url: commonUrls.dashBoard.options,
    method: 'get'
  }
  let clientOriginConfig = {
    url: commonUrls.dashBoard.clientOrigin,
    method: 'post',
    data: {}
  }
  let countryConfig = {
    url: commonUrls.dashBoard.country,
    method: 'post',
    data: {}
  }
  let clientAmountConfig = {
    url: commonUrls.dashBoard.clientAmount,
    method: 'post',
    data: {}
  }
  let userAmountConfig = {
    url: commonUrls.dashBoard.userAmount,
    method: 'post',
    data: {}
  }
  let orderSumConfig = {
    url: commonUrls.dashBoard.orderSum,
    method: 'post',
    data: {}
  }
  let userOrderConfig = {
    url: commonUrls.dashBoard.userOrder,
    method: 'post',
    data: {}
  }
  let newClientConfig = {
    url: commonUrls.dashBoard.newClient,
    method: 'post',
    data: {}
  }
  let clientTraceConfig = {
    url: commonUrls.dashBoard.clientTrace,
    method: 'post',
    data: {}
  }
  /* eslint-disable */
  let randomScalingFactor = function () {
    return Math.round(Math.random() * 100)
  }
  let timeFormat = 'YYYY/MM/DD'

  /* eslint-disable */
  function newDate(days) {
    return moment().add(days, 'd').toDate()
  }

  /* eslint-disable */
  function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat)
  }
  export default {
    data () {
      return {
        isAdmin: global.store.getters.getUserStatus.isAdmin,
        charts: this.initData()
      }
    },
    methods: {
      initData () {
        let isAdmin = global.store.getters.getUserStatus.isAdmin
        let charts = {}
        if (isAdmin) {
          charts.clientOrigin = {
            formFilters: {
              orderAmount: {
                label: '订单金额下限',
                name: 'orderAmount',
                type: 'text',
                required: false,
                ruleChange: true,
                placeholder: '订单金额下限',
                'validate': [{
                  'errorMsg': '请输入整数或者2小数位的小数',
                  'regex': '^((\\d+)|((\\d*)\\.\\d{1,2}))$'
                }]
              }
            },
            filters: {},
            filterFun: function () {
              this.charts.clientOrigin.lastInputTime = new Date()
              lodash.debounce(function () {
                let date = new Date()
                if ((date.getTime() - this.charts.clientOrigin.lastInputTime.getTime()) > 999) {
                  let data = this.charts.clientOrigin.filters
                  if (data.orderAmount != undefined && data.orderAmount != null && data.orderAmount != '') {
                    clientOriginConfig.data.orderAmount = data.orderAmount
                  } else {
                    delete clientOriginConfig.data.orderAmount
                  }
                  this.getClientOrigin()
                  console.log(this.charts.clientOrigin.filters.orderSum)
                }
              }.bind(this), 1000)()
            }.bind(this),
            chartConfig: {
              type: 'pie',
              data: {
                datasets: [{
                  data: [],
                  backgroundColor: [],
                  label: '客户来源分析'
                }],
                labels: []
              }
            },
            chartTrigger: false
          }
          charts.country = {
            formFilters: {
              beginDate: {
                label: '起始日期',
                name: 'beginDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '起始日期'
              },
              endDate: {
                label: '结束日期',
                name: 'endDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '结束日期'
              }
            },
            filters: {},
            filterFun: function () {
              this.charts.country.lastInputTime = new Date()
              lodash.debounce(function () {
                let date = new Date()
                if ((date.getTime() - this.charts.country.lastInputTime.getTime()) > 999) {
                  let data = this.charts.country.filters
                  if (data.beginDate != undefined && data.beginDate != null) {
                    countryConfig.data.beginDate = data.beginDate
                  } else {
                    delete countryConfig.data.beginDate
                  }
                  if (data.endDate != undefined && data.endDate != null) {
                    countryConfig.data.endDate = data.endDate
                  } else {
                    delete countryConfig.data.endDate
                  }
                  this.getCountry()
                  console.log(this.charts.country.filters.beginDate + this.charts.country.filters.endDate)
                }
              }.bind(this), 1000)()
            }.bind(this),
            chartConfig: {
              type: 'bar',
              data: {
                labels: [],
                datasets: [{
                  label: '客户数',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[0]).rgbString(),
                  data: []
                }, {
                  label: '订单总额',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[1]).rgbString(),
                  data: []
                }, {
                  label: '订单数',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[2]).rgbString(),
                  data: []
                }]
              },
              options: {
                responsive: true,
                title: {
                  display: true,
                  text: '关联国家分析'
                },
                tooltips: {
                  mode: 'index',
                  intersect: true
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            },
            chartTrigger: false
          }
          charts.clientAmount = {
            formFilters: {
              beginDate: {
                label: '起始日期',
                name: 'beginDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '起始日期'
              },
              endDate: {
                label: '结束日期',
                name: 'endDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '结束日期'
              }
            },
            filters: {},
            filterFun: function (data) {
              this.charts.clientAmount.lastInputTime = new Date()
              lodash.debounce(function () {
                let date = new Date()
                if ((date.getTime() - this.charts.clientAmount.lastInputTime.getTime()) > 999) {
                  let data = this.charts.clientAmount.filters
                  if (data.beginDate != undefined && data.beginDate != null) {
                    clientAmountConfig.data.beginDate = data.beginDate
                  } else {
                    delete clientAmountConfig.data.beginDate
                  }
                  if (data.endDate != undefined && data.endDate != null) {
                    clientAmountConfig.data.endDate = data.endDate
                  } else {
                    delete clientAmountConfig.data.endDate
                  }
                  this.getClientAmount()
                  console.log(this.charts.clientAmount.filters.beginDate + this.charts.clientAmount.filters.endDatedDate)
                }
              }.bind(this), 1000)()
            }.bind(this),
            chartConfig: {
              type: 'pie',
              data: {
                datasets: [{
                  data: [],
                  backgroundColor: [],
                  label: '客户成交额分析'
                }],
                labels: []
              }
            },
            chartTrigger: false
          }
          charts.userAmount = {
            formFilters: {
              beginDate: {
                label: '起始日期',
                name: 'beginDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '起始日期'
              },
              endDate: {
                label: '结束日期',
                name: 'endDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '结束日期'
              }
            },
            filters: {},
            filterFun: function (data) {
              this.charts.userAmount.lastInputTime = new Date()
              lodash.debounce(function () {
                let date = new Date()
                if ((date.getTime() - this.charts.userAmount.lastInputTime.getTime()) > 999) {
                  let data = this.charts.userAmount.filters
                  if (data.beginDate != undefined && data.beginDate != null) {
                    userAmountConfig.data.beginDate = data.beginDate
                  } else {
                    delete userAmountConfig.data.beginDate
                  }
                  if (data.endDate != undefined && data.endDate != null) {
                    userAmountConfig.data.endDate = data.endDate
                  } else {
                    delete userAmountConfig.data.endDate
                  }
                  this.getUserAmount()
                  console.log(this.charts.userAmount.filters.beginDate + this.charts.userAmount.filters.endDatedDate)
                }
              }.bind(this), 1000)()
            }.bind(this),
            chartConfig: {
              type: 'pie',
              data: {
                datasets: [{
                  data: [],
                  backgroundColor: [],
                  label: '用户成交额分析'
                }],
                labels: []
              }
            },
            chartTrigger: false
          }
          charts.orderSum = {
            formFilters: {
              client: {
                label: '客户名',
                name: 'client',
                type: 'select',
                required: false,
                ruleChange: true
              },
              beginDate: {
                label: '起始日期',
                name: 'beginDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '起始日期'
              },
              endDate: {
                label: '结束日期',
                name: 'endDate',
                type: 'date',
                required: false,
                ruleChange: true,
                placeholder: '结束日期'
              }
            },
            filters: {},
            filterFun: function (data) {
              this.charts.orderSum.lastInputTime = new Date()
              lodash.debounce(function () {
                let date = new Date()
                if ((date.getTime() - this.charts.orderSum.lastInputTime.getTime()) > 999) {
                  let data = this.charts.orderSum.filters
                  if (data.client != undefined && data.client != null) {
                    orderSumConfig.data.client = data.client
                  } else {
                    delete orderSumConfig.data.client
                  }
                  if (data.beginDate != undefined && data.beginDate != null) {
                    orderSumConfig.data.beginDate = data.beginDate
                  } else {
                    delete orderSumConfig.data.beginDate
                  }
                  if (data.endDate != undefined && data.endDate != null) {
                    orderSumConfig.data.endDate = data.endDate
                  } else {
                    delete orderSumConfig.data.endDate
                  }
                  this.getOrderSum()
                  console.log(this.charts.orderSum.filters.beginDate + this.charts.orderSum.filters.endDate)
                }
              }.bind(this), 1000)()
            }.bind(this),
            chartConfig: {
              type: 'line',
              data: {
                labels: [],
                datasets: [
                  {
                    label: '订单总额',
                    backgroundColor: Chart.helpers.color(window.chartColorArray[0]).alpha(0.5).rgbString(),
                    borderColor: Chart.helpers.color(window.chartColorArray[0]).rgbString(),
                    fill: false,
                    data: []
                  }, {
                    label: '订单数',
                    backgroundColor: Chart.helpers.color(window.chartColorArray[1]).alpha(0.5).rgbString(),
                    borderColor: Chart.helpers.color(window.chartColorArray[1]).rgbString(),
                    fill: false,
                    data: []
                  }]
              },
              options: {
                title: {
                  text: '客户成交状况分析'
                },
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      parser: timeFormat,
                      tooltipFormat: timeFormat,
                      displayFormats: {
                        month: 'YYYY-MM',
                        day: 'YYYY-MM-DD'
                      }
                    },
                    scaleLabel: {
                      display: true,
                      labelString: '日期'
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: '总值'
                    }
                  }]
                }
              }
            },
            chartTrigger: false
          }
        }
        charts.userOrder = {
          formFilters: {
            beginDate: {
              label: '起始日期',
              name: 'beginDate',
              type: 'date',
              required: false,
              ruleChange: true,
              placeholder: '起始日期'
            },
            endDate: {
              label: '结束日期',
              name: 'endDate',
              type: 'date',
              required: false,
              ruleChange: true,
              placeholder: '结束日期'
            }
          },
          filters: {},
          filterFun: function (data) {
            this.charts.userOrder.lastInputTime = new Date()
            lodash.debounce(function () {
              let date = new Date()
              if ((date.getTime() - this.charts.userOrder.lastInputTime.getTime()) > 999) {
                let data = this.charts.userOrder.filters
                if (data.user != undefined && data.user != null) {
                  userOrderConfig.data.user = data.user
                } else {
                  delete userOrderConfig.data.user
                }
                if (data.beginDate != undefined && data.beginDate != null) {
                  userOrderConfig.data.beginDate = data.beginDate
                } else {
                  delete userOrderConfig.data.beginDate
                }
                if (data.endDate != undefined && data.endDate != null) {
                  userOrderConfig.data.endDate = data.endDate
                } else {
                  delete userOrderConfig.data.endDate
                }
                this.getUserOrder()
                console.log(this.charts.userOrder.filters.beginDate + this.charts.userOrder.filters.endDate)
              }
            }.bind(this), 1000)()
          }.bind(this),
          chartConfig: {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  label: '订单总额',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[0]).alpha(0.5).rgbString(),
                  borderColor: Chart.helpers.color(window.chartColorArray[0]).rgbString(),
                  fill: false,
                  data: []
                }, {
                  label: '订单数',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[1]).alpha(0.5).rgbString(),
                  borderColor: Chart.helpers.color(window.chartColorArray[1]).rgbString(),
                  fill: false,
                  data: []
                }]
            },
            options: {
              title: {
                text: '用户成交状况分析'
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    parser: timeFormat,
                    tooltipFormat: timeFormat,
                    displayFormats: {
                      month: 'YYYY-MM',
                      day: 'YYYY-MM-DD'
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '日期'
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: '总值'
                  }
                }]
              }
            }
          },
          chartTrigger: false
        }
        charts.newClient = {
          formFilters: {
            clientLevel: {
              label: '客户级别',
              name: 'clientLevel',
              type: 'select',
              required: false,
              ruleChange: true
            },
            beginDate: {
              label: '起始日期',
              name: 'beginDate',
              type: 'date',
              required: false,
              ruleChange: true,
              placeholder: '起始日期'
            },
            endDate: {
              label: '结束日期',
              name: 'endDate',
              type: 'date',
              required: false,
              ruleChange: true,
              placeholder: '结束日期'
            }
          },
          filters: {},
          filterFun: function (data) {
            this.charts.newClient.lastInputTime = new Date()
            lodash.debounce(function () {
              let date = new Date()
              if ((date.getTime() - this.charts.newClient.lastInputTime.getTime()) > 999) {
                let data = this.charts.newClient.filters
                if (data.user != undefined && data.user != null) {
                  newClientConfig.data.user = data.user
                } else {
                  delete newClientConfig.data.user
                }
                if (data.clientLevel != undefined && data.clientLevel != null) {
                  newClientConfig.data.clientLevel = data.clientLevel
                } else {
                  delete newClientConfig.data.clientLevel
                }
                if (data.beginDate != undefined && data.beginDate != null) {
                  newClientConfig.data.beginDate = data.beginDate
                } else {
                  delete newClientConfig.data.beginDate
                }
                if (data.endDate != undefined && data.endDate != null) {
                  newClientConfig.data.endDate = data.endDate
                } else {
                  delete newClientConfig.data.endDate
                }
                this.getNewClient()
                console.log(this.charts.newClient.filters.beginDate + this.charts.newClient.filters.endDate)
              }
            }.bind(this), 1000)()
          }.bind(this),
          chartConfig: {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  label: '新增数',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[0]).alpha(0.5).rgbString(),
                  borderColor: Chart.helpers.color(window.chartColorArray[0]).rgbString(),
                  fill: false,
                  data: []
                }]
            },
            options: {
              title: {
                text: '新增客户状况'
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    parser: timeFormat,
                    tooltipFormat: timeFormat,
                    displayFormats: {
                      month: 'YYYY-MM',
                      day: 'YYYY-MM-DD'
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '日期'
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: '总值'
                  }
                }]
              }
            }
          },
          chartTrigger: false
        }
        charts.clientTrace = {
          formFilters: {
            client: {
              label: '客户名',
              name: 'client',
              type: 'select',
              required: false,
              ruleChange: true
            },
            beginDate: {
              label: '起始日期',
              name: 'beginDate',
              type: 'date',
              required: false,
              ruleChange: true,
              placeholder: '起始日期'
            },
            endDate: {
              label: '结束日期',
              name: 'endDate',
              type: 'date',
              required: false,
              ruleChange: true,
              placeholder: '结束日期'
            }
          },
          filters: {},
          filterFun: function (data) {
            this.charts.clientTrace.lastInputTime = new Date()
            lodash.debounce(function () {
              let date = new Date()
              if ((date.getTime() - this.charts.clientTrace.lastInputTime.getTime()) > 999) {
                let data = this.charts.clientTrace.filters
                if (data.user != undefined && data.user != null) {
                  clientTraceConfig.data.user = data.user
                } else {
                  delete clientTraceConfig.data.user
                }
                if (data.client != undefined && data.client != null) {
                  clientTraceConfig.data.client = data.client
                } else {
                  delete newClientConfig.data.client
                }
                if (data.beginDate != undefined && data.beginDate != null) {
                  clientTraceConfig.data.beginDate = data.beginDate
                } else {
                  delete clientTraceConfig.data.beginDate
                }
                if (data.endDate != undefined && data.endDate != null) {
                  clientTraceConfig.data.endDate = data.endDate
                } else {
                  delete clientTraceConfig.data.endDate
                }
                this.getClientTrace()
                console.log(this.charts.clientTrace.filters.beginDate + this.charts.clientTrace.filters.endDate)
              }
            }.bind(this), 1000)()
          }.bind(this),
          chartConfig: {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  label: '新增数',
                  backgroundColor: Chart.helpers.color(window.chartColorArray[0]).alpha(0.5).rgbString(),
                  borderColor: Chart.helpers.color(window.chartColorArray[0]).rgbString(),
                  fill: false,
                  data: []
                }]
            },
            options: {
              title: {
                text: '客户追踪状况'
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    parser: timeFormat,
                    tooltipFormat: timeFormat,
                    displayFormats: {
                      month: 'YYYY-MM',
                      day: 'YYYY-MM-DD'
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '日期'
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: '总值'
                  }
                }]
              }
            }
          },
          chartTrigger: false
        }
        if (isAdmin) {
          charts.userOrder.formFilters.users = {
            label: '用户',
            name: 'user',
            type: 'select',
            items: [],
            required: false,
            ruleChange: true
          }
          charts.newClient.formFilters.users = {
            label: '用户',
            name: 'user',
            type: 'select',
            items: [],
            required: false,
            ruleChange: true
          }
          charts.clientTrace.formFilters.users = {
            label: '用户',
            name: 'user',
            type: 'select',
            items: [],
            required: false,
            ruleChange: true
          }
        }
        return charts
      },
      getClientOrigin () {
        if (this.isAdmin) {
          axios.request(clientOriginConfig).then(function (response) {
            if (response.data) {
              this.charts.clientOrigin.chartConfig.data.labels = response.data[0]
              this.charts.clientOrigin.chartConfig.data.datasets[0].data = response.data[1]
              this.charts.clientOrigin.chartConfig.data.datasets[0].backgroundColor = []
              for (let key in response.data[1]) {
                this.charts.clientOrigin.chartConfig.data.datasets[0].backgroundColor.push(Chart.helpers.color(window.chartColorArray[key % window.chartColorArray.length]).darken(parseInt(key / window.chartColorArray.length) / response.data[1].length).rgbString())
              }
            } else {
              this.charts.clientOrigin.chartConfig.data.labels = []
              this.charts.clientOrigin.chartConfig.data.datasets[0].data = []
              this.charts.clientOrigin.chartConfig.data.datasets[0].backgroundColor = []
            }
            this.charts.clientOrigin.chartTrigger = !this.charts.clientOrigin.chartTrigger
          }.bind(this)).catch(function (error) {
            console.log('network error:' + error)
          })
        }
      },
      getCountry () {
        if (this.isAdmin) {
          axios.request(countryConfig).then(function (response) {
            if (response.data) {
              this.charts.country.chartConfig.data.labels = response.data[0]
              this.charts.country.chartConfig.data.datasets[0].data = response.data[1]
              this.charts.country.chartConfig.data.datasets[1].data = response.data[2]
              this.charts.country.chartConfig.data.datasets[2].data = response.data[3]
            } else {
              this.charts.country.chartConfig.data.labels = []
              this.charts.country.chartConfig.data.datasets[0].data = []
              this.charts.country.chartConfig.data.datasets[1].data = []
              this.charts.country.chartConfig.data.datasets[2].data = []
            }
            this.charts.country.chartTrigger = !this.charts.country.chartTrigger
          }.bind(this)).catch(function (error) {
            console.log('network error:' + error)
          })
        }
      },
      getClientAmount () {
        if (this.isAdmin) {
          axios.request(clientAmountConfig).then(function (response) {
            if (response.data) {
              this.charts.clientAmount.chartConfig.data.labels = response.data[0]
              this.charts.clientAmount.chartConfig.data.datasets[0].data = response.data[1]
              this.charts.clientAmount.chartConfig.data.datasets[0].backgroundColor = []
              for (let key in response.data[1]) {
                this.charts.clientAmount.chartConfig.data.datasets[0].backgroundColor.push(Chart.helpers.color(window.chartColorArray[key % window.chartColorArray.length]).darken(parseInt(key / window.chartColorArray.length) / response.data[1].length).rgbString())
              }
            } else {
              this.charts.clientAmount.chartConfig.data.labels = []
              this.charts.clientAmount.chartConfig.data.datasets[0].data = []
              this.charts.clientAmount.chartConfig.data.datasets[0].backgroundColor = []
            }
            this.charts.clientAmount.chartTrigger = !this.charts.clientAmount.chartTrigger
          }.bind(this)).catch(function (error) {
            console.log('network error:' + error)
          })
        }
      },
      getUserAmount () {
        if (this.isAdmin) {
          axios.request(userAmountConfig).then(function (response) {
            if (response.data) {
              this.charts.userAmount.chartConfig.data.labels = response.data[0]
              this.charts.userAmount.chartConfig.data.datasets[0].data = response.data[1]
              for (let key in response.data[1]) {
                this.charts.userAmount.chartConfig.data.datasets[0].backgroundColor.push(Chart.helpers.color(window.chartColorArray[key % window.chartColorArray.length]).darken(parseInt(key / window.chartColorArray.length) / response.data[1].length).rgbString())
              }
            } else {
              this.charts.userAmount.chartConfig.data.labels = []
              this.charts.userAmount.chartConfig.data.datasets[0].data = []
              this.charts.userAmount.chartConfig.data.datasets[0].backgroundColor = []
            }
            this.charts.userAmount.chartTrigger = !this.charts.userAmount.chartTrigger
          }.bind(this)).catch(function (error) {
            console.log('network error:' + error)
          })
        }
      },
      getOrderSum () {
        if (this.isAdmin) {
          axios.request(orderSumConfig).then(function (response) {
            if (response.data) {
              this.charts.orderSum.chartConfig.data.datasets[0].data = response.data[0]
              this.charts.orderSum.chartConfig.data.datasets[1].data = response.data[1]
            } else {
              this.charts.orderSum.chartConfig.data.datasets[0].data = []
              this.charts.orderSum.chartConfig.data.datasets[1].data = []
            }
            this.charts.orderSum.chartTrigger = !this.charts.orderSum.chartTrigger
          }.bind(this)).catch(function (error) {
            console.log('network error:' + error)
          })
        }
      },
      getUserOrder () {
        axios.request(userOrderConfig).then(function (response) {
          if (response.data) {
            this.charts.userOrder.chartConfig.data.datasets[0].data = response.data[0]
            this.charts.userOrder.chartConfig.data.datasets[1].data = response.data[1]
          } else {
            this.charts.userOrder.chartConfig.data.datasets[0].data = []
            this.charts.userOrder.chartConfig.data.datasets[1].data = []
          }
          this.charts.userOrder.chartTrigger = !this.charts.userOrder.chartTrigger
        }.bind(this)).catch(function (error) {
          console.log('network error:' + error)
        })

      },
      getNewClient () {
        axios.request(newClientConfig).then(function (response) {
          if (response.data) {
            this.charts.newClient.chartConfig.data.datasets[0].data = response.data[0]
          } else {
            this.charts.newClient.chartConfig.data.datasets[0].data = []
          }
          this.charts.newClient.chartTrigger = !this.charts.newClient.chartTrigger
        }.bind(this)).catch(function (error) {
          console.log('network error:' + error)
        })
      },
      getClientTrace () {
        axios.request(clientTraceConfig).then(function (response) {
          if (response.data) {
            this.charts.clientTrace.chartConfig.data.datasets[0].data = response.data[0]
          } else {
            this.charts.clientTrace.chartConfig.data.datasets[0].data = []
          }
          this.charts.clientTrace.chartTrigger = !this.charts.clientTrace.chartTrigger
        }.bind(this)).catch(function (error) {
          console.log('network error:' + error)
        })
      }
    },
    mounted: function () {
      axios.request(clientOptionConfig).then(function (response) {
        if (this.isAdmin) {
          this.charts.orderSum.formFilters.client.items = response.data.clients
          this.charts.orderSum.formFilters.client.init = true
          this.charts.userOrder.formFilters.users.items = response.data.users
          this.charts.userOrder.formFilters.users.init = true
          this.charts.newClient.formFilters.users.items = response.data.users
          this.charts.clientTrace.formFilters.users.items = response.data.users
        }
        this.charts.newClient.formFilters.clientLevel.items = response.data.clientLevels
        this.charts.newClient.formFilters.clientLevel.init = true
        this.charts.clientTrace.formFilters.client.items = response.data.clients
        this.charts.clientTrace.formFilters.client.init = true
        // data init
      }.bind(this)).catch(function (error) {
        console.log('network error:' + error)
      })
      this.getClientOrigin()
      this.getCountry()
      this.getClientAmount()
      this.getUserAmount()
      this.getOrderSum()
      this.getUserOrder()
      this.getNewClient()
      this.getClientTrace()
    },
    components: {
      panel, vchart, formElement
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  #index-app {
    .dashboard {
      .panel-wrapper {
        main {
          > div {
            padding: 10px;
            .form-filter {
              border: 1px solid #999;
              border-radius: 3px;
              padding: 4px;
              margin-bottom: 4px;
              .form-group {
                // 过滤条件给出一个大框 大的div，给出阴影，同时form element缩小一下
                margin-bottom: 2px;
                overflow: visible;
                label {
                  height: 26px;
                  line-height: 26px;
                  font-size: 13px;
                  margin-bottom: 0px;
                  margin-right: 3px;
                }
                .form-element {
                  display: inline-block;
                  font-size: 13px;
                  input.form-control {
                    height: 26px;
                  }
                  .date-picker {
                    height: auto;
                    .input-wrapper {
                      border-radius: 4px;
                      height: 26px;
                      width: 100px;
                    }
                    .date-panel {
                      left: 0;
                    }
                  }
                  .select-block {
                    display: inline-block;
                    position: relative;
                    select {
                      height: 26px;
                      min-width: 100px;
                      &.form-control {
                        padding: 0px 6px;
                      }
                    }
                    .cancel-btn {
                      top: 5px;
                      right: 15px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
