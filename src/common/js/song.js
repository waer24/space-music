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
      url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46` // 播放
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