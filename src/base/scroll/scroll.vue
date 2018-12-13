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

    mounted() { 
      this.$nextTick(() => { // 在新的dom更新之后初始化scroll
        this._initScroll()
      })
    },

    methods: {
    _initScroll() {
      if(!this.$refs.wrapper) {
        return
      }
      // 初始化第二个值传入参数
      this.scroll = new Bscroll(this.$refs.wrapper, {
        scrollX: false,
        scrollY: true,
        bounce: true,
        momentum: true,
        probeType: this.probeType,
        click: this.click,
      })
    },

    },

    watch:{

    }
  } 
</script>

<style lang="scss" scoped></style>
