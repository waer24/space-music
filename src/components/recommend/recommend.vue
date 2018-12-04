<template>
  <div class='reco-wrap'>
    <ul class='content'>
      <li v-for='recommend in recommends' :key='recommend.id'>
        <img :src="recommend.picUrl" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  import { getWallSwiper, getDiscList } from '@/api/recommend.js'
  import { ERR_OK } from '@/api/config'

  export default {
    data(){
      recommends: []
    }, 

    created() {
    this._getWallSwiper() 
    this._getDiscList()
  },

  methods: {
    // 渲染歌单
    _getDiscList() {
      getDiscList().then((res) => {
        // console.log(res.data); 
      })
    },

    // 渲染推荐的swiper
    _getWallSwiper() {
      getWallSwiper().then((res) => {
        if (res.code === ERR_OK ) {
          
         const recommends =  res.data.slider
         // console.log(recommend)
        }
      })
    }
  }
  }

</script>