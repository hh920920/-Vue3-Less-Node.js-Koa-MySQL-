<template>
  <RegisterHeader>欢迎注册</RegisterHeader>
  <section class="register-section">
    <div class="wrapper">
      <nav>
        <a href="javascript:;">用户注册</a>
      </nav>
      <!-- 表单 -->
      <div class="account-box">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  </section>
  <RegisterFooter />
</template>

<script>
import RegisterHeader from './components/register-header.vue'
import RegisterFooter from './components/register-footer.vue'
import RegisterForm from './components/register-form.vue'
export default {
  name: 'RegisterSection',
  components: {
    RegisterHeader,
    RegisterFooter,
    RegisterForm
  }
}
</script>
<style lang="less" scoped>
.register-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    min-width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
    // 往右移100px
    transform: translate3d(100px, 0, 0);
    nav {
      display: flex;
      height: 55px;
      border-bottom: 1px solid rgb(227, 226, 226);
      padding: 0 40px;
      text-align: center;
      // 垂直居中
      align-items: center;
    }
    a {
      flex: 1;
      line-height: 1;
      display: inline-block;
      font-size: 22px;
      color: @themeColor;
      font-weight: bold;
    }
  }
}
</style>