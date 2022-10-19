<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{active: activeName === 'detail'}" href="javascript:;" @click="clickTab('detail')">商品详情</a>
      <a :class="{active: activeName === 'comment'}" href="javascript:;" @click="clickTab('comment')">商品评价<span>({{praiseCount}})</span></a>
    </nav>
    <!-- 切换内容页面  -->
    <component :is="'goods-'+activeName" />
  </div>
</template>    

  <script>
import GoodsDetail from './goods-detail.vue'
import GoodsComment from './goods-comment.vue'
import { ref } from 'vue'
export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment
  },
  props: {
    goods: {
      type: Object,
      defauult: () => []
    },
    praiseCount: {
      type: Number,
      default: 832
    }
  },
  setup() {
    // detail-->详情   comment-->评价
    const activeName = ref('detail')
    const clickTab = (name) => {
      activeName.value = name
    }

    return {
      activeName,
      clickTab
    }
  }
}
  </script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background-color: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border: 1px solid #efefef;
    a {
      padding: 0 40px;
      font-size: 16px;
      position: relative;
      span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #e1e0e0;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 1.5px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>