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
  param: 'jsonpCallback'
}

export const ERR_OK = 0

// 没有被引用, 仅作为查址方便
export const musicAddress = {
  // 封面轮播图
  musicWall: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
  // 歌单
  discList: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
  // 'http://ustbhuangyi.com/music/api/getDiscList',

  // 歌手
  singer: 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg'
   
}