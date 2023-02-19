<template>
  <div class="user-info">
    <div class="title">
      <router-link to="/user/info"><span :class="{ active: activeName === 'userinfo' }">基本信息</span></router-link>
      <router-link to="/user/set"><span :class="{ active: activeName === 'userset' }">安全设置</span></router-link>
    </div>
    <div class="info-editor" v-if="isShow">
      <!-- 邮箱 -->
      <div class="info_set">
        <div class="editors">
          <span class="spantitle">邮箱:</span>
          <span>{{ userInfo.user_email }}</span>
        </div>
        <a href="javascript:;">修改邮箱</a>
      </div>
      <!-- 登录密码 -->
      <div class="info_set">
        <div class="editors">
          <span class="spantitle">登录密码:</span>
          <span>登录时需要输入的密码</span>
        </div>
        <a href="javascript:;" @click="isShow = false">修改密码</a>
      </div>
      <!-- 登录记录 -->
      <div class="info_set">
        <div class="editors">
          <span class="spantitle">登录记录:</span>
          <span>记录您的账号情况</span>
        </div>
        <a href="javascript:;">查看记录</a>
      </div>
      <!-- 账号注销 -->
      <div class="info_set">
        <div class="editors">
          <span class="spantitle">账号注销:</span>
          <span>账号注销相关的操作管理</span>
        </div>
        <a href="javascript:;">账号注销</a>
      </div>
    </div>

    <!-- 修改密码页面 -->
    <div class="update_pw" v-else>
      <div class="input">
        <span>原密码：</span>
        <div class="input_pw">
          <el-input type="password" v-model="pw.password" placeholder="请输入原密码" clearable />
        </div>
      </div>
      <div class="input">
        <span>新密码：</span>
        <div class="input_pw">
          <el-input type="password" v-model="pw.newPw" placeholder="请输入原密码" clearable />
        </div>
      </div>
      <div class="input">
        <span>确认密码：</span>
        <div class="input_pw">
          <el-input type="password" v-model="pw.attriPw" placeholder="请输入原密码" clearable />
        </div>
      </div>
      <div class="commit">
        <el-button type="primary" @click="isShow = true" round>返回</el-button>
        <el-button type="success" @click="updatePw()" round>确认修改</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { updatePassword } from '@/api/member'
import { useRouter } from 'vue-router'
import Message from '@/components/Message'
export default {
  name: 'UserInfo',
  setup() {
    const activeName = ref('userset')
    const isShow = ref(true)
    const store = useStore()
    const router = useRouter()
    const userInfo = computed(() => {
      return store.state.user.profile
    })

    const pw = reactive({
      password: '',
      newPw: '',
      attriPw: ''
    })

    const updatePw = () => {
      if (pw.newPw !== pw.attriPw) {
        Message({ type: 'warn', text: '新密码不一致' })
      }
      if ((pw.password || pw.newPw || pw.attriPw) !== '') {
        updatePassword({ password: pw.attriPw}).then(res => {
          if (res.code === 0) {
            localStorage.setItem('xxm-pc-access_t', {})
            localStorage.setItem('xxm-pc-refresh_t', {})
            store.commit('user/setUser', {})
            Message({ type: 'success', text: '密码重置成功,请重新登录！' })
            setTimeout(() => {
              router.push('/user/login')
            }, 1000)
          }
        })
      } else {
        Message({ type: 'warn', text: '请填写密码' })
      }
    }

    return { activeName, isShow, userInfo, pw, updatePw }
  }
}
</script>
<style lang="less" scoped>
.active {
  color: green;
  &:before {
    content: "";
    height: 1.5px;
    background-color: rgb(105, 210, 76);
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -9px;
  }
}
.user-info {
  min-width: 300px;
  min-height: 300px;
  padding: 0 20px;
  background-color: rgb(255, 255, 255);
  .title {
    width: 600px;
    height: 47px;
    border-bottom: 2px solid rgb(203, 200, 200);
    span {
      line-height: 60px;
      margin-right: 50px;
      cursor: pointer;
      position: relative;
    }
  }
  .info-editor {
    width: 580px;
    height: 300px;
    // background-color: red;
    .info_set {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      border: 1px solid rgba(160, 160, 159, 0.5);
      padding: 0 10px;
      justify-content: space-between;
      justify-items: center;
      .editors {
        width: 350px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        span {
          width: 160px;
          height: 100%;
          line-height: 50px;
          justify-content: space-around;
          &.spantitle {
            color: rgb(7, 7, 7);
            font-weight: 50px;
          }
        }
        .name_editor {
          width: 200px;
          height: 35px;
          margin-left: 30px;
          line-height: 20px;
          //   background-color: blue;
        }
      }
      a {
        width: 80px;
        height: 30px;
        margin-top: 10px;
        background: linear-gradient(90deg, #16e05a 0, #16e09d 100%);
        text-align: center;
        line-height: 30px;
        color: #fff;
        margin-left: 10px;
      }
    }
  }
  .update_pw {
    width: 430px;
    height: 300px;
    margin-top: 50px;
    margin-left: 100px;
    // background-color: rgb(213, 213, 213);
    .input {
      width: 380px;
      min-height: 35px;
      margin-bottom: 20px;
      // background-color: #16e05a;
      display: flex;
      justify-content: space-between;
      .input_pw {
        width: 300px;
        height: 35px;
        // background-color: red;
      }
      span {
        width: 80px;
        height: 100%;
        line-height: 35px;
        // background-color: blue;
      }
    }
    .commit {
      width: 200px;
      height: 50px;
      margin-left: 70px;
      margin-top: 50px;
      // background-color: #16e05a;
    }
  }
}
</style>