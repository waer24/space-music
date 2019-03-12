import { getLyric, getSongsUrl } from '@/api/song'
import { ERR_OK } from '@/api/config'
import {Base64} from 'js-base64'
  export default class Song {
  constructor({id, mid, name, singer, album,duration, image, url}) {
    this.id = id, // 实例化，绑定到当前vue的实例
    this.mid = mid,
    this.name = name,
    this.singer = singer,
    this.album = album,
    this.duration = duration,
    this.image = image,
    this.url = url
   
  }
  // 从接口中获取歌词 ,作为一个方法封装在song中,lyric本身就是返回一个promise，解析它，其他的组件只需用lyric parse再调用就行
  getLyric() {
    if (this.lyric) {
       return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if(res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
         // console.log(this.lyric) // 歌词已经可以解析
        } else {
          reject('no lyric')
        }
      })
    } )
    
  }
 
 } 
 /* 之前忘记写{}导致取不到song里面的各个值 */
 
  export function createSongs(musicData) {
    return new Song({
      id: musicData.songid, // songid等这些变量名都是从qq音乐 list中取的
      mid: musicData.songmid,
      name: musicData.songname,
      singer:filterSinger(musicData.singer),
      album: musicData.albumname,
      duration: musicData.interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`, // 专辑封面图，用于播放列表
      url: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${musicData.songmid}&br=192`, // 获取播放源
      // lyric: `https://api.bzqll.com/music/tencent/lrc?key=579621905&id=${musicData.songmid}` //歌词不能这样子写，这样带过去无法传参
      // url 很多被封了，这个地址来源于https://www.bzqll.com/2019/01/262.html
    })

    
}  

export function filterSinger(singer){
  let ret = []
  if ( !singer ) {
    return ''
  } 
  Array.from(singer).forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function isValidMusic(musicData) { // 判断是否为有效歌曲（新增了判断收费歌曲）
  return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

/* export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((res) => {
    if (res.code === ERR_OK) {
      let midUrlInfo = res.url_mid.data.midurlinfo
      midUrlInfo.forEach((info, index) => {
        let song = songs[index]
        song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
      })
    }
    return songs
  })
} */



 
