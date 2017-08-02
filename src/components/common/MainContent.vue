<template>
  <div id="index-app">
    <!--左侧树，使用scrollbar的植入方式-->
    <div class="left-tree">
      <tree :treeData="treeData" @click="menuClick"/>
    </div>
    <!--右侧content-->
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  let tree = huodhVuePlugins.tree
  // 树的初始化
  export default {
    name: 'index',
    methods: {
      menuClick () {
        if (document.querySelector('#index-app .left-tree').style.width !== '180px') {
          Array.from(document.querySelectorAll('#index-app .left-tree .tree-wrapper span.item-text')).forEach(function (val) {
            val.style.visibility = 'visible'
          })
          document.querySelector('#index-app .left-tree').style.width = '180px'
          document.querySelector('div.head a.menu').setAttribute('class', 'menu glyphicon glyphicon-list')
        }
      }
    },
    components: {
      tree
    },
    props: ['treeData']
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../scss/import.scss";
</style>
