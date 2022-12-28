<template>
  <!-- 商品详情组件 -->
  <div class="goods-detail">
    <ul class="attrs">
      <li class="detail" v-for="item in goods.details.properties" :key="item">
        <span class="name">{{ item.name }}</span>
        <span class="value">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goods.details.pictures" :src="item" alt="" :key="item">
  </div>
</template>    
<script>
import { inject } from 'vue-demi'
export default {
  name: 'GoodsDetail',
  setup() {
    const goods = inject('goods')
    return {
      goods
    }
  }
}
</script>


<style lang="less" scoped>
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      width: 46%;
      padding-right: 2%;
      margin-bottom: 20px;
      .name {
        width: 100px;
        color: #999;
      }
      .value {
        flex: 1;
      }
    }
  }
}
</style>