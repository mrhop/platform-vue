<template>
  <div>
    <vhead appName="oauth2测试"></vhead>
    <div style="margin: 80px 0 20px">
      <a class="btn btn-primary" href="gettokenbycode">使用authcode方式获取资源</a>
      <a class="btn btn-primary" href="gettokenbyclient">使用client方式获取资源</a>
    </div>
    <div>
      <button @click.prevent="getRestrictedResourceInSameClient">访问client同app的限制资源</button>
      <button @click.prevent="getRestrictedResourceInDifferentClient">访问其他资源库的限制的资源</button>
      <button @click.prevent="getResourceInDifferentClient">访问其他资源库的client可用资源</button>
      <button @click.prevent="getResourceInDifferentClient2">访问moji测试</button>
    </div>
    <vfoot></vfoot>
  </div>
</template>

<script>
  import axios from 'axios'
  import vhead from '../../components/common/Head'
  import vfoot from '../../components/common/Foot'
  let v = window.document.cookie.match('(^|;) ?accesstoken=([^;]*)(;|$)')
  let accesstoken = v ? v[2] : null
  let config1 = {
    headers: {'Authorization': 'Bearer ' + accesstoken},
    url: 'testresource',
    method: 'get'
  }
  let config2 = {
    headers: {'Authorization': 'Bearer ' + accesstoken},
    url: 'http://localhost:9091/resources/test/testresource',
    method: 'get',
    withCredentials: true
  }
  let config3 = {
    headers: {'Authorization': 'Bearer ' + accesstoken},
    url: 'http://localhost:9091/resources/test/testclientresource',
    method: 'get',
    withCredentials: true
  }
  let config4 = {
    headers: {'Authorization': 'Bearer ' + accesstoken},
    url: 'http://localhost:8084/utilsweb/test/moji',
    method: 'get',
    withCredentials: true
  }
  export default {
    components: {
      vhead,
      vfoot
    },
    methods: {
      getRestrictedResourceInSameClient () {
        axios.request(config1).then(function (response) {
          console.log('success:' + response.data.message)
        }).catch(function (error) {
          console.log('error:' + error)
        })
      },
      getRestrictedResourceInDifferentClient () {
        axios.request(config2).then(function (response) {
          console.log('success2:' + response.data.message)
        }).catch(function (error) {
          console.log('error2:' + error)
        })
      },
      getResourceInDifferentClient () {
        axios.request(config3).then(function (response) {
          console.log('success:' + response.data.message)
        }).catch(function (error) {
          console.log('error:' + error)
        })
      },
      getResourceInDifferentClient2 () {
        axios.request(config4).then(function (response) {
          console.log('success:')
        }).catch(function (error) {
          console.log('error:' + error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
