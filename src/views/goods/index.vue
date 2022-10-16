<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item to="/category/'+goods.categories[0].id">{{goods.categories[0].name}}</xtx-bread-item>
        <xtx-bread-item to="/category/sub/'+goods.categories[1].id">{{goods.categories[1].name}}</xtx-bread-item>
        <xtx-bread-item to="/">{{goods.name}}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsInfo :goods="goods" />
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 选择数量 -->
          <XtxNumbox label="数量" v-model="num" :min="1" :max="goods.inventory"/>
           <XtxButton type="primary" style="margin-top:20px;margin-left:6
           0px">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant  :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品 + 评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24h 热榜 + 专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsRelevant from './components/goods-relevant.vue'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsInfo from './components/goods-info.vue'
import GoodsSku from './components/goods-sku.vue'
import { nextTick, ref, watch } from 'vue'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsInfo, GoodsSku },
  setup() {
    const goods = useGoods()

    // 商品初始数量
    let num = ref(1)

    const changeSku = (sku) => {
      // 修改商品的现价原价以及库存信息
      goods.value.price = sku.price
      goods.value.oldPrice = sku.oldPrice
      goods.value.inventory = sku.inventory
    }


    return { goods, changeSku, num }
  }
}
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>
<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>