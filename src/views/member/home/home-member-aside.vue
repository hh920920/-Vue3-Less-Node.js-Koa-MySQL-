<template>
  <div class="xxm-member-aside">
    <div class="user-manage">
      <h4>我的账户</h4>
      <div class="links">
        <RouterLink exact-active-class="active" to="/member">个人中心</RouterLink>
        <RouterLink active-class="active" to="/user/sysmessage">消息通知</RouterLink>
        <RouterLink active-class="active" to="/user/info">基本信息</RouterLink>
        <RouterLink active-class="active" to="/user/set">安全设置</RouterLink>
        <RouterLink active-class="active" to="/user/address">地址管理</RouterLink>
        <a href="javascript:;">我的积分</a>
        <a href="javascript:;">我的足迹</a>
        <a href="javascript:;">幸运抽奖</a>
      </div>
      <h4>交易管理</h4>
      <div class="links">
        <RouterLink active-class="active" to="/member/order">我的订单</RouterLink>
        <a href="javascript:;">优惠券</a>
        <a href="javascript:;">礼品卡</a>
        <a href="javascript:;">评价晒单</a>
        <a href="javascript:;">售后服务</a>
      </div>
      <h4>我的收藏</h4>
      <div class="links">
        <RouterLink active-class="active" to="/user/collect">收藏的商品</RouterLink>
        <a href="javascript:;">收藏的专题</a>
        <a href="javascript:;">关注的品牌</a>
      </div>
      <h4>帮助中心</h4>
      <div class="links">
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">在线客服</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XxmMemberAside',

}
</script>

<style scoped lang='less'>
.xxm-member-aside {
  width: 260px;
  margin-right: 20px;
  border-radius: 2px;
  .user-manage {
    background-color: #fff;
    h4 {
      font-size: 18px;
      font-weight: 400;
      padding: 20px 52px 5px;
      border-top: 1px solid #d3d1d1;
    }
    .links {
      padding: 0 52px 10px;
    }

    a {
      display: block;
      line-height: 1;
      padding: 15px 0;
      font-size: 14px;
      color: #666;
      position: relative;
      &:hover {
        color: @themeColor;
      }
      &.active {
        color: @themeColor;
        &:before {
          display: block;
        }
      }
      &:before {
        content: "";
        display: none;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        top: 19px;
        left: -16px;
        background-color: @themeColor;
      }
    }
  }
}
</style>