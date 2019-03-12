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
    createSongs,isValidMusic, processSongsUrl
  } from '@/common/js/song'
  import {
    ERR_OK
  } from '@/api/config'
  
  export default {
  
    computed: {
      title() {
        // console.log(this.disc)
        return this.disc.dissname
      },
      bgImg() {
        return this.disc.imgurl
      },
      ...mapGetters(['disc']) // 获取磁盘的数据
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
       this._getSongList()
    },
    methods: {
       _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => { // 推荐列表点击进去的各个歌曲列表
          if (res.code === ERR_OK) {
               console.log(res)
              this.songs = this._normalizeSongs(res.cdlist[0].songlist)
             /*  processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
              this.songs = songs
            }) */
          }
        })
      }, 
      _normalizeSongs(list) {
        let ret = []
        Array.from(list).forEach((musicData) => {
          if (isValidMusic(musicData)) {
            ret.push(createSongs(musicData))
          }
        })
        return ret
      },
    },
     components: { // 之前把components放在了methods中，出现[Vue warn]: Error in nextTick: "TypeError: fn.bind is not a function"一直没发现
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
