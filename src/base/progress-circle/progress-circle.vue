<template>
  <!-- stroke-dashoffset：定义虚线开始的位置。stroke-dasharray是一组数列，表示虚线，虚线空隙的长度 -->
  <div class="progress-circle">
    <svg class="wrap" :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="bg" r="50" cx="50" cy="50" fill="transparent" ></circle> 
        <circle class="content" r="50" cx="50" cy="50" fill="transparent" 
        :stroke-dasharray="dashArray" 
        :stroke-dashoffset="dashOffset" ></circle> 
      </svg>
    <slot></slot>
  </div>
</template>

<script>
  // 保持stroke-dasharray，为圆的周长，播放的percent与stroke-dashoffset结合，绘制svg线条
  export default {
    data() {
      return {
        dashArray: Math.PI * 100 // 圆周长，2 * pi * r
      }
    },
    props: {
      radius: {
        type: Number,
        default: 50,
      },
      percent: {
        type: Number,
        default: 0,
      }
    },
    computed: {
      dashOffset() { // stroke-dashoffset：定义虚线开始的位置
        let ret = (1 - this.percent) * this.dashArray
        return ret
      }
    },
  }
</script>

<style lang="scss" scoped>
  .progress-circle {
    position: relative;
    circle {
      stroke-width: 0.8rem;
      transform-origin: center;
      &.bg {
        transform: scale(0.9);
        stroke: $color-theme-d;
      }
      &.content {
        transform: scale(0.9) rotate(-90deg);
        stroke: $color-theme;
      }
    }
  }
</style>


