<template>
  <div>
    <vhead appName="用户"></vhead>
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
    }
  }
</script>

<style scoped>

</style>
