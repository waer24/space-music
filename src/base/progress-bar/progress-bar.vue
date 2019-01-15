<template>
  <div class="process-bar-wrap" @click="_offset">
    <div class="bar-inner-wrap">
      <div class="bar-inner" ref="barInner" >
        <div class="progress" ref="progress"></div>
        <div class="play-dot-wrap" ref="playDot">
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
    
   

    methods: {
       _offset(offsetWidth) {
         this.$refs.progress.style.width = `${offsetWidth}px` // style.width改变ui
        const dot = this.$refs.playDot
        let dotWidth = parseFloat(offsetWidth).toFixed(4)
        dot.style[transform] = `translate3d(${dotWidth}px, 0px, 0px)` // 总共可以滚动的宽度
        // console.log(dot.style[transfom])
      } 
    },
    watch: {
      percent(newPercent) {
        const barWidth = this.$refs.barInner.clientWidth - dotBtnWidth // barWidth: 进度条的实时宽度
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
       // console.log(offsetWidth)
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


