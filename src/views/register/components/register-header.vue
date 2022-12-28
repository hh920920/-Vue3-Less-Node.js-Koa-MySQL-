<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo"><router-link to="/">小熊猫</router-link></h1>
      <h3 class="sub">
        <slot />
      </h3>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>
<script>
export default {
  name: 'LoginHeader'
}
</script>
<style lang="less" scoped>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    width: 200px;
    a {
      width: 100%;
      height: 132px;
      display: block;
      text-indent: -9999px;
      background: url(../../../assets/images/logo.jpg) no-repeat center 18px /
        contain;
    }
  }
  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }
  .entry {
    margin-bottom: 38px;
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;
    &:hover {
      color: @themeColor;
    }
    i {
      font-size: 14px;
      color: @themeColor;
      // 修改行间距
      letter-spacing: -5px;
    }

  }
}
</style>