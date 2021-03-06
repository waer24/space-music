<template>
  <div class="player-wrap" v-show="playList.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="bg">
          <img alt="" width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top" ref="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="singer"> {{currentSong.singer}}</h2>
        </div>
        <div class="middle" ref="middle" @touchstart.prevent="middleMoveStart" @touchmove.prevent="middleMoveEnter" @touchend="middleMoveEnd">
          <!-- 左边 -->
          <div class="middle-lf" ref="middleLf">
            <div class="cd-wrap" ref="cdWrapper">
              <div class="cd rotate" :class="cdCls">
                <img class="disc" alt="" :src="currentSong.image">
              </div>
            </div>
            <div class="lyrics-wrap">
              <p class="lyrics">{{playingLyric}}</p>
            </div>
          </div>
          <!-- 右边 -->
          <scroll class="middle-rt" ref="lyriclist" :scroll-data="currentLyric && currentLyric.lines">
            <div class="lyric-wrap">
              <div class="content" v-if="currentLyric">
                <p class="text" ref="lyricLine" v-for="(line, index) in currentLyric.lines" :key="index" :class="{'active':currentLineNum === index}">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="disc-dot-wrap">
            <span class="dot" :class="{'active': middleShow === 'cd'}"></span>
            <span class="dot" :class="{'active': middleShow === 'lyric'}"></span>
          </div>
          <div class="process-stripe">
            <span class="time lt">{{formatTime(currentTime)}}</span>
            <progress-bar :percent="percent" @pregressChange="pregressPercentChange" @pregressChanging="pregressPercentChanging"></progress-bar>
            <span class="time rt">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="operators" ref="operators">
            <div class="icon" @click="changeIconMode">
              <i :class="iconMode"></i>
            </div>
            <div @click="prev" class="icon" :class="disableCls">
              <i class="icon-prev"></i>
            </div>
            <div @click="togglePlay" class="icon" :class="disableCls">
              <i :class="playIcon"></i>
            </div>
            <div @click="next" class="icon" :class="disableCls">
              <i class="icon-next"></i>
            </div>
            <div class="icon">
              <i @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="mini-play-inner">
          <!-- :class="cdCls": 增加play / pause  -->
          <div class="mini-pic rotate" :class="cdCls">
            <img width="40" height="40" class="img" alt="" :src="currentSong.image">
          </div>
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}} </p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i class="mini" @click.stop="togglePlay" :class="playIconMini"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist icon-color"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio ref="audio" id="playAudio" :src="currentSong.url" @timeupdate="timeupdate" @ended="end" @error="error" @play="ready"></audio>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions,
  } from 'vuex'
  import animations from 'create-keyframe-animation'
  
  import progressBar from '@/base/progress-bar/progress-bar'
  import Lyric from 'lyric-parser'
  import progressCircle from '@/base/progress-circle/progress-circle'
  import scroll from '@/base/scroll/scroll'
  import playlist from '@/components/playlist/playlist'
  import {
    playMode
  } from '@/common/js/config'
  import {
    shuffle
  } from '@/common/js/utils'
  import {
    changeMode
  } from '@/store/actions'
  import {
    prefixStyle
  } from '@/common/js/dom'
  import {
    playerMixin
  } from '@/common/js/mixin'
  
  
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  const topMarginTop = 20
  export default {
    mixins: [playerMixin],
    data() {
      return {
        songReady: false, // 设置歌曲的准备状态的标示符号
        currentTime: 0,
        playingLyric: '', // cd 下面正在播放的歌词
        radius: 32,
        currentLyric: null, // 默认歌词为空
        currentLineNum: 0, // 当前显示第几行歌词
        middleShow: 'cd'
      }
    },
  
    created() {
      this.touch = {},
       //当初始的HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。
       //用于ios下无法自动播放音乐的问题
      document.addEventListener('DOMContentLoaded', function() {
        function audioAutoPlay() {
          var musicEle = document.getElementById('playAudio')
          musicEle.play()
        }
        audioAutoPlay()
      })
      
      // 触摸屏幕就自动播放歌曲，用于ios下无法自动播放音乐的问题
      /* document.addEventListener('touchstart', function () {
       function audioAutoPlay() {
          var musicEle = document.getElementById('playAudio')
          musicEle.play()
        }
        audioAutoPlay()
      }) */
      
    },
    
    computed: {
     
      playIcon() {
        return this.playing ? 'icon-play' : 'icon-pause'
      },
      playIconMini() {
        return this.playing ? 'icon-play-mini' : 'icon-pause-mini'
      },
      cdCls() {
        // 'play pause'是为了防止暂停后，旋转的角度归零，不是从当前停止的旋转角度开始
        return this.playing ? 'play' : 'play pause'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      iconMode() { // 更换icon
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      
       ...mapGetters([ // 都是从getter.js中获得
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'singer',
        'mode',
        'sequenceList'
  
      ]),
    },
  
  
    methods: {
      back() {
        this.setFullScreen(false); // 沿用mutation的flag状态
        // console.log("back " + this.fullScreen ) // undefined
      },
      open() {
        this.setFullScreen(true);
      },
      /* show(el) {
        el.style.display = ''
      }, */
  
      ...mapMutations({ // 关闭全屏需要改变mutation的状态
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setSequenceList: 'SET_SEQUENCE_LIST'
      }),
      showPlaylist() {
        this.$refs.playlist.show()
      },
      enter(el, done) {
        const {
          x,
          y,
          scale
        } = this._getPosAndScale()
        // console.log('x ' +x)
        // console.log('y ' +y)
  
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          preserts: {
            duration: 8000,
            easing: 'linear',
          }
        })
        // animations.runAnimation(el, 'move', done之后的 )
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
  
      },
      afterEnter(el) {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el) {
        this.$refs.cdWrapper.style.translation = 'all 0.4s'
        const {
          x,
          y,
          scale
        } = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  
      },
      afterLeave(el, done) {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      // 控制音乐播放
      togglePlay() {
        if (!this.songReady) {
          return // 当audio资源没有准备好，就不让播放，等到audio资源ok，才准备播放 
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) { // 歌曲暂停时，歌词暂停播放
          this.currentLyric.togglePlay()
        }
      },
      // 上一曲
      prev() {
        if (!this.songReady) {
          return // 当audio资源没有准备好，就不让播放，等到audio资源ok，才准备播放 
        }
        if (this.playList.length === 1) {
          this.loop()
        } else {
          let index = this.currentIndex - 1
          if (index === 0) {
            index = this.playList.length - 1
          }
          is.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlay()
          }
        }
        this.songReady = false
  
      },
      // 下一曲
      next() {
        if (!this.songReady) {
          return // 当audio资源没有准备好，就不让播放，等到audio资源ok，才准备播放 
        }
        if (this.playList.length === 1) {
          this.loop()
        } else {
          let index = this.currentIndex + 1
          if (index === this.playList.length - 1) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlay()
          }
        }
        this.songReady = false
      },
  
      ready() {
        this.songReady = true
        this.savePlayHistory(this.currentSong)
      },
  
      // 当播放资源出错
      error() {
        this.songReady = true // 保证在错误的情况下点击下一首，也能快速播放
      },
      end() {
        if (this.mode === playMode.loop) { // 循环模式下结束之后不做下一曲播放（当前时间置为0）
          this.loop()
        } else {
          this.next()
        }
      },
  
      listerenPassive() { // 解决Unable to preventDefault inside passive event listener due to target being treated as passive.的问题
        let preventSupport = false
        try {
          let options = Object.defineProperty({}, "passive", {
            get: function() {
              preventSupport = true
            }
          })
          window.addEventListener(this.$refs.operators, null, options)
        } catch (err) {}
      },
  
      formatTime(time) {
        time = time | 0
        let m = time / 60 | 0
        let s = this._pad(time % 60)
        return `${m}:${s}`
      },
  
      timeupdate(e) { // target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
        this.currentTime = e.target.currentTime // 保证时间的更新
      },
  
      // 获取歌词
  
      // 接受进度条组件的emit（）
      pregressPercentChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        // console.log(currentTime)
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
        if (!this.playing) {
          this.togglePlay()
        }
      },
      // 正在拖动的时候，歌词也要体现出滚动的变化
      pregressPercentChanging(percent) {
        const currentTime = this.currentSong.duration * percent
        // this.$refs.audio.currentTime = currentTime
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },
  
      // 点击切换播放模式
      changeIconMode() {
        const mode = (this.mode + 1) % 3 // 点击一个icon换一个模式，0，1，2
        this.setPlayMode(mode)
        let list = null
        if (this.mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.setSequenceList(list)
        this.resetCurrentIndex(list) // 保证切换模式时，当前播放歌曲不变
  
      },
      resetCurrentIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index) // 向vuex传递
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        if (this.currentLyric) {
          this.currentLyric.seek(0) // 歌词重新播放
        }
      },
      // 歌词播放
      getLyric() {
        this.currentSong.getLyric().then((lyric) => { // 数据中的lyric
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.lyricHandle)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          this.currentLyric = null
          this.currentLineNum = 0
          this.playingLyric = ''
        })
      },
      lyricHandle({
        lineNum,
        txt
      }) { // 歌词滚动
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5] // 保证当前的歌词位于手机中间
          this.$refs.lyriclist.scrollToElement(lineEl, 1000) // 有就跳到那个元素
        } else {
          this.$refs.lyriclist.scrollTo(0, 0, 1000) // 没有就滚动到第一行
        }
        this.playingLyric = txt
      },
  
      // 页面中间左右切换
      middleMoveStart(e) {
        this.touch.initiated = true
        this.touch.moved = false // 用来判断是否是一次移动
        this.touch.startX = e.touches[0].pageX
        this.touch.startY = e.touches[0].pageY
        // console.log(this.touch.startY)
      },
      middleMoveEnter(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const deltaY = e.touches[0].pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.middleShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        // this.$refs.lyriclist.style[transform] 会报错： Cannot set property 'webkitTransform' of undefined
        this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        this.$refs.lyriclist.$el.style[transitionDuration] = 0
        this.$refs.middleLf.style.opacity = 1 - this.touch.percent
        this.$refs.middleLf.style[transitionDuration] = 0
  
      },
      middleMoveEnd() { // 先通过设置元素值，再把元素值放在元素的样式中
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.middleShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.middleShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
            this.middleShow = 'cd'
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.middleShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetWidth}px, 0,0)`
        this.$refs.lyriclist.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleLf.style.opacity = opacity
        this.$refs.middleLf.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
     
  
      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingWidth = 10
        const paddingTop = 80
        const paddingBottom = 30
        const width = window.innerWidth * 0.8
        const Height = window.innerHeight - paddingTop
        const scale = targetWidth / width
        const x = -(width / 2 - paddingLeft) // 大的播放器变为小的播放器，前左移动，是负值
        const y = Height - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
  
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < 2) {
          num = '0' + num
          len++
        }
        return num
      },
      ...mapActions([
        'savePlayHistory'
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) { // 切换新歌，歌词也更换
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
  
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric() // 调用
        }, 1000)
  
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => { // 等dom 加载完毕
          newPlaying ? audio.play() : audio.pause()
        })
      },
    },
    components: {
      progressBar,
      progressCircle,
      scroll,
      playlist,
    }
  }
</script>

<style lang="scss" scoped>
  .player-wrap {
    .normal-player {
      /* 不放在player-wrap中是为了关闭全屏时，miniplay能显示出来 */
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: $color-background;
      color: $color-text;
      overflow: hidden;
      height: 100%;
      z-index: 150; // 因为有多个页面的显示隐藏，需要用这个来控制，根据前后的顺序来确定值的范围
      .bg {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        opacity: 0.8;
        filter: blur(2rem);
        -webkit-filter: blur(2rem);
      }
      .top {
        margin-bottom: 2rem;
        .back {
          position: absolute;
          top: 0;
          left: 1rem;
          padding: 1rem;
          transform: rotate(-90deg);
          .icon-back {
            color: $color-theme;
            @include fs(2.2rem);
          }
        }
        .title,
        .singer {
          width: 70%;
          margin: 0 auto;
          @include fs(1.8rem);
          font-weight: 400;
          text-align: center;
          padding: 0.8rem 0;
          @include no-wrap;
        }
        .singer {
          @include fs(1.4rem);
        }
      }
      .middle {
        position: fixed;
        top: 8rem;
        bottom: 17rem;
        width: 100%;
        font-size: 0;
        white-space: nowrap;
        .middle-lf {
          position: relative;
          width: 100%;
          display: inline-block;
          padding-top: 80%;
          height: 0; // 高度由paddingtop表示
          vertical-align: top;
          .cd-wrap {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd {
              position: absolute;
              left: 0;
              top: 0;
              overflow: hidden;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 1rem solid $color-disc-border;
              border-radius: 50%;
              &.play {
                animation: rotate 20s linear infinite;
              }
              &.pause {
                animation-play-state: paused;
              }
              .disc {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
              }
            }
          }
          .lyrics-wrap {
            width: 80%;
            margin: 3rem auto 0;
            text-align: center;
            height: 5rem;
            .lyrics {
              @include fs(1.4rem);
              overflow: hidden;
              white-space: nowrap;
              color: $color-text-self;
              height: 100%;
              text-align: center;
              line-height: 5rem;
            }
          }
        }
        .middle-rt {
          display: inline-block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          vertical-align: top;
          .lyric-wrap {
            width: 80%;
            overflow: hidden;
            margin: 0 auto;
            text-align: center;
            .content {
              .text {
                @include fs(1.4rem);
                line-height: 3.2rem;
                text-align: center;
                color: $color-text-self;
                &.active {
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 5rem;
        width: 100%;
        .disc-dot-wrap {
          margin: 0.5rem auto;
          height: 0.8rem;
          text-align: center;
          .dot {
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            margin: 0 0.2rem;
            border-radius: 0.4rem;
            background-color: $color-text-l;
            &.active {
              width: 2rem;
              border-radius: 0.3rem;
              background-color: $color-text-ll;
            }
          }
        }
        .process-stripe {
          width: 80%;
          margin: 0 auto;
          padding: 0.4rem 0;
          display: flex;
          line-height: 3rem;
          .time {
            @include fs(1.2rem);
            color: $color-text;
            flex: 0 0 3rem;
          }
          .lf {
            text-align: left;
          }
          .rt {
            text-align: right;
          }
        }
        .operators {
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            margin: 0 1.8rem;
            font-size: 3rem;
            &.disable {
              color: $color-theme-d
            }
          }
        }
      }
      &.normal-enter-active,
      &.normal-leave-active {
        transition: all 0.4s;
        .top,
        .bottom {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
        }
      }
      &.normal-enter,
      &.normal-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -10rem, 0)
        }
        .bottom {
          transform: translate3d(0, 10rem, 0)
        }
      }
    }
    .mini-player {
      background-color: darkred;
      display: flex;
      align-items: center;
      height: 6rem;
      position: fixed;
      bottom: 0;
      left: 0;
       z-index: 100; // 有了它才能显示
      width: 100%;
      .mini-play-inner {
        flex: 0 0 4rem;
        padding: 0 1rem 0 2rem;
        .mini-pic {
          width: 4rem;
          height: 4rem;
          &.play {
            animation: rotate 20s linear infinite
          }
          &.pause {
            animation-play-state: paused
          }
          .img {
            border-radius: 50%;
          }
        }
      }
      .text {
        flex: 1;
        overflow: hidden;
        .name {
          color: $color-text;
          @include fs(1.4rem);
          font-weight: 400;
          @include no-wrap;
        }
        .desc {
          @include fs(1.2rem);
          padding-top: 0.2rem;
          color: $color-text-d;
        }
      }
      .control {
        flex: 0 0 3rem;
        font-size: 3rem;
        width: 3rem;
        padding: 1rem 1rem;
        .mini {
          font-size: 3.2rem;
          position: absolute;
          left: 0;
          top: 0;
          color: $color-theme-d;
        }
        .icon-color {
          color: $color-theme-d;
        }
      }
      &.mini-enter-active,
      &.mini-leave-active {
        transition: all 0.4s;
      }
      &.mini-enter,
      &.mini-leave-to {
        opacity: 0;
      }
    }
    @keyframes rotate {
      from {
        -webkit-transform: rotate(0deg)
      }
      to {
        -webkit-transform: rotate(360deg)
      }
    }
  }
</style>


