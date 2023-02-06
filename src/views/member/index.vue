<template>
  <div class="container">
    <div class="member">
      <!-- 左边菜单 -->
      <MemberAside />
      <div class="content">
        <!-- 概览 -->
        <HomeOverview />
        <!-- 收藏 -->
        <HomePanel title='我的收藏'>
          <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
        </HomePanel>
      </div>

      <!-- 足迹 -->
      <!-- <HomePanel title="我的足迹"> -->
      <!-- <GoodsItem v-for="i in 4" :key="i" :goods="goods" /> -->
      <!-- </HomePanel> -->
      <!-- 猜你喜欢 -->
      <!-- <GoodsRelevant /> -->
    </div>
  </div>
</template>

<script>
import MemberAside from './home/home-member-aside.vue'
import HomeOverview from './home/home-overview'
import HomePanel from './home/home-panel.vue'
import GoodsItem from '@/views/category/components/goods-item'
import { ref } from 'vue'
import { findCollect } from '@/api/member'
export default {
  name: 'memberIndex',
  components: {
    MemberAside,
    HomeOverview,
    HomePanel,
    GoodsItem
  },
  setup() {
    // 调用模拟的接口
    const collectGoods = ref([])
    findCollect({
      page: 1,
      pageSize: 4,
      collectType: 1
    }).then(data => {
      collectGoods.value = data.result.items
    })

    return { collectGoods }
  }
}
</script>

<style lang="less" scoped>
.member {
  width: 100%;
  min-height: 600px;
  margin-top: 20px;
  // background-color: red;
  display: flex;
  flex-direction: row;
  .content {
    width: 980px;
  }
}
</style>