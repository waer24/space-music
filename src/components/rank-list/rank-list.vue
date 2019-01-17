<template>
  <div class="rank-list-wrap" >
    <!-- <music-list @is-songs="songs"></music-list> -->
  </div>
</template>

<script>
import musicList from '@/components/music-list/music-list'
import { getMusicList } from '@/api/rank'
import { mapGetters } from 'vuex'
import { ERR_OK }from '@/api/config'
export default {
  data() {
    return {
      songs: []
    }
  },
   computed: {
    ...mapGetters(['topList'])
  },
  created() {
    this._getMusicList()
  },

 


  methods: {
    _getMusicList() {
      console.log(this.topList)
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList).then((res) => {
         console.log(this.topList)
      if (res.code === ERR_OK) {
        this.songs = res.data
       // console.log(res.data)
      }
    })
     
    },
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

