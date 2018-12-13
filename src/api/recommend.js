import axios from 'axios'
import jsonp from '@/common/js/jsonp'
import { commonParams, options} from './config'
//获取歌曲列表的数据
//由于这里使用了代理请求，所以前端的请求要改成ajax请求

// 获取qq封面轮播
export function getWallSwiper() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
   return jsonp(url, data, options)
}

// 获取歌单
export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  // 不用这个是因为返回的格式不是jsonp的格式，是一个对象
  // return jsonp(url, data, options) 
  //使用ajax请求，这里用axios
return axios.get(url,{
  params: data
}).then ((res) => {
   //  成功返回一个Promise对象
  return Promise.resolve(res.data)
}).catch((e) => {
  console.log
}) 
}
