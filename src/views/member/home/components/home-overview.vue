<template>
  <!-- 概览 -->
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <router-link to="user/info"><span class="editor">编辑资料<i class="iconfont icon-bianji"></i></span></router-link>
        <img :src="userInfo.picture" />
      </div>

      <div class="userinfo">
        <h4>邮箱：{{ userInfo.user_email }}</h4>
        <h4>用户名：{{ userInfo.user_name }}</h4>
        <h4>会员等级：{{ userInfo.vipGrade }}</h4>
      </div>
    </div>
    <div class="item">
      <a href="javascript:;">
        <span class="iconfont icon-hy"></span>
        <router-link to="/user/info"><p>个人资料</p></router-link>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-aq"></span>
        <router-link to="/user/set"><p>安全设置</p></router-link>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue-demi'
import { useStore } from 'vuex'
export default {
  name: 'MemberHomeOverview',
  setup() {
    const store = useStore()
    const userInfo = computed(() => {
      return store.state.user.profile
    })

    return { userInfo }
  }
}
</script>
<style scoped lang="less">
.home-overview {
  width: 100%;
  height: 132px;
  background: url(../../../../assets/images/center-bg.png) no-repeat center / cover;
  display: flex;
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;
      text-align: center;
      line-height: 80px;
      cursor: pointer;
      &:hover {
        .editor {
          display: block;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .editor {
        width: 85px;
        height: 85px;
        text-align: center;
        line-height: 85px;
        cursor: pointer;
        display: none;
        background: #000;
        color: #f4f4f4;
        opacity: .6;
      }
    }

    .userinfo {
      width: 300px;
      height: 80%;
      margin-left: 30px;
      h4 {
        padding-left: 26px;
        font-size: 18px;
        font-weight: normal;
        color: white;
        margin-top: 5px;
      }
    }
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:first-child {
      border-right: 1px solid #f4f4f4;
    }
    a {
      color: white;
      font-size: 16px;
      text-align: center;
      .iconfont {
        font-size: 32px;
      }
      p {
        line-height: 32px;
        &:hover {
          color: rgb(250, 179, 120);
        }
      }
    }
  }
}
</style>
