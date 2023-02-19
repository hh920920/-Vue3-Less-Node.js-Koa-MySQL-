<template>
  <div class="xxm-cart">
    <div class="container">
      <!-- 面包屑 -->
      <xxm-bread>
        <xxm-bread-item to="/">首页</xxm-bread-item>
        <xxm-bread-item>购物车</xxm-bread-item>
      </xxm-bread>
      <!-- 购物车列表 -->
      <div class="empty"></div>
      <div class="cart">
        <table>
          <!-- 头部 -->
          <thead>
            <tr>
              <th width="120">
                <XxmCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XxmCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品内容 -->
          <!-- 如果没有登录 -->
          <tbody v-if="!isLogin">
            <td colspan="6">
              <CartNone />
            </td>
          </tbody>
          <!-- 已登录则加载显示购物车商品列表 -->
          <tbody v-else>
            <tr v-for="item in cartList" :key="item.skuId">
              <td>
                <XxmCheckbox @change="($ev) => checkItem(item.skuId, $ev)" :modelValue="item.selected" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="item.picture" alt=""></RouterLink>
                  <div class="goodsInfo">
                    <p class="name ellipsis">{{ item.goods_name }}</p>
                    <!-- 选择规格组件 -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.price }}</p>
              </td>
              <td class="tc">
                <XxmNumbox @change="($event) => updateCount(item.skuId, $event)" :modelValue="item.count" />
              </td>
              <td class="tc">
                <p class="f16 price">&yen;{{ Math.round(item.price*100) * item.count/100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" @click="deleteCart(item.skuId)" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XxmCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XxmCheckbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已选择 {{ $store.getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="totalPrice price">¥ {{ $store.getters['cart/selectedAmount'] }}</span>
          <XxmButton type="primary">下单结算</XxmButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import CartNone from './components/cart-none.vue'
import { nextTick, ref } from 'vue'
import { findCart } from '@/api/cart'
import Confirm from '@/components/confirm'
import Message from '@/components/Message'
export default {
  name: 'XxmCart',
  components: {
    CartNone
  },
  setup() {
    const store = useStore()
    const isLogin = ref(false)
    let cartList = ref(null)
    const token = localStorage.getItem('xxm-pc-access_t')
    if (token) {
      isLogin.value = true
      // 获取购物车列表
      findCart().then(res => {
        nextTick(() => {
          cartList.value = res.data
        })
      })
    }

    // 单选
    const checkItem = (skuId, selected) => {
      console.info(skuId, selected);
      store.dispatch('cart/updateCart', { skuId, selected })
    }

    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }

    // 修改数量
    const updateCount = (skuId, count) => {
      // console.info(skuId,count);
      store.dispatch('cart/updateCart', { skuId, count })
    }


    // 删除单条函数
    const deleteCart = (skuId) => {
      // store.dispatch('cart/deleteCart', skuId)
      Confirm({ title: '温馨提示', text: '确认删除此商品吗？' }).then(() => {
        store.dispatch('cart/deleteCart', skuId).then(() => {
          Message({ type: 'success', text: '删除成功' })
        })
      }).catch(e => {
        Message({ type: 'error', text: '删除失败' })
      })
    }

    return { isLogin, checkItem, checkAll, deleteCart, updateCount, cartList }
  }
}
</script>
<style lang="less" scoped>
.price {
  color: @priceColor;
}
.xxm-cart {
  .cart {
    background: #fff;
    color: #666;
    table {
      // 设置表格的边框间距：
      border-spacing: 0;
      border-collapse: collapse; // 当属性的值为“collapse”时,表示边框会被合并
      line-height: 24px;
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      //   商品内容列表
      tbody {
        width: 400px;
        height: 400px;
        overflow: auto;
        background-color: #fff;
        .goods {
          display: flex;
          align-items: center;
          img {
            width: 100px;
            height: 100px;
          }
          .goodsInfo {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;
          }
        }
        .tc {
          text-align: center;
          .xtx-numbox {
            margin: 0 auto;
            width: 120px;
          }
          .green {
            color: @themeColor;
          }
        }
      }
    }
  }
  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    .xtx-checkbox {
      color: #999;
    }
    .batch {
      padding-left: 30px;
      a {
        margin-left: 20px;
      }
    }
    .total {
      padding-right: 30px;
      .totalPrice {
        font-weight: bold;
        margin-right: 20px;
      }
    }
  }
}
</style>