<template>
  <div>
    <vhead appName="用户" v-on:menuClick="menuClick"></vhead>
    <vindex></vindex>
    <vfoot></vfoot>
  </div>
</template>

<script>
  import vhead from '../../components/common/Head'
  import vfoot from '../../components/common/Foot'
  import vindex from '../../components/user/Index'
  export default {
    components: {
      vhead,
      vfoot,
      vindex
    },
    methods: {
      menuClick (menuOpend) {
        if (menuOpend) {
          Array.from(document.querySelectorAll('#index-app .left-tree .tree-wrapper span.item-text')).forEach(function (val) {
            val.style.visibility = 'visible'
          })
          document.querySelector('#index-app .left-tree').style.width = '180px'
        } else {
          Array.from(document.querySelectorAll('#index-app .left-tree .tree-wrapper span.item-text')).forEach(function (val) {
            val.style.visibility = 'hidden'
          })
          document.querySelector('#index-app .left-tree').style.width = '60px'
        }
      }
    }
  }
</script>

<style scoped>

</style>
