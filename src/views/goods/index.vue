<template>
  <div class="xxm-goods-page" v-if="goods">
    <!-- 加载中动画 -->
    <div class="loading container" v-if="loading">
      <div class="loadingImg"></div>
    </div>
    <div class="container" v-else>
      <!-- 面包屑 -->
      <xxm-bread>
        <xxm-bread-item to="/">首页</xxm-bread-item>
        <xxm-bread-item to="/category/'+goods.categories[0].id">{{goods.categories[0].name}}</xxm-bread-item>
        <xxm-bread-item to="/category/sub/'+goods.categories[1].id">{{goods.categories[1].name}}</xxm-bread-item>
        <xxm-bread-item to="/">{{goods.name}}</xxm-bread-item>
      </xxm-bread>
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
          <XxmNumbox label="数量" v-model="num" :min="1" :max="goods.inventory" />
          <XxmButton type="primary" @click="insertCart()" style="margin-top:20px;margin-left:6
           0px">加入购物车
           </XxmButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品 + 评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24h 热榜 + 专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
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
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn.vue'
import { nextTick, ref, watch, provide } from 'vue'
import { findGoods } from '@/api/product'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Message from '@/components/Message'

export default {
  name: 'XxmGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsInfo, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup() {
    const goods = useGoods()

    const loading = ref(true)

    // 商品初始数量
    let num = ref(1)

    const changeSku = (sku) => {
      // 修改商品的现价原价以及库存信息
      goods.value.price = sku.price
      goods.value.oldPrice = sku.oldPrice
      goods.value.inventory = sku.inventory
      currSku.value = sku
    }

    // 加入购物车逻辑
    const currSku = ref(null)
    const store = useStore()
    const token = store.getters['user/getToken']
    const { push } = useRouter()

    const insertCart = (() => {
      if (!currSku.value) {
        return Message({ text: '请选择商品规格', type: 'warn' })
      }
      if (num.value > goods.inventory) {
        return Message({ text: '库存不足', type: 'warn' })
      }
      if (token === undefined || token === '') {
        push('/login')
      } else {
        store.dispatch('cart/insertCart', {
          id: goods.value.id,
          skuId: currSku.value.skuId,
          name: goods.value.name,
          picture: goods.value.mainPictures[0],
          price: currSku.value.price,
          nowPrice: currSku.value.price,
          count: num.value,
          attrsText: currSku.value.specsText,
          selected: true,
          isEffective: true,
          stock: currSku.value.inventory
        }).then(() => {
          Message({ text: '加入购物车成功', type: 'success' })
        })
      }
    })

    provide('goods', goods)

    watch(goods, (newValue, oldValue) => {
      if (goods.value != null) {
        // 当商品信息变化时，把currSku的值重设
        currSku.value = null
        loading.value = true
        // loading加载1秒再显示商品
        setTimeout(() => {
          loading.value = false
        }, 1000)
      }
    })

    return { goods, changeSku, num, insertCart, loading }
  }
}
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  let route = useRoute()
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
.loading {
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .loadingImg {
    width: 100px;
    height: 100px;
    background-color: aqua;
    background: url(../../assets/images/loading.gif) no-repeat center;
  }
}
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
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>