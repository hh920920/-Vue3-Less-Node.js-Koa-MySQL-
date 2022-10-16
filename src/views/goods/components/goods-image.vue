<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div class="large" v-if="show" :style="[{backgroundImage:`url(${images[currIndex]})`}, largePosition]"></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩 -->
      <div class="layer" v-if="show" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 当前图片索引
    const currIndex = ref(0)

    // 1. 是否显示遮罩和大图
    const show = ref(false)
    // 2. 遮罩的坐标（样式）
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 3. 大图背景定位（样式）
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })

    // 4. 使用vueUse中的useMouseInElement函数得到元素左上角的坐标和是否离开元素的数据
    const target = ref(null)
    // elementX 鼠标基于容器左上角X轴偏移
    // elementY 鼠标基于容器左上角Y轴偏移
    // isOutside 鼠标是否在模版容器之外
    const { elementX, elementY, isOutside }  = useMouseInElement(target)
    watch( [elementX, elementY, isOutside], () => {
        // 如果在范围内，isOutside.value 返回的值是 false
        show.value = !isOutside.value

        // 坐标值
        const position = {
            x: 0,
            y: 0
        }
        // 控制X轴方向的定位 0-200 之间
        if (elementX.value < 100) {
            position.x = 0
        } else if (elementX.value > 300) {
            position.x = 200
        } else {
            // 从遮罩中间开始移动      
            position.x = elementX.value - 100
        }

        // 控制Y轴方向的定位 
        if (elementY.value < 100) {
            position.y = 0
        } else if (elementY.value > 300) {
            position.y = 200
        } else {
            position.y = elementY.value - 100
        }

        // 给样式赋值
        layerPosition.left = position.x + 'px'
        layerPosition.top = position.y + 'px'
        largePosition.backgroundPositionX = -position.x * 2 + 'px'
        largePosition.backgroundPositionY = -position.y * 2 + 'px'
    })

    return {
      currIndex,
      show,
      target,
      layerPosition,
      largePosition
    }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    position: relative;
    cursor: move;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>