import request from '@/utils/request'

/**
 * 添加收货地址
 * @returns
 */
 export const addAddress = ({name, region, detailedly, postcode, phone}) => {
  return request('/address', 'post', { name, region, detailedly, postcode, phone })
}

/**
 * 获取收货地址
 * @returns
 */
export const getAddress = () => {
  return request('/address', 'get')
}

/**
 * 删除收货地址
 * @returns
 */
 export const deleteAddress = (id) => {
  return request(`/address/${id}`, 'delete')
}

/**
 * 设置默认收货地址
 * @returns
 */
 export const setDefaultAddress = (id) => {
  return request(`/address/${id}`, 'put')
}

