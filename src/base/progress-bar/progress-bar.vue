<template>
  <div class="process-bar-wrap" @click="_offset" ref="processBar">
    <div class="bar-inner-wrap">
      <div class="bar-inner" ref="barInner" >
        <div class="progress" ref="progress"></div>
        <div class="play-dot-wrap" ref="playDot" 
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd">
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '@/common/js/dom'
const transform = prefixStyle('transform')
const dotBtnWidth = 16

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    
   created() {
     this.touch = {} // 作用是为touch事件提供通用的数据
     
   },

    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true // touch开始时， 将对象设置为已经初始化的状态
        this.touch.startX = e.touches[0].pageX // pageX是水平漂移
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if(!this.touch.initiated) {
          return
        }
        const delta = e.touches[0].pageX - this.touch.startX
        // console.log(e.touches[0].pageX)
        // console.log(this.touch.startX)
        const offsetWidth = Math.min(this.$refs.processBar.clientWidth - dotBtnWidth, Math.max(0, this.touch.left + delta))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false 
        this._triggerPercent()
      },
      _triggerPercent() {
       const barWidth = this.$refs.processBar.clientWidth - dotBtnWidth
       const percent = this.$refs.progress.clientWidth / barWidth // progress是已播放的进度条
       console.log(percent)
       this.$emit('progressChange', percent)
      },
       _offset(offsetWidth) { // offsetWidth是偏移量，即歌词滚动过了的范围
         this.$refs.progress.style.width = `${offsetWidth}px` // style.width改变ui
        const dot = this.$refs.playDot
        let dotWidth = parseFloat(offsetWidth).toFixed(4)
        dot.style[transform] = `translate3d(${dotWidth}px, 0px, 0px)` // 总共可以滚动的宽度
        // console.log(dot.style[transfom])
      } 
    },
    watch: {
      percent(newPercent) {
        if(newPercent >= 0 && !this.touch.initiated) { // initiated为false就保证了在拖动的时候，优先级最大，防止拖动了又跳回
           const barWidth = this.$refs.barInner.clientWidth - dotBtnWidth // barWidth: 进度条的实时宽度
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
       // console.log(offsetWidth)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .process-bar-wrap {
    flex: 1;
    .bar-inner-wrap {
      height: 3rem;
      .bar-inner {
        width: 100%;
        height: 0.4rem;
        top: 1.3rem;
        background-color: $color-background-d;
        position: relative;
      }
      .progress {
        position: absolute;
        left: 0;
        height: 100%;
        background-color: $color-theme;
      }
      .play-dot-wrap {
        position: absolute;
        left: 0;
        top: -1rem;
        width: 3rem;
        height: 3rem;
        .dot {
          position: relative;
          left: 0;
          top: 0.4rem;
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
</style>


