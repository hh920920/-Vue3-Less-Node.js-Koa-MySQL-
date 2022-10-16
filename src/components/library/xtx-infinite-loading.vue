<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载......</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoading',
  props: {
    // 加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 加载是否完成
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, {emit}) {
    const target = ref(null)
    useIntersectionObserver(
        target,
        ([{ isIntersecting }],dom) => {
            if (isIntersecting) {
                if (props.loading === false && props.finished === false) {
                    // console.log('进入可视区')
                    // 触发加载事件条件：请求完成，数据加载完毕
                    if (!props.loading && !props.finished) {
                        emit('infinite')
                    }
                }
            }
        },
        {
            // 阈值
            threshold: 0
        }
    )
    return {
        target
    }
  }

}
</script>

<style lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/loading.gif) no-repeat center /
        contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-content: center;
    justify-content: center;
    height: 200px;
    .img {
        width: 200px;
        height: 135px;
        background: url(../../assets/images/none.png) no-repeat center /
        contain;;
    }
    .text {
        color: #999;
        font-size: 16px;
    }
  }
}
</style>