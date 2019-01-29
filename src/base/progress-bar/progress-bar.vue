<template>
  <div class="process-bar-wrap" @click="clickProgress" ref="processBar">
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
     this.touch = {} 
   },
    methods: {
       _offset(offsetWidth) { // offsetWidth是偏移量，即歌词滚动过了的范围
         this.$refs.progress.style.width = `${offsetWidth}px` // style.width改变ui
        const dot = this.$refs.playDot
        let dotWidth = parseFloat(offsetWidth).toFixed(4)
        dot.style[transform] = `translate3d(${dotWidth}px, 0px, 0px)` // 总共可以滚动的宽度
        // console.log(dot.style[transfom])
      } ,
      progressTouchStart(e) {
        this.touch.initiated = true // 设置默认启动状态
        this.touch.startX = e.touches[0].pageX // pageX是水平漂移
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        const delta = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.barInner.clientWidth - dotBtnWidth, Math.max(0, this.touch.left + delta))
        this._offset(offsetWidth)
        this.$emit('pregressChanging', this._changePercent())
      },
      progressTouchEnd(){
        this.touch.initiated = false
        this._triggerChange()
      },
      _triggerChange(){
        /* const barWidth = this.$refs.barInner.clientWidth - dotBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth */
        this.$emit('pregressChange', this._changePercent())
        
      },
      _changePercent() {
        const barWidth = this.$refs.barInner.clientWidth - dotBtnWidth
        return this.$refs.progress.clientWidth / barWidth
         
      },
      clickProgress(e) { // element.getBoundingClientRect()返回一组对象的集合，返回left、top、right和bottom，width，height
          const rect = this.$refs.processBar.getBoundingClientRect()
          const offsetWidth = e.pageX - rect.left // 获取点击的x的落差
          this._offset(offsetWidth)
          this._triggerChange()
      },


    },
    watch: {
      percent(newPercent) {
        if( newPercent >= 0 && !this.touch.initiated) { // 解决手动移动进度条又跳回原来的点，（手动移动一段，但是又要监听percent，
        //导致moveend时会跳回），所以只要保证拖动时不监听就行，那就通过标识符来判断最好
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


