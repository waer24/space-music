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
      listenScroll: {
        type: Boolean,
        default: false
      }
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

      if(this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },

    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },

    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

    },

    watch:{

    }
  } 
</script>

<style lang="scss" scoped></style>
