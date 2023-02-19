<template>
  <div class="detail-step">
    <XxmSteps :active="order.orderState === 6 ? 1 : order.orderState">
      <XxmStepsItem title="提交订单" :desc="order.createTime"  />
      <XxmStepsItem title="付款成功" :desc="order.payTime"  />
      <XxmStepsItem title="商品发货" :desc="order.consignTime"  />
      <XxmStepsItem title="确认收货" :desc="order.endTime"  />
      <XxmStepsItem title="订单完成" :desc="order.evaluationTime"  />
    </XxmSteps>
  </div>
</template>
<script>
export default {
  name: 'DetailStep',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    console.log(props);
  }
}
</script>
<style scoped lang="less">
.detail-step {
  padding: 20px;
}
</style>
