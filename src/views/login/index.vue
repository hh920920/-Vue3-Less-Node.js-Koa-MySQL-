<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a href="javascript:;" @click="changeLogin('accoutLogin')" :class="{active: activeName === 'accoutLogin'}">账户登录</a>
        <a href="javascript:;" @click="changeLogin('qrcodeLogin')" :class="{active: activeName === 'qrcodeLogin'}">扫码登录</a>
      </nav>
      <!-- 表单 -->
      <div v-if="activeName === 'accoutLogin'" class="account-box">
        <LoginForm v-if="activeName==='accoutLogin'"></LoginForm>
      </div>
      <!-- 二维码 -->
      <div v-if="activeName === 'qrcodeLogin'" class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt="">
        <p>打开 <a href="javascript:;">小熊猫App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>
<script>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import LoginForm from './components/login-form.vue'
import { ref } from 'vue-demi'
export default {
  name: 'PageLogin',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
  setup() {
    let activeName = ref('accoutLogin')

    const changeLogin = (newActiveName) => {
      activeName.value = newActiveName
    }

    return {
      activeName,
      changeLogin
    }
  }
}
</script>
<style scoped lang="less">
.active {
  color: @themeColor;
  font-weight: bold;
}
.login-section {
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    // 往右移100px
    transform: translate3d(100px, 0, 0);
    nav {
      display: flex;
      height: 55px;
      border-bottom: 1px solid rgb(227, 226, 226);
      padding: 0 40px;
      //   text-align: right;
      // 垂直居中
      align-items: center;
    }
    a {
      flex: 1;
      line-height: 1;
      display: inline-block;
      font-size: 18px;
      position: relative;
      &:first-child {
        text-align: left;
        border-right: 1px solid rgb(236, 235, 235);
      }
      &:last-child {
        text-align: right;
      }
    }
    // 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @themeColor;
      font-size: 16px;
    }
  }
}
  }
}
</style>