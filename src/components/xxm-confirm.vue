<template>
  <div class="confirm">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" @click="cancel()" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <XxmButton size="mini" type="gray" @click="cancel()">取消</XxmButton>
        <XxmButton size="mini" type="primary" @click="submit()">确认</XxmButton>
      </div>
    </div>
  </div>
</template>
<script>
// 当前组件不是在APP下进行渲染，无法使用APP下的环境（全局组件，全局指令，原型属性函数）
import XxmButton from './xxm-buttom'
import { onMounted, ref } from 'vue'
export default {
  name: 'XxmConfirm',
  components: { XxmButton },
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      default: ''
    },
    submitCallback: {
      type: Function
    },
    cancelCallback: {
      type: Function
    }
  },
  setup (props) {
    const fade = ref(false)
    onMounted(() => {
      // 当元素渲染完毕立即过渡的动画不会触发
      setTimeout(() => {
        fade.value = true
      }, 0)
    })
    // 取消
    const cancel = () => {
      // 其他事情
      props.cancelCallback()
    }
    // 确认
    const submit = () => {
      // 其他事情
      props.submitCallback()
    }

    return { fade, submit, cancel }
  }
}
</script>
<style lang="less" scoped>
.confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 8888;
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 5px;
        font-size: 16px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
  }
}
</style>