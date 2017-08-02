<template>
  <div class="container-fluid head">
    <div class="pull-left">
      <h3><span class="brand">{{appName}}</span>管理平台</h3>
      <a :class="menuClass" @click.prevent="menuClick"/>
    </div>
    <div class="pull-right">
      <a href="logout" title="logout">Logout<span class="glyphicon glyphicon-menu-right"></span></a>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        menuClass: 'menu glyphicon glyphicon-list',
        menuOpend: true
      }
    },
    methods: {
      menuClick () {
        if (this.menuOpend) {
          this.menuClass = 'menu glyphicon glyphicon-option-vertical'
        } else {
          this.menuClass = 'menu glyphicon glyphicon-list'
        }
        this.menuOpend = !this.menuOpend
        this.$emit('menuClick', this.menuOpend)
      }
    },
    props: {
      appName: {
        default: 'Hopever'
      }
    }
  }
</script>

<!-- 加入scoped是为了防止本组件中的css渗透到其他组件，可以去掉看看结果 -->
<style rel="stylesheet/scss" lang="scss" >
</style>
