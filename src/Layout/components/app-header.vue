<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/"></RouterLink></h1>
      <!-- 使用头部导航组件 -->
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 使用头部购物车组件 -->
      <AppHeaderCart />
    </div>
  </header>
</template>

<script>
import AppHeaderNav from './app-header-nav'
import AppHeaderCart from './app-header-cart'
export default {
  name: 'AppHeader',
  components: { AppHeaderNav, AppHeaderCart }
}
</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 112px;
      width: 100%;
      background: url(../../assets/images/logo.jpg) no-repeat center 16px / contain;
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-sousuo {
      font-size: 18px;
      margin-left: 5px;
      cursor: pointer;
      &:hover {
        color: @themeColor;
      }
    }
    input {
      position: absolute;
      width: 140px;
      left: 50px;
      top: 7px;
      color: #666;
    }
  }
}
</style>
