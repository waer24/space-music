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

export function getDiscList() {
  const url = `https://api.bzqll.com/music/tencent/hotSongList`
  const data = Object.assign({},  {
    key: '579621905',
    categoryId: 10000000,
    sort: 3,
    limit: 60
  })
  return axios.get(url,{
    params: data,
  }).then((res) => {
   // console.log(res.data)
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

export function getSongList(listId) {
  const url = ` https://api.bzqll.com/music/tencent/songList`
  const data = Object.assign({}, {
    key: '579621905',
    id: listId
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
} 
// old api: 获取歌单 
/* export function getDiscList() {
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
   不用这个是因为返回的格式不是jsonp的格式，是一个json对象
 return jsonp(url, data, options) 
  使用ajax请求，这里用axios
return axios.get(url,{
  params: data
}).then ((res) => {
     成功返回一个Promise对象
  return Promise.resolve(res.data)
}).catch((e) => {
  console.log(e)
}) 
} */

// old api: 获取歌单中的所有曲目
// disstid 是从每个歌单点击进去，由dissid的参数传递的
/* export function getSongList(disstid) {
  const url = '/api/getSongList'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
   现在不能用jsonp的方式返回了，会提示Uncaught ReferenceError: jp1 is not defined
  jp1 是个默认的回调名称，自增1，jp2 ，jp3，因此最好用axios代理，或者修改第三方库jsonp
  
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res.data)
    return Promise.resolve(res.data)
  })
} */

