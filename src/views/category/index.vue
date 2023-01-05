<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XxmBread>
        <XxmBreadItem to="/">首页</XxmBreadItem>
        <transition name="fade-right" mode="out-in">
          <XxmBreadItem :key="topCategory.category_id">{{topCategory.name}}</XxmBreadItem>
        </transition>
      </XxmBread>
      <!-- 轮播图 -->
      <XxmCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.children_id}`">
              <a href="javascript:;">
                <img :src="sub.picture">
                <p>{{sub.name}}</p>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{sub.name}} -</h3>
          <p class="tag">{{sub.de_sc}}</p>
          <XxmMore :path="`/category/sub/${sub.children_id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.chirldren_goods.slice(0,5)" :key="goods.goods_id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item'
import { findTopCategory } from '@/api/category'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup() {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })

    // 面包屑+所有子分类 ====> vuex
    const store = useStore()
    const route = useRoute()

    const topCategory = computed(() => {
      let cate = {}
      // 当前顶级分类 === 根据路由上的ID去vuex中category模块的list中查找
      const item = store.state.category.list.find(item => {
        return item.category_id == route.params.id
      })
      // 找到数据赋值
      if (item) {
        cate = item
      }
      return cate
    })


    // 获取各个子类目下推荐商品
    const subList = ref([])

    const getSubList = async () => {
      subList.value = await findTopCategory(route.params.id).then(data => {
        return data.result[0].children
      })
    }
    
    watch(() => route.params.id, (newVal) => {
      // newVal && getSubList() 加上一个严谨判断，在顶级类名下才发请求
      if (newVal && `/category/${newVal}` === route.path) getSubList()
    }, { immediate: true })

    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @themeColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xxm-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
      box-sizing: border-box;
    }
  }
}

// 面包屑切换动画
.fade-right-enter-to,
.fade-right-enter-from {
  opacity: 1;
  transform: none;
}
.fade-right-enter-active,
.fade-right-leave-active {
  transform: all 2s;
}
.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
</style>
