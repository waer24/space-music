<template>
  <div class="music-list-wrap">
    <div class="back" @click="back">
      <i class="icon icon-back"></i>
    </div>
    <h1 class="title"> {{isTitle}}</h1>
    <div class="bg-img" ref="bgImg" :style="bgStyle">
      <div class="filter" ref="filter"></div>
      <div class="play-wrap" @click="randomPlay">
        <div class="play" ref="playBtn" >
          <i class="icon icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <!-- 用于向上滚动的layer层 -->
    <div class="bg-layer" ref="bglayer"></div>
    <scroll :probe-type="probeType" :scroll-data="isSongs" :listen-scroll="listenScroll" @scroll="scroll" class="list" ref="listScroll">
      <!-- 这个scroll事件来源于子组件传递的scroll -->
      <div class="song-list-wrap">
        <song-list @select="select" :is-songs="isSongs" :rank="rank"></song-list>
      </div>
      <div>
        <loading class="loading-container" v-show="!isSongs.length"></loading>
      </div>
    </scroll>
  
  
  </div>
</template>

<script>
  import scroll from '@/base/scroll/scroll'
  import songList from '@/base/song-list/song-list'
  import { prefixStyle} from '@/common/js/dom'
  import loading from '@/base/loading/loading'
  import { mapActions, mapGetters } from 'vuex'
  
  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop')
  
  export default {
    data() {
      return {
        scrollY: 0
      }
    },
  
    props: {
      isSongs: {
        type: Array,
        default () {
          []
        }
      },
      isTitle: {
        type: String,
        default: ''
      },
      isBgImg: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    // 为什么created和mounted在创建变量时要用this，用了this可以在整个组件中引用，用let只能在当前的钩子函数中引用
    created() {
      
      this.probeType = 3,
        this.listenScroll = true
  
    },
    // 用于一开始就要执行的函数，函数放在created中会报错
    mounted() {
      /* 默认高度为0，展示的高度取决于背景图高度，背景图高多少，listscroll实际就偏离多少 */
      // let imageHeight=  this.$refs.bgImg.clientHeight
      this.imageHeight = this.$refs.bgImg.clientHeight
      this.minImageHeight = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.listScroll.$el.style.top = `${this.imageHeight}px`
    },
    computed: {
      bgStyle() {
        // this.$refs.bgImg.style.backgroundImage = `${isBgImg}`
        return `background-image: url(${this.isBgImg})`
      },
      ...mapGetters([
        'playList',
        'currentIndex',
        'fullScreen',
      ])
    },
  
    methods: {
      back() {
        return this.$router.back()
      },
  
      scroll(pos) {
        this.scrollY = pos.y
      },
      select(item, index) { // 点击歌曲跳转到player页面，跳转是由vuex拉动的数据
       this.selectItemPlay({
         list: this.isSongs, // list 来源于actions.js中SET_PLAYLIST的list
         index,
       })
     //  console.log(this.isSongs) 
      },
      randomPlay(){
        this.randomModePlay({
          list: this.isSongs,
        
        })
       // console.log(this.isSongs)
        /* 跳转到play页面， 模式为random*/

      },
      ...mapActions([
        'selectItemPlay',
        'randomModePlay'
      ]),
    },
  
    watch: {
      scrollY(newY) {
        let translateY = Math.max(this.minImageHeight, newY) // 选取一个最大的
        let zIndex = 0 // 通过改变zindex， 高度，paddingtop实现上下滚动的特效
        let scale = 1 // 下拉的时候背景图要变大一下再变正常
        let blur = 0
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          zIndex = 10
          scale = 1 + percent
        } else {
          blur = Math.min(20, percent * 20)
        }
  
        this.$refs.bglayer.style[transform] = `translate3d(0, ${translateY}px, 0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
  
        if (newY < this.minImageHeight) {
          zIndex = 10 // 没有这个会覆盖, 注意它的写法
  
          this.$refs.bgImg.style.paddingTop = 0
          this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImg.style.paddingTop = `70%`
          this.$refs.bgImg.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImg.style[transform] = `scale(${scale})`
        this.$refs.bgImg.style.zIndex = zIndex
      }
  
    },
  
    components: {
      songList,
      scroll,
      loading
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
      top: 0;
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
      left: 20%;
      right: 0;
      z-index: 1000;
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
          padding: 0.8rem 0;
    }
    .bg-img {
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
          margin: 0 auto;
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
      position: absolute; // fixed; 会导致页面一直被占据再
      top: 0;
      bottom: 0;
      width: 100%;
      background: $color-background;
      .song-list-wrap {
        padding: 2rem 3rem;
      }
    }
    .bg-layer {
      position: relative;
      height: 100%;
      background-color: $color-background;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
