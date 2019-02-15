import {
  commonParams,
  options,
} from './config'
import jsonp from '@/common/js/jsonp'
import Axios from 'axios';

// 热门搜索
export function hotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({},commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    inCharset: 'utf-8',
    outCharset: 'utf-8'
  })
   return jsonp(url, data, options)
}

// input框搜索
export function search(query, page, zhida, perpage) {
  const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp` // 用了视频作者的地址 原地址禁止跨域访问：https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    n: perpage,
    perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return Axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res.data)
    return Promise.resolve(res.data)
  })
}

