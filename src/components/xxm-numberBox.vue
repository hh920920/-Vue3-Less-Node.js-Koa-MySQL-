<template>
  <div class="xxm-numbox">
    <div class="label" v-if="label">{{label}}</div>
    <div class="numbox">
      <a href="javascript:;" :class="{activeLeft}" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" :class="{activeRight}" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
export default {
  name: 'XxmNumbox',
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  setup(props, { emit }) {
    const count = useVModel(props, 'modelValue', emit)
    let activeLeft = ref(false)
    let activeRight = ref(false)
    // 如果当前数量值为1或最大值，显示禁止再点击按钮
    if (props.modelValue === props.min) {
      activeLeft.value = true
    }
    if (props.modelValue === props.max) {
      activeRight.value = true
    }
    // + - 按钮点击事件
    const changeNum = (step) => {
      // 得到将要改变的值，如果不合法则终止
      const newValue = count.value + step
      if (newValue < props.min || newValue > props.max) {
        return
      }
      // 修改值
      count.value = newValue
      // 如果当前数量值为1或最大值，显示禁止再点击按钮
      if (newValue === props.min) {
        activeLeft.value = true
      } else if (newValue === props.max) {
        activeRight.value = true
      } else {
        activeLeft.value = false
        activeRight.value = false
      }

      emit('change', newValue)
    }

    return { activeLeft, activeRight, changeNum }
  }
}
</script>

<style scoped lang="less">
.xxm-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 50px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    &:hover {
       border: 1px solid @themeColor;
    }
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &.activeLeft,
      &.activeRight {
        cursor: not-allowed;
      }
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
      cursor: pointer;
    }
  }
}
</style>