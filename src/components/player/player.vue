<template>
  <div class="player-wrap" v-show="playlist.length>0">
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
          <div class="middle-lf">
            <div class="cd-wrap" ref="cdWrapper">
              <div class="cd rotate" :class="cdCls">
                <img class="disc" alt="" :src="currentSong.image">
              </div>
            </div>
            <div class="lyrics-wrap">
              <p class="lyrics"></p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="disc-dot-wrap">
            <span class="dot active"></span>
            <span class="dot"></span>
          </div>
          <div class="process-stripe">
            <span class="time lt"></span>
            <div class="process-bar-wrap">
              <div class="bar-inner">
                <!--class="bar-passed" -->
                <div>
                  <div class="play-dot"></div>
                </div>
              </div>
            </div>
            <span class="time rt"></span>
          </div>
          <div class="operators">
            <div class="icon">
              <i class="icon-sequence"></i>
            </div>
            <div @click="prev" class="icon">
              <i class="icon-prev"></i>
            </div>
            <div @click="togglePlay" class="icon">
              <i :class="playIcon"></i>
            </div>
            <div @click="next" class="icon">
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
        <div class="circle">
          <div class="process-circle"></div>
          <i class="mini" @click.stop="togglePlay" :class="playIconMini"></i>
        </div>
        <div class="circle-rt">
          <i class="icon-playlist mini"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready"></audio>
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
  
  const transform = prefixStyle('transform')
  
  export default {
    data() {
      return {
        songReady: false
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex'
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
        setCurrentIndex: 'SET_CURRENT_INDEX'
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
          return // 只是返回就好，不做其他，直到可以播放为止
        }
        this.setPlayingState(!this.playing)
        this.songReady = false
      },
      // 上一曲
      prev() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === 0) {
          index = this.playlist.length
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
          return // 只是返回就好，不做其他，直到可以播放为止
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.songReady = false
      },

      ready() {
       return  this.songReady = true
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
  
      }
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
  
          this.$refs.audio.play()
        })
      },
      playing() {
        const audio = this.$refs.audio
        this.$nextTick(() => { // 等dom 加载完毕
          this.playing ? audio.play() : audio.pause()
  
        })
  
      },
    },
    compoennts: {}
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
      }
      .bottom {
        position: absolute;
        bottom: 5rem;
        width: 100%;
        .disc-dot-wrap {
          margin: 2rem auto;
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
          .time {
            @include fs(1.2rem);
            color: $color-text;
          }
          .lf {
            text-align: left;
          }
          .rt {
            text-align: right;
          }
          .process-bar-wrap {
            flex: 1;
            height: 3rem;
            .bar-inner {
              height: 0.4rem;
              top: 0.5rem;
              background-color: $color-background-d;
              position: relative;
              .bar-passed {
                height: 100%;
                background-color: $color-theme;
              }
              .play-dot {
                position: absolute;
                top: -0.4rem;
                left: 0;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                box-sizing: border-box;
                border: 0.2rem solid $color-text;
                background-color: $color-theme;
              }
            }
          }
        }
        .operators {
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            margin: 0 1.8rem;
            font-size: 3rem;
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
      .mini {
        color: $color-theme-d;
      }
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
      .circle {
        flex: 0 0 3rem;
        font-size: 3rem;
        .process-circle {
          position: relative;
        }
      }
      .circle-rt {
        width: 3rem;
        flex: 0 0 3rem;
        font-size: 3rem;
        margin: 0 2rem;
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


