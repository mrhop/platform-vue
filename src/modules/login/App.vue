<template>
  <router-view></router-view>
</template>

<script>
  import huodhVuePlugins from 'huodh-vue-plugins'
  let panel = huodhVuePlugins.panel
  export default {
    components: {
      panel
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../scss/import.scss";

  #login-wrapper, #registration-wrapper {
    padding: 0;
    background: $base-background;
    border-radius: 5px;
    color: #fff;
    overflow: hidden;
    @media(min-width: $screen-sm-min) {
      position: absolute;
      margin-left: 25%;
      top: 50%;
    }
    .panel-wrapper {
      margin: 0;
      border: 0;
      > header {
        margin-top: 10px;
        background: none;
        color: #fff;
        text-align: center;
      }
      .form-wrapper {
        .actions {
          a.registration, a.login {
            color: #fff;
            text-decoration: underline;
            position: absolute;
            right: 0;
            bottom: 0;
            &:hover {
              color: $brand-primary;
            }
          }
        }
      }
    }
    p.error {
      text-align: right;
      margin: 5px 20px 0 0;
      color: $brand-danger;
    }
  }

  #login-wrapper {
    @media(min-width: $screen-sm-min) {
      margin-top: -103px;
    }
  }

  #registration-wrapper {
    @media(min-width: $screen-sm-min) {
      margin-top: -182px;
    }
  }
</style>
