<template>
  <transition  name="slide">
    <music-list :is-title="title" :is-bg-img="bgImg" :is-songs="isSongs">
    </music-list>
  </transition>
</template>

<script>
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import musicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'
import { createSongs } from '@/common/js/song'


export default { 
  /* singerDetail 组件要把数据梳理好，music-list负责装载数据 */

   data() {
    return {
      isSongs: []
    } 
  },

  computed: {
    title() {
      return this.singer.name // 从singer页面中的singerData取数据
    },

     bgImg() {
      return this.singer.avatar 
    },

    ...mapGetters([
      'singer'
    ])
  },
  
  created() {
    this._getSingerDetail()
     // console.log(this.singer)
  },

  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
      getSingerDetail(this.singer.id).then((res) => {
        if ( res.code === ERR_OK ) {
      this.isSongs =  this._normalizeSong(res.data.list) // 此时的res.data.list还是没处理的原始数据
         console.log( this.isSongs) // 取到了数组
        }
        
      })
    },

    _normalizeSong(list) {
      let ret = []
      Array.from(list).forEach((item) => {
        let { musicData } = item
         if (musicData.songid && musicData.albummid ) {
           ret.push(createSongs(musicData))
         }
      })
       // console.log(ret)
      return ret
    }
  },

  components: {
    musicList,
   
  }

}
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>

