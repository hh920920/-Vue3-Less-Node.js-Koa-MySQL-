<template>
  <!-- 消息组件封闭 -->
  <Transition name="down">
    <div class="xxm-message" :style="style[type]" v-show="visible">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{text}}</span>
    </div>
  </Transition>
</template>
<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'XxmMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'warn'
    }
  },
  setup() {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }

    // 定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
    const visible = ref(false)
    onMounted(() => {
        visible.value = true
    })


    return { style, visible }
  }
}
</script>

<style lang="less" scoped>
.xxm-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  margin-left: -150px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    // 设置元素的垂直对齐方式。
    vertical-align: middle;
  }
  text {
    vertical-align: middle;
  }
}
.down {
  &-enter {
    // 进入前
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    // 进入
    &-active {
      transform: all 0.5s;
    }
    // 进入后
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>