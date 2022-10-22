<template>
  <div class="xtx-pagination">
    <a v-if="myCurrentPage === 1" href="javascript:;" class="disable">上一页</a>
    <a @click="changePage(myCurrentPage - 1)" v-else href="javascript:;">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a v-for="i in pager.btnArr" :key="i" @click="changePage(i)" href="javascript:;" :class="{active: i === myCurrentPage}">{{ i }}</a>
    <span v-if="pager.end < pager.pageCount">...</span>
    <a v-if="myCurrentPage >= pager.pageCount" href="javascript:;" class="disable">下一页</a>
    <a @click="changePage(myCurrentPage + 1)" v-else href="javascript:;">下一页</a>
  </div>
</template>
<script>
import { computed } from 'vue-demi'
import { ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props,{emit}) {
    // 总条数
    const myToTal = ref(100)
    // 每页需要条数
    const pageSize = ref(10)
    // 当前第几页
    const myCurrentPage = ref(1)
    // 按钮个数
    const btnCount = ref(5)

    // 根据数据得到（总页数、起始页码、结束页码、按钮数组）
    const pager = computed(() => {
      // 计算总页数
      let pageCount = Math.ceil(myToTal.value / pageSize.value)
      // 计算起始页码和结束页码
      // 1.理想情况下根据当前页码和按钮个数可得到
      let start = myCurrentPage.value - Math.floor(btnCount.value / 2)
      let end = start + btnCount.value - 1
      // 2.如果起始页码小于1，需要重新计算
      if (start < 1) {
        start = 1
        end = (start + btnCount.value - 1) > pageCount ? pageCount : (start + btnCount.value - 1)
      }
      // 2.2 如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount
        start = (end - btnCount.value + 1) < 1 ? 1 : (end - btnCount.value + 1)
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return { pageCount, start, end, btnArr }

    })
    
     // 改变页码
    const changePage = (newPage) => {
      if (myCurrentPage.value !== newPage) {
        myCurrentPage.value = newPage
        // 通知父组件最新页码
        emit('current-change', newPage)
      }
    }

    return {
      pager,
      myCurrentPage,
      changePage
    }

  }
}
</script>
<style lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    padding: 5px 10px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      color: #fff;
      background: @xtxColor;
      border-color: @xtxColor;
    }
    &.disable {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>