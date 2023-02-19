<template>
  <div class='xxm-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XxmBread>
        <XxmBreadItem to="/">首页</XxmBreadItem>
        <XxmBreadItem :to="`/category/${goods.categories[0].parents[0].category_id}`">{{goods.categories[0].parents[0].name}}</XxmBreadItem>
        <XxmBreadItem :to="`/category/sub/${goods.categories[0].children_id}`">{{goods.categories[0].name}}</XxmBreadItem>
        <XxmBreadItem>{{goods.name}}</XxmBreadItem>
      </XxmBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- sku组件  -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <XxmNumbox label="数量" v-model="num" :max="goods.inventory" @change="changePrice" />
          <!-- 按钮组件 -->
          <XxmButton @click="insertCart()" type="primary" style="margin-top:20px">加入购物车</XxmButton>
          <el-button type="primary" @click="addCol()">添加收藏</el-button>
        </div>
      </div>
      <!-- 同类商品推荐 -->
      <!-- <GoodsRelevant :goodsId="goods.id" /> -->
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 商品推荐 -->
        <div class="goods-aside">
          <GoodsRecommend />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-info'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs'
import GoodsRecommend from './components/goods-recommend'
import GoodsWarn from './components/goods-warn'
import { nextTick, provide, reactive, ref, watch } from 'vue'
import { findGoods } from '@/api/product'
import { addUserCollect } from '@/api/user'
import { findCartList, inserCart } from '@/api/cart'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Message from '@/components/Message'
export default {
  name: 'XxxmGoodsPage',
  components: { GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsWarn, GoodsRecommend },
  setup() {
    const goods = useGoods()
    const newPrice = ref(0.00)
    const selected = ref(false)
    const skus = ref(null)
    const changeSku = (sku) => {
      skus.value = sku
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
        selected.value = true
        newPrice.value = sku.price
        currSku.value = sku
      } else {
        // 记录选择后的sku，可能有数据，可能没有数据{}
        selected.value = false
        currSku.value = sku
      }

    }

    // 提供goods数据给后代组件使用
    provide('goods', goods)

    // 选择的数量
    const num = ref(1)
    const newNum = ref(1)

    // 当数量变化时改变显示价格
    const changePrice = (count) => {
      newNum.value = count
      // goods.value.price = newPrice.value * count
    }

    watch([skus, selected, newNum], (newValue, oldValue) => {
      if (newValue[1] === true) {
        goods.value.price = parseFloat(newPrice.value * newNum.value).toFixed(2)
      } else {
        goods.value.price = newPrice.value
      }
    })

    // 加入购物车
    const store = useStore()
    const currSku = ref(null)
    const submitCarts = reactive({
      goods_id: 0,
      sku_id: '',
      goods_name: '',
      picture: '',
      price: 0.00,
      count: 0
    })
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        console.log(123);
        submitCarts.sku_id = currSku.value.skuId
        submitCarts.goods_name = goods.value.name
        submitCarts.picture = goods.value.picture
        submitCarts.price = currSku.value.price
        submitCarts.count = newNum.value
        submitCarts.goods_id = goods.value.goods_id

        inserCart({
          goods_id: submitCarts.goods_id,
          sku_id: submitCarts.sku_id,
          goods_name: submitCarts.goods_name,
          picture: submitCarts.picture,
          price: submitCarts.price,
          count: submitCarts.count,
        }).then(res => {

          console.log(res);
          if (res.code === 0) {
            Message({ type: 'success', text: res.message })
          }
        })
        // id skuId name attrsText picture price nowPrice selected stock count isEffective
        // const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        // const { id, name, price, mainPictures } = goods.value
        // store.dispatch('cart/insertCart', {
        //   skuId,
        //   attrsText,
        //   stock,
        //   id,
        //   name,
        //   price,
        //   nowPrice: price,
        //   picture: mainPictures[0],
        //   selected: true,
        //   isEffective: true,
        //   count: num.value
        // }).then(() => {
        //   Message({ type: 'success', text: '加入购物车成功' })
        // })
      } else {
        Message({ text: '请选择完整规格' })
      }
    }

    // 添加收藏
    const addCol = () => {
      const id = goods.value.goods_id
      addUserCollect({ goods_id: id }).then(res => {
        console.log(res);
        if (res.code === 0) {
          Message({ type: 'success', text: res.message })
        }
        if (res.code == '10013') {
          Message({ type: 'error', text: res.message })
        }
      })
    }

    return { goods, changeSku, num, insertCart, changePrice, addCol }
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
        // 让商品数据为null然后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result[0]
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
    .el-button {
      width: 100px;
      height: 50px;
      margin-left: 20px;
    }
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
</style>
