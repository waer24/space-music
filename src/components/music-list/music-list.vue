<template>
<div class="music-list-wrap">
  <div class="back" @click="back()">
    <i class="icon icon-back"></i>
  </div>
  <h1 class="title" > {{isTitle}}</h1>
  <div class="bg-img" ref="bgImg" :style="bgStyle">
    <div class="filter"></div>
    <div class="play-wrap">
      <div class="play">
        <i class="icon icon-play"></i>
      <span class="text">随机播放全部</span>
      </div>
    </div>
  </div>
  <!-- 用于向上滚动的layer层 -->
  <div class="bg-layer"></div>
    <scroll :probe-type="probeType"
          :scroll-data="isSongs" 
          :listen-scroll="listenScroll"
         class="list" ref="listScroll"
        
          >
    <div class="song-list-wrap">
    <song-list :is-songs="isSongs"></song-list>
  </div>
  </scroll>
  
  
</div>
</template>

<script>
import scroll from '@/base/scroll/scroll'
import songList from '@/base/song-list/song-list'



  export default {
   
    props: {
    isSongs: {
      type: Array,
      default() { [] }
    },
     isTitle: {
        type: String,
        default: ''
      },
      isBgImg: {
        type: String,
        default: ''
      },
    },
    // 为什么created和mounted在创建变量时要用this，用了this可以在整个组件中引用，用let只能在当前的钩子函数中引用
    created() { 
      this.probeType = 3,
      this.listenScroll = true
      
    },
  // 用于一开始就要执行的函数，函数放在created中会报错
    mounted(){
      /* 默认高度为0，展示的高度取决于背景图高度，背景图高多少，listscroll实际就偏离多少 */
     // let imageHeight=  this.$refs.bgImg.clientHeight
    console.log(this.$el)
       this.$refs.listScroll.$el.style.top=  `${imageHeight}px`
    },
    computed: {
      bgStyle(){
        // this.$refs.bgImg.style.backgroundImage = `${isBgImg}`
        return `background-image: url(${this.isBgImg})`
      },
    },

    methods: {
      back(){
        
        return this.$router.back()
      }
    },

    components: {
       songList,
       scroll,
    }
  }
</script>

<style lang="scss" scoped>
@import '../../common/style/fonts.css';

.music-list-wrap {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
  .back {
    padding: 1rem;
    position: absolute;
    top: 1.2rem;
    left: 0.6rem;
    z-index: 1000;
    .icon-back {
      padding: 1rem;
    }
  }
  .title {
    text-align: center;
    color: #fff;
    @include fs(1.6rem);
    font-weight: 400;
    position: absolute;
    left: 10%;
    right: 0;
    z-index: 1000;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .bg-img{
    position: relative;
    padding-top: 70%;
    background-size: cover;
    transform-origin: top;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, .4)
    }
    .play-wrap {
      position: absolute;
      bottom: 2rem;
      left: 0;
      right: 0;
      text-align: center;
      .play {
        box-sizing: border-box;
        width: 13.5rem;
        margin:0 auto;
        @include fs(1.2rem);
        padding: 0.7rem 0.4rem;
        
        border: 0.1rem solid $color-theme;
      border-radius: 10rem;
      color: $color-theme;

        .icon {
          @include fs(1.6rem);
          margin-right: 0.4rem;
          vertical-align: middle;
        }
      }
      .text {
        vertical-align: middle;
      }
    }
  }
  .list {
   position: fixed;
   top: 0;
      bottom: 0;
      width: 100%;
    .song-list-wrap {
      padding: 2rem 3rem;
    }
  }
}
</style>
