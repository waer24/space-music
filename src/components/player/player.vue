<template>
  <div class="player-wrap" v-show="playList.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="bg">
          <img alt="" width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="singer"> {{currentSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-lf" style="display:none">
            <div class="cd-wrap" ref="cdWrapper">
              <div class="cd rotate" :class="cdCls">
                <img class="disc" alt="" :src="currentSong.image">
              </div>
            </div>
            <div class="lyrics-wrap">
              <p class="lyrics">{{currentSong.lyric}}</p>
            </div>
          </div>
          <div class="middle-rt">
            <div class="rt-wrap">
              <div class="inner-wrap">
                <div class="pad-wrap">
                <p class="text">词：周杰伦</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
                <p class="text">多少人为生命在努力勇敢的走下去</p>
                <p class="text">不要哭让萤火虫带着你逃跑</p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="disc-dot-wrap">
            <span class="dot active"></span>
            <span class="dot"></span>
          </div>
          <div class="process-stripe">
            <span class="time lt">{{formatTime(currentTime)}}</span>
            <progress-bar :percent="percent" @pregressChange="pregressPercentChange"></progress-bar>
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
              <i class="icon-not-like"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="mini-pic">
          <img width="40" height="40" class="img" alt="" :src="currentSong.image">
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
        <div class="control">
          <i class="icon-playlist icon-color "></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @timeupdate="timeupdate" @ended="end" @error="error"></audio>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import animations from 'create-keyframe-animation'
  import {
    prefixStyle
  } from '@/common/js/dom'
  import progressBar from '@/base/progress-bar/progress-bar'
  import Lyric from 'lyric-parser'
  import progressCircle from '@/base/progress-circle/progress-circle'
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
    getLyric
  } from '@/common/js/song'
  
  
  const transform = prefixStyle('transform')
  
  export default {
    data() {
      return {
        songReady: false, // 设置歌曲的准备状态的标示符号
        currentTime: 0,
        playingLyric: '',
        radius: 32,
      }
    },
  
    created() {
  
      // this.listerenPassive()
  
    },
    computed: {
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
      analysisLyric() {
  
      },
      iconMode() { // 更换icon
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
  
    },
  
  
    methods: {
      back() {
        this.setFullScreen(false); // 沿用mutation的flag状态
        // console.log("back " + this.fullScreen ) // undefined
      },
      open() {
        this.setFullScreen(true);
      },
  
      ...mapMutations({ // 关闭全屏需要改变mutation的状态
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setSequenceList: 'SET_SEQUENCE_LIST'
      }),
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
      },
      // 上一曲
      prev() {
        if (!this.songReady) {
          return // 当audio资源没有准备好，就不让播放，等到audio资源ok，才准备播放 
        }
        let index = this.currentIndex - 1
        if (index === 0) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.songReady = false
  
      },
      // 下一曲
      next() {
        if (!this.songReady) {
          return // 当audio资源没有准备好，就不让播放，等到audio资源ok，才准备播放 
        }
        let index = this.currentIndex + 1
        if (index === this.playList.length - 1) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.songReady = false
      },
  
      ready() {
        return this.songReady = true
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
  
      },
      // 歌词播放
      /* getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric ) {
            return
          } 
          
        })
      }, */
  
  
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
      }
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play()
          this.currentSong.getLyric()
        })
      },
      playing() {
        const audio = this.$refs.audio
        this.$nextTick(() => { // 等dom 加载完毕
          this.playing ? audio.play() : audio.pause()
        })
      },
    },
    components: {
      progressBar,
      progressCircle,
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
            &.rotate {
              @keyframes rotate {
                from {
                  -webkit-transform: rotate(0deg)
                }
                to {
                  -webkit-transform: rotate(360deg)
                }
              }
            }
          }
          .lyrics-wrap {
            width: 80%;
            margin: 3rem auto 0;
            text-align: center;
            .lyrics {
              @include fs(1.4rem);
              overflow: hidden;
              white-space: nowrap;
              color: $color-text-self;
            }
          }
        }
        .middle-rt {
          position: relative;
          left: 0;
          top: 0;
          padding-top: 100%;
          height: 0;
          .rt-wrap {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .inner-wrap {
              
              .pad-wrap {
              margin: 0 4rem;
              height: 100%;
              position: relative;
              .text {
               @include fs(1.4rem);
               line-height: 2.9rem;
               text-align: center;
               color:$color-text-self;
               &.active {
                 color: #fff;
               }
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
      width: 100%;
      .mini-pic {
        flex: 0 0 4rem;
        width: 4rem;
        height: 4rem;
        padding: 0 1rem 0 2rem;
        .img {
          border-radius: 50%;
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
        padding: 0 1rem;
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
  }
</style>


