import request from '@/utils/request'

/**
 * 修改用户名
 * @param {String} user_name - 用户名
 * @returns
 */
export const updateName = ({ user_name}) => {
  return request('/user/updateName', 'put', { user_name })
}

/**
 * 修改用户性别 
 * @param {String} sex - 用户性别
 * @returns
 */
 export const updateSex = ({ sex}) => {
  return request('/user/updateSex', 'put', { sex })
}

/**
 * 修改用户生日 
 * @param {String} birthday - 用户出生年月
 * @returns
 */
 export const updateBirthday = ({ birthday}) => {
  return request('/user/updateBirthday', 'put', { birthday })
}

/**
 * 修改用户密码
 * @param {String} password - 用户新密码
 * @returns
 */
 export const updatePassword = ({ password}) => {
  return request('/user/updatePassword', 'put', { password })
}

/**
 * 获取系统消息
 * @returns
 */
 export const getSysMessage = () => {
  return request('/user/sysMessage', 'get')
}