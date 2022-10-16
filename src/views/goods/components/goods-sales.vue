<template>
    <ul class="goods-sales">
      <li>
        <p>销量人气</p>
        <p>200+</p>
        <p><i class="iconfont icon-task-filling"></i>销量人气</p>
      </li>
      <li>
        <p>商品评价</p>
        <p>500+</p>
        <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
      </li>
      <li>
        <p>收藏人气</p>
        <p>800+</p>
        <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
      </li>
      <li>
        <p>品牌信息</p>
        <p>苏宁电器</p>
        <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
      </li>
    </ul>
</template>

<script>
export default {
    name: 'GoodsSales'
}
</script>

<style lang="less" scoped>
.goods-sales {
  width: 400px;
  min-height: 150px;
  display: flex;
  text-align: center;
  align-items: center;
  li {
    flex: 1;
    position: relative;
    // 给所有li标签加上伪元素
    ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-right: 1px solid #b6b4b4;
        content: "";
    }
    p {
        &:nth-child(1) {
            color: #999;
        }
        &:nth-child(2) {
            color: @priceColor;
            margin-top: 10px;
        }
        &:last-child {
            color: #666;
            margin-top: 15px;
            &:hover {
                color: @xtxColor;
            }
            i {
                color: @xtxColor;
                margin-right: 3px;
            }
        }
    }
  }
}
</style>