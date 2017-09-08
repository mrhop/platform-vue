<template>
  <div>
    <vhead :appName="appName" :topTree="topTree" :topNavigate="topNavigate" v-on:menuClick="menuClick"
           v-on:topTreeClick="topTreeClick"
           v-on:navigateClick="navigateClick"></vhead>
    <mainContent :treeData="treeData"></mainContent>
    <vfoot></vfoot>
  </div>
</template>

<script>
  import vhead from './Head'
  import vfoot from './Foot'
  import mainContent from './MainContent'
  let resizeTimer = null
  export default {
    components: {
      vhead,
      vfoot,
      mainContent
    },
    methods: {
      menuClick (menuOpend) {
        if (menuOpend) {
          Array.from(document.querySelectorAll('#index-app .left-tree .tree-wrapper span.item-text')).forEach(function (val) {
            val.style.visibility = 'visible'
          })
          document.querySelector('#index-app .left-tree').style.width = '180px'
          if (document.documentElement.clientWidth >= 768) {
            document.querySelector('#index-app .right-content').style.marginLeft = '180px'
          }
        } else {
          Array.from(document.querySelectorAll('#index-app .left-tree .tree-wrapper span.item-text')).forEach(function (val) {
            val.style.visibility = 'hidden'
          })
          if (document.documentElement.clientWidth < 768) {
            document.querySelector('#index-app .left-tree').style.width = '0'
          } else {
            document.querySelector('#index-app .left-tree').style.width = '60px'
            document.querySelector('#index-app .right-content').style.marginLeft = '60px'
          }
        }
      },
      topTreeClick (args) {
        this.$emit('topTreeClick', args)
      },
      navigateClick (args) {
        this.$emit('navigateClick', args)
      },
      doResize () {
        if (document.documentElement.clientWidth < 768) {
          document.querySelector('#index-app .left-tree').style.width = '0'
          document.querySelector('#index-app .right-content').style.marginLeft = '0'
          document.querySelector('div.head a.menu').setAttribute('class', 'menu glyphicon glyphicon-option-vertical')
        } else {
          Array.from(document.querySelectorAll('#index-app .left-tree .tree-wrapper span.item-text')).forEach(function (val) {
            val.style.visibility = 'visible'
          })
          document.querySelector('#index-app .left-tree').style.width = '180px'
          document.querySelector('#index-app .right-content').style.marginLeft = '180px'
          document.querySelector('div.head a.menu').setAttribute('class', 'menu glyphicon glyphicon-list')
        }
        resizeTimer = null
      }
    },
    mounted () {
      window.onresize = function () {
        if (resizeTimer === null) {
          resizeTimer = setTimeout(this.doResize, 400)
        }
      }.bind(this)
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
      treeData: {
        default: null
      }
    }
  }
</script>

<style scoped>

</style>
