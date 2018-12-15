<template>
  <transition name="slide">
    <music-list :is-title="title" :is-bg-img="bgImg" :is-songs="songs">
  
    </music-list>
  </transition>
</template>

<script>
  import musicList from '@/components/music-list/music-list'
  import {
    mapGetters
  } from 'vuex'
  import {
    getSongList
  } from '@/api/recommend'
  import {
    createSong,
    isValidMusic,
    processSongsUrl
  } from '@/common/js/song'
  import {
    ERR_OK
  } from '@/api/config'
  
  export default {
  
    computed: {
      title() {
  
        return this.disc.dissname
      },
      bgImg() {
        console.log(this.disc)
        return this.disc.imgurl
      },
      ...mapGetters(['disc'])
    },
    data() {
      return {
        songs: []
      }
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
  
          // if (res.code === ERR_OK) {
  
  
          processSongsUrl(this._normalizeSongs(res)).then((songs) => {
            //  console.log(res.cdlist[0])
            this.songs = songs
          })
        })
      },
      _normalizeSongs(list) {
        let ret = []
        Array.from(list).forEach((musicData) => {
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
  
      // 渲染歌单曲目
      _getSongList2() {
        if (!this.disc.dissid) {
          this.$router.push(`/recommend`)
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          /*  
          返回的是jsonCallback(）的一堆杂乱无章的数据，通过在线解析json得知了许多参数,
          需要转化为json的格式 曲目： songlist */
          console.log(res)
          this.songs = res.cdlist[0].songlist
        })
      },
      normalizeSongList2(list) {
        let ret = []
        /* list 是一个node html 集合，不是真正的数组，要想依次循环，须有数组的属性
        用以下2中方法
        Array.prototype.forEach.call ：调用数组的属性
        Array.from(list).forEach： 转化为es6中数组属性 */
        Array.prototype.forEach.call(musicData => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createdSong(musicData))
          }
        });
        console.log(ret)
        //  return ret
      }
    },
  
    components: {
      musicList,
    }
  }
</script>

<style lang="scss" scoped>
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s
  }
</style>
