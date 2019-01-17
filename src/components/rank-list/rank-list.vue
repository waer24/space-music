<template>
  <div class="rank-list-wrap" >
    <music-list @is-songs="songs" :is-title="title" :is-bg-img="bgImg"></music-list>
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
      songs: []
    }
  },
   computed: {
     title() {
       console.log(this.topList.topTitle)
       return this.topList.topTitle
     },
     bgImg() {
       if(this.songs.length) {
         console.log(this.songs[0].image)
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
        console.log(this.songs)
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
      // console.log("this ret  " + ret)
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

