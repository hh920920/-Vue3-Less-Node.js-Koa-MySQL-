<script>
export default {
  name: 'XxmSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render () {
    // 1. 获取到默认插槽的节点
    const items = this.$slots.default()
    // 2. 获取所有的动态生成的XtxStepsItem组件节点
    const dymanicItems = []
    items.forEach(item => {
      if (item.type.name === 'XxmStepsItem') {
        dymanicItems.push(item)
      } else {
        item.children.forEach(item => {
          dymanicItems.push(item)
        })
      }
    })
    // 3. 根据动态节点生成 item 的jsx对象
    const itemsJsx = dymanicItems.map((item, i) => {
      return (
        <div class="xxm-steps-item" class={{ active: i < this.active }}>
          <div class="step"><span>{i + 1}</span></div>
          <div class="title">{item.props.title}</div>
          <div class="desc">{item.props.desc}</div>
        </div>
      )
    })
    // 4. 插入大容器中
    return <div class="xxm-steps">{itemsJsx}</div>
  }
}
</script>
<style lang="less">
.xxm-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @themeColor;
          background: @themeColor;
          color: #fff
        }
        &::before,&::after {
          background: @themeColor;
        }
      }
      .title {
        color: @themeColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,&::before{
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
         left: 0;
      }
      &::after {
         right: 0;
       }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
