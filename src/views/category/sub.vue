<template>
  <div class="sub-categroy">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <ul v-if="goodsArr.length > 0">
          <li v-for="item in goodsArr" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <ul v-else>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XxmInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { goodsSort } from '@/api/product'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    // 
    const goodsArr = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 10
    }

    /*********  获取默认数据   *********************/
    const getData = () => {
      loading.value = true
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(res => {
        // 获取数据成功
        if (res.result.length > 0) {
          // 有数据就追加数据
          // goodsList.value = []
          goodsList.value.push(...res.result)
          // 把page改成下一页页码
          reqParams.page++
        } else {
          // 没有数据，代表加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改了二级分类的时候需要重新加载数据
    watch([() => route.params.id], (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = [] // 导致列表空的，加载更多组件顶上来，进入可视区，区加载数据
      }
    })

    /***********  更改排序组件的筛选数据，重新请求 *********************/
    const sortChange = (sortParams) => {
      // 1、按最新商品排序   -- latestTime
      // 2、按销量排序       -- salesNum
      // 3、按评论最多排序   -- evaluateNum
      // 4、按价格排序 
      let sort = 'desc'
      goodsArr.value = []
      if (sortParams.sortField !== null) {
        if (sortParams.sortField === 'price') {
          sort = sortParams.sortMethod
        }
        goodsSort(route.params.id, sortParams.sortField, sort, reqParams.page, reqParams.pageSize).then(data => {
          // 获取数据成功
          goodsArr.value.push(...data.result)
        })
      } else {
        // 默认排序
      }
      finished.value = false
      // 合并请求参数，保留之前参数
      // reqParams = { ...sortParams }
      // reqParams.page = 1
      // goodsList.value = []
    }
    /***********  更改筛选组件的筛选数据，重新请求  *********************/
    const filterChange = (filterParams) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    return { loading, finished, getData, goodsList, goodsArr, sortChange, filterChange }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
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
