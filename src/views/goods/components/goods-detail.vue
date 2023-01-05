<template>
  <!-- 商品详情组件 -->
  <div class="goods-detail">
    <ul class="attrs">
      <li class="detail" v-for="item in properties" :key="item">
        <span class="name">{{ item.name }}</span>
        <span class="value">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 详情图片区 -->
    <div v-for="item in pictureList" :key="item">
      <!-- 使用图片懒加载 -->
      <img v-lazyload="item.picture" alt="" />
    </div>
    <img>

  </div>
</template>    
<script>
import { findGoodsDetails } from '@/api/product'
import { useRoute } from 'vue-router'
import { ref, nextTick } from 'vue'
export default {
  name: 'GoodsDetail',
  setup() {
    const route = useRoute()
    const pictureList = ref([])
    const properties = ref(null)
    findGoodsDetails(route.params.id).then(data => {
      nextTick(() => {
        properties.value = data.result[1].properties
        pictureList.value = data.result[0].pictures
      })
    })
    return {
      pictureList,
      properties
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