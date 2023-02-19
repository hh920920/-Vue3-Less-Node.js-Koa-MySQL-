// 封装购物车相关的API函数
import request from '@/utils/request'

/**
 * 获取购物车列表
 * @returns
 */
export const findCart = () => {
  return request('/user/cart', 'get')
}

/**
 * 加入购物车
 * @returns
 */
export const inserCart = ({ goods_id, sku_id, goods_name, picture, price, count }) => {
  return request('/user/cart', 'post', { goods_id, sku_id, goods_name, picture, price, count })
}
