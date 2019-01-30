<template>
  <div class="rank-list-wrap" >
    <music-list :is-songs="songs" :is-title="title" :is-bg-img="bgImg" :rank="rank"></music-list>
  </div>
</template>

<script>
import musicList from '@/components/music-list/music-list'
import { getMusicList } from '@/api/rank'
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'
import { createSongs } from '@/common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true, // 先声明一个值，默认为false，一直向下传，最终的组件song-list接收
    }
  },
   computed: {
     title() {
       return this.topList.topTitle
     },

     bgImg() {
         if(this.songs.length) {
           return this.songs[0].image
         }
     },
    ...mapGetters(['topList'])
  },

  created() {
    this._getMusicList()
  },

  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
      if (res.code === ERR_OK) {
        this.songs = this._normilizeSong(res.songlist)
      }
    })
    },
    _normilizeSong(list) {
      let ret = []
      Array.from(list).forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSongs(musicData)) // 增加createSongs的那些参数到list中
        }
      })
      return ret
    }
  },

  components: {
    musicList,
  }
}
</script>

<style lang="scss" scoped>
  .rank-list-wrap {
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    width:100%;
    background-color:$color-background;
  }
</style>

