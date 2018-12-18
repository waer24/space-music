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
     
      listenScroll: {
        type: Boolean,
        default: false
      },
      click: {
        type: Boolean,
        default: true,
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20,
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
       //  scrollX: false,
       //  scrollY: true,
        bounce: true,
        momentum: true,
        click: this.click,
        probeType: this.probeType,
      })

      if(this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }

      if(this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },

    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },

    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    
    refresh() {
      this.scroll && this.scroll.refresh()
    }

    },

    watch:{
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  } 
</script>

<style lang="scss" scoped></style>
