// 提供商品相关的API函数
import request from '@/utils/request'

/**
 * 获取商品信息
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { goods_id: id })
}

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
 export const findGoodsDetails = (id) => {
  return request('/goods/details', 'get', { goods_id: id })
}


/**
 * 获取相关推荐商品|猜你喜欢商品
 * @param {String} id - 商品ID，传入相关推荐，不传猜你喜欢
 * @param {Integer} limit - 商品数量
 */
export const findRelevantGoods = () => {
  return request('/goods/relevant', 'get')
}

/**
 * 商品按条件排序
 * @param {Integer} children_id - 二级分类ID
 * @param {String} condition - 条件参数（最新商品：latestTime，按销量：salesNum，按评论：evaluateNum，价格升序：asc，价格降序：desc）
 * @param {String} sort - desc为降序，asc为升序
 */
export const goodsSort = (children_id, condition, sort) => {
  return request('/goods/sort', 'get', { children_id, condition, sort  })
}

/**
 * 查询商品评价信息
 * @param {String} id - 商品ID
 * @returns
 */
export const findGoodsCommentInfo = (id) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // axios 遇见 http https 开头的地址，不会加上基准地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @returns
 */
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
