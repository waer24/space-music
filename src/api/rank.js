import jsonp from '@/common/js/jsonp'
import { commonParams, options} from './config'

export function getMusicList(topid){
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
     tpl: 3,  
     page: 'detail',
     topid,
     type: 'top',
     hostUin: 0,
     needNewCode: 0,
     platform: 'yqq',
  })
  return jsonp(url, data, options)
}
export function getMusicList2(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}