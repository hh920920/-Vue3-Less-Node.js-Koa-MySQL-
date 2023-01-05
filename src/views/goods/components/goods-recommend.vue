<template>
  <div class="goods-hot">
    <h3>商品推荐</h3>
     <div v-for="item in goodsList" :key="item.id">
      <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods"/>  
    </div>  
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import GoodsItem from '../../category/components/goods-item'
import { findRelevantGoods } from '@/api/product'
export default {
  name: 'GoodsHot',
  components: {
    GoodsItem
  },
  setup () {
    const goodsList = ref(null)
    // 商品列表
    findRelevantGoods().then(({result}) => {
      goodsList.value = result
    })

    return { goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 80%;
    margin-bottom: 10px;
    
    img {
      width: 200px;
      height: 200px;
      .hoverShadow();
    }
    p {
      margin: 0px 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>