/* 从 https://y.qq.com/m/index.html qq音乐web版headers获取的公共参数 */
export const commonParams = {
  g_tk: 1293134536,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
   jsonp: "callback",
}

export const options = {
  // 定义前后端统一参数
  param:  'jsonpCallback'
}

export const optionFree = {
  // 定义前后端统一参数
  param:  ''
}
// old api: 定义成功的代码状态返回0, 首页滚动轮播还保留这个状态
 export const ERR_OK = 0

// 新api规定 返回成功的状态是200
export const STATUS_OK = 200
