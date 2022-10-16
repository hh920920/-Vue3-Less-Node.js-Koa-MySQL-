<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气推荐 不容错过">
      <div ref="target" style="position: relative;height: 426px;">
        <Transition name="fade">
            <!-- 面板内容 -->
            <ul  v-if="hotList.length" ref="pannel" class="goods-list">
              <li v-for="item in hotList" :key="item.id">
                <RouterLink to="/">
                  <img :src="item.picture" alt="">
                  <p class="name">{{item.title}}</p>
                  <p class="desc">&yen;{{item.alt}}</p>
                </RouterLink>
              </li>
            </ul>
            <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton.vue'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'home-hot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // const hotList = ref([])
    // findHot().then(data => {
    //   hotList.value = data.result
    //   return hotList
    // })
    const { target, result } = useLazyData(findHot)
    return { hotList: result, target }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
