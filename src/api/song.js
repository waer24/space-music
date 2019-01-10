import axios from 'axios'

export function getSongsUrl(urlId) {
  const url = `https://api.bzqll.com/music/tencent/url`
  const data = Object.assign({}, {}, {
    key: '579621905',
    id: urlId,
    br: 192
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
  //  console.log(res.data)
    return Promise.resolve(res.data)
   
  }).catch((e) => {
    // console.log(e)  
  }) 
}

/* export function getSongsUrl(songs) {
  const url = debug ? '/api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'
  let mids = []
  let types = []
  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return new Promise((resolve, reject) => {
    let tryTime = 3

    function request() {
      return axios.post(url, {
        comm: data,
        url_mid: urlMid
      }).then((response) => {
        const res = response.data
        if (res.code === ERR_OK) {
          let urlMid = res.url_mid
          if (urlMid && urlMid.code === ERR_OK) {
            const info = urlMid.data.midurlinfo[0]
            if (info && info.purl) {
              resolve(res)
            } else {
              retry()
            }
          } else {
            retry()
          }
        } else {
          retry()
        }
      })
    }

    function retry() {
      if (--tryTime >= 0) {
        request()
      } else {
        reject(new Error('Can not get the songs url'))
      }
    }

    request()
  })
}
 */