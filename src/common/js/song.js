  import { getSongsUrl } from '@/api/song'
  
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
      url:  `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400004Z8Ihr0JIu5s.m4a?guid=4433254815&vkey=CA162E06FA6BE6041FBCAA23E4125C35EB916E23DF98E92C98C21D959B0D6277DE1648F93B0D0F57A5407532EA9E929EC9C1C029FFC7ACD3&uin=0&fromtag=38`, // musicData.url
      // `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46` // 播放
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

export function processSongsUrl(songs) {
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
}