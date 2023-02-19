<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li><a href="javascript:;">消息中心</a></li>
        <li><a href="javascript:;">售后服务</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-shouji"></i>手机版</a></li>
        <template v-if="token !== null">
          <li class="menuli">
            <!-- <a href="javascript" class="menushow">
              <i class="iconfont icon-yonghu"></i>{{ user_name }}<i class="iconfont icon-xiangxiajiantou"></i>
            </a> -->
            <!-- 有菜单 -->
            <div class="items">
              <div class="menu">
                <a href="javascript:;" class="menushow">
                  <i class="iconfont icon-yonghu"></i>{{ user_name }}<i class="iconfont icon-xiangxiajiantou"></i>
                </a>
                <div class="drop" @click="toMember()">个人中心</div>
                <div class="drop" @click="toInfo()">账号设置</div>
                <div class="drop" @click="toOrder()">我的订单</div>
                <div class="drop" @click="toAddr()">地址管理</div>
                <div class="drop" @click="toCollect()">我的收藏</div>
                <div class="drop" @click="logout()">退出登录</div>
              </div>
            </div>
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/user/login">请先登录</RouterLink>
          </li>
          <li>
            <RouterLink to="/user/register">免费注册</RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/Message'
import { getInfoTest } from '@/api/user'
import { computed } from 'vue'
export default {
  name: 'AppTopnav',
  components: {

  },
  setup() {
    // 获取用户的登录信息才能控制切换导航菜单
    const store = useStore()
    // 判断有无token
    const token = localStorage.getItem('xxm-pc-access_t')
    const user_name = computed(() => {
      return store.state.user.profile.user_name
    })

    // 退出登录
    // 1. 清空本地存储信息和vuex的用户信息
    // 2. 跳转登录
    const router = useRouter()
    const logout = () => {
      store.commit('user/setUser', {})
      localStorage.clear()
      Message({ type: 'success', text: '成功退出！' })
      setTimeout(() => {
        router.push('/user/login')
      }, 1500)
    }

    // 跳转个人中心
    const toMember = () => {
      setTimeout(() => {
        router.push('/member')
      }, 500)
    }

    // 跳转地址页面
    const toAddr = () => {
        router.push('/user/address')
    }

    // 跳转收藏页面
    const toCollect = () => {
        router.push('/user/collect')
    }

    // 跳转信息设置页面
    const toInfo = () => {
        router.push('/user/info')
    }

    // 跳转订单页面
    const toOrder = () => {
      router.push('/member/order')
    }

    return { token, user_name, logout, toOrder, toMember, toInfo, toAddr, toCollect }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    li {
      z-index: 999;
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        // i {
        //   font-size: 14px;
        //   margin-right: 2px;
        // }
        &:hover {
          color: @themeColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
      .icon-yonghu {
        margin-right: 5px;
      }
      .menu {
        width: 160px;
        height: 52px;
        line-height: 52px;
        // background-color: blue;
        text-align: center;
        position: relative;
        overflow: hidden;
        .menuitem {
          margin-top: 10px;
        }
        &:hover {
          overflow: visible;
          color: white;
          z-index: 999;
          cursor: pointer;
          .menushow {
            color: @themeColor;
          }
          .icon-xiangxiajiantou {
            display: inline-block;
            transform: rotate(180deg);
          }
        }
        .drop {
          background-color: rgba(15, 17, 20, 0.9);
          text-align: center;
          width: 100%;
          height: 45px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 45px;
          overflow: hidden;
          &:hover {
            // background: rgb(214, 29, 29);
            color: @themeColor;
            cursor: pointer;
          }
        }
      }
    }
    // .menuli:hover {
    //   .menuitem {
    //     display: block;
    //   }
    // }
  }
}
// ~ 选择器作用：选择当前选择器后的所有元素
</style>
