<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

  export default {
    props: {
      scrollData: {
        type: Array,
        default: null
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
    },

    methods: {
    _initScroll() {
      if(!this.scroll) {
        return
      }
      // 初始化第二个值传入参数
      this.scroll = new Bscroll(this.$refs.scroll, {
        scrollX: false,
        scrollY: true,
        bounce: true,
        momentum: true,
        probeType: this.probeType,
        click: this.click,
      })
    }
    }
  } 
</script>

<style lang="scss" scoped>
  
</style>
