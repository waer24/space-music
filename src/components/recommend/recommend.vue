<template>
<div class='recommend-wrap'>
  <!-- 不加length 会造成事件先于渲染的dom，无法获取所有slider-item的宽度 -->
    <div class='bg-hide'></div>
      <div v-if='recommends.length' class='slider-wrap'> 
      <slider>
        <!-- vfor是slot中的轮播图展示 -->
          <div v-for="item in recommends" :key='item.id' >
          <a :href="item.linkUrl" >
            <img :src="item.picUrl" alt="" class="slider-img">
          </a>
        </div>
      </slider>
    </div>
    
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
  import { getWallSwiper, getDiscList } from '@/api/recommend.js'
  import { ERR_OK } from '@/api/config'
  import slider from '@/base/slider/slider'


  export default {
    data(){
      return {
        recommends: []
      }
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
          
      this.recommends =  res.data.slider
         // console.log(recommend)
        }
      })
    }
  },

  components: {
    slider
  }
  }

</script>

<style lang="sass" scoped>
.recommend-wrap 
  margin-top: 1rem
  position: fixed
  width: 100%
  top: 8.8rem
  bottom: 0
  .bg-hide
    position: fixed
    width: 100%
    overflow: hidden
  .slider-wrap
    position: relative
    width: 100%
    overflow: hidden
    .slider-img
      display: block
      width: 100%
      height: 100%

</style>
