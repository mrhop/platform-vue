<template>
  <div class="container-fluid head">
    <div class="pull-left">
      <router-link v-if="!topTree" ref="brand" to="/"><h3 class="head-brand">{{appName}}<span
        class="brand">管理平台</span></h3>
      </router-link>
      <h3 class="head-brand" v-else @click="treeClick" ref="brand">{{appName}}<span class="brand">管理平台</span>
        <span class="h5" v-if="subTitle">{{subTitle}}</span>
      </h3>

      <tree id="top-tree" ref="topTreeEl" v-if="topTree" v-show="treeOpened" :treeData="topTree"
            @click="treeItemClick"/>
      <div v-if="localTopNavigate" class="top-navigate">
        <a v-for="(item, key) in localTopNavigate" :key="key" @click.prevent="navigateClick(item)">
          {{item.label}}
        </a>
      </div>
      <a :class="menuClass" @click.prevent="menuClick"/>
    </div>
    <div class="pull-right">
      <a href="logout" title="logout">Logout<span class="glyphicon glyphicon-menu-right"></span></a>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import huodhVuePlugins from 'huodh-vue-plugins'
  let tree = huodhVuePlugins.tree
  export default{
    data () {
      return {
        menuClass: 'menu glyphicon glyphicon-list',
        treeContainerClass: 'tree-container',
        localTopNavigate: null,
        menuOpened: true,
        treeOpened: false
      }
    },
    created () {
      if (this.topNavigate && typeof this.topNavigate === 'string') {
        let ruleChangeConfig = {
          url: this.topNavigate,
          method: 'get'
        }
        axios.request(ruleChangeConfig).then(function (response) {
          this.localTopNavigate = response.data
        }.bind(this))
      } else {
        this.localTopNavigate = this.topNavigate
      }
    },
    methods: {
      menuClick () {
        if (this.menuOpened) {
          this.menuClass = 'menu glyphicon glyphicon-option-vertical'
        } else {
          this.menuClass = 'menu glyphicon glyphicon-list'
        }
        this.menuOpened = !this.menuOpened
        this.$emit('menuClick', this.menuOpened)
      },
      treeClick () {
        this.treeOpened = !this.treeOpened
      },
      closeTree (event) {
        if (this.treeOpened && (!this.$refs.topTreeEl.$el.contains(event.target) && !this.$refs.brand.contains(event.target))) {
          this.treeOpened = !this.treeOpened
        }
      },
      treeItemClick (args) {
        this.treeClick()
        if (!this.menuOpened) {
          this.menuClick()
        }
        this.$emit('topTreeClick', args)
      },
      navigateClick (args) {
        this.$emit('navigateClick', args)
      }
    },
    mounted () {
      window.addEventListener('click', this.closeTree)
    },
    props: {
      appName: {
        default: 'Hopever'
      },
      topTree: {
        default: null
      },
      topNavigate: {
        default: null
      },
      subTitle: {
        default: null
      }
    },
    components: {
      tree
    }
  }
</script>

<!-- 加入scoped是为了防止本组件中的css渗透到其他组件，可以去掉看看结果 -->
<style rel="stylesheet/scss" lang="scss">
  @import "../../scss/import";

  .container-fluid.head {
    position: relative;
    z-index: 1;
    .pull-left {
      h3.head-brand {
        span.h5 {
          margin: 0;
          margin-top: 3px;
          color: $brand-warning;
          display: block;
        }
      }
      a.menu {
        float: right;
        display: block;
      }
      .tree-wrapper {
        position: fixed;
        top: 66px;
        bottom: 50px;
        width: 30%;
        left: 0px;
        background: rgba(0, 00, 00, .8);
        @include transition(all 400ms);
        @media(max-width: $screen-sm-max) {
          width: 50%;
        }
        @media(max-width: $screen-xs-max) {
          width: 100%;
        }
      }
      .top-navigate {
        display: block;
        float: right;
        a {
          font-size: 14px;
          font-size: 14px;
          line-height: 26px;
          background: rgba(211, 211, 211, .1);
          padding: 0px 5px;
          display: inline-block;
          &:hover {
            background: lighten($base-background, 15%);
          }
        }
      }
    }
    .pull-right {
      padding-top: 4px;
      float: right !important;
      vertical-align: bottom;
    }
  }
</style>
