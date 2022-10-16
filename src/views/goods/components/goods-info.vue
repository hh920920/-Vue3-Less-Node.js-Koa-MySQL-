<template>
    <p class="g-name">{{ goods.name }}</p> 
    <p class="g-desc">{{ goods.desc }}</p>
    <p class="g-price">
        <span>{{ goods.price }}</span>
        <span>{{ goods.oldPrice }}</span>
    </p>
    <div class="g-service">
        <dl>
            <dt>促销</dt>
            <dd>12月好物放送，APP领券购买直降150元</dd>
        </dl>
        <dl>
            <dt>配送</dt>
            <dd>至 <XtxCity @change="changeCIty" :fullLocation = fullLocation /></dd>
        </dl>
        <dl>
            <dt>服务</dt>
            <dd>
                <span>无忧退化</span>
                <span>快速退款</span>
                <span>免费包邮</span>
                <a href="javascript:;">了解详情</a>
            </dd>
        </dl>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsInfo',
  props: {
    goods: {
        type: Object,
        default: () => ({})
    }
  },
  setup (props) {
    // 没登录时，默认地址
    let provinceCode = ref('110000')     // 省份代码
    let cityCode = ref('119900')         // 城市代码
    let countyCOde = ref('110101')       
    let fullLocation = ref('北京市 市辖区 东城区')

    // 如果已登录，取出用户的默认收货地址
    if (props.goods.userAddresses) {
        const defaultAddress = props.goods.userAddresses.find(addr => addrisDefault === 1)
        if (defaultAddress) {
            provinceCode = defaultAddress.provinceCode
            cityCode = defaultAddress.cityCode
            countyCOde = defaultAddress.countyCOde
            fullLocation = defaultAddress.fullLocation
        }
    }

    // 地区选中事件处理函数
    const changeCIty = (result) => {
        provinceCode.value = result.provinceCode
        cityCode.value = result.cityCode
        countyCOde.value = result.countyCOde
        fullLocation.value = result.fullLocation

    }

    return {
        fullLocation,
        changeCIty
    }

  }
}
</script>

<style lang="less" scoped>
.g-name {
    font-size: 20px;
    color: black;
}
.g-desc {
     color: rgb(81, 81, 81);
        margin-top: 10px;
}
.g-price {
    margin-top: 10px;
    span {
        &::before {
            content: "￥";
            font-size: 14px;
        }
        &:first-child {
            color: @priceColor;
            font-size: 20px;
        }
        &:last-child {
            text-decoration: line-through;
            margin-left: 10px;
            color: #999;
            font-size: 16px;
        }
    }
}
.g-service {
    width: 500px;
    background-color: #f5f5f5;
    padding: 20px 10px 0 10px;
    margin-top: 10px;
    dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        dt {
            width: 50px;
            color:#999;
        }
        dd {
            color: #666;
            &:last-child {
                span {
                    margin-right: 10px;
                    &::before {
                        content: "•";
                        color: @xtxColor;
                        margin-right: 2px;
                    }
                }
                a {
                    color: @xtxColor;
                }
            }
        }
    }
}
</style>