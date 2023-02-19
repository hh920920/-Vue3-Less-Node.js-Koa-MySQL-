<template>
  <div class="collect">
    <h3>我的收藏：</h3>
      <ul>
        <li v-for="item in goodsList" :key="item.id">
          <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods"/>  
        </li>
      </ul>

  </div>
</template>

<script>
import { getUserCollect } from '@/api/user'
import GoodsItem from '../../../category/components/goods-item'
import { ref } from 'vue'
export default {
  name: 'UserCollect',
  components: {
    GoodsItem
  },
  setup() {
    const goodsList = ref(null)
    // 商品列表
    getUserCollect().then(({ data }) => {
      goodsList.value = data
    })

    return { goodsList }

  }
}
</script>

<style lang="less" scoped>
.collect {
  width: 100%;
  min-height: 300px;
  background-color: rgb(255, 255, 255);
  h3 {
    color: rgb(245, 136, 53);
    margin-bottom: 30px;
  }
    // background-color: red;
    ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  
}
</style>