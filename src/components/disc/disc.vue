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
    createSongs,
  } from '@/common/js/song'
  import {
    ERR_OK, STATUS_OK
  } from '@/api/config'
  
  export default {
  
    computed: {
      title() {
        return this.disc.name
      },
      bgImg() {
        return this.disc.pic
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
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.id).then((res) => {
          if( res.code === STATUS_OK) {
             let songs = res.data.songs
            this.songs = songs
          }
        })
      },  
     /*  old api:
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res)).then((songs) => {
            console.log(res.cdlist[0])
            this.songs = songs
          })
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
      }, */
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
