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
      beforeScrollStart: { // 用于搜索页面
        type: Boolean,
        default: false
      },
      scrollEnd: {
        type: Boolean,
        default: false
      },

      refreshDelay: {
        type: Number,
        default: 20,
      },
       pullingUp: { // 是否滚动到底 用于搜索页面
        type: Boolean,
        default: false
      },
    },

    mounted() { 
      setTimeout(() => {
        this._initScroll()
      }, 20)
     /*  this.$nextTick(() => { // 在新的dom更新之后初始化scroll
        this._initScroll()
      }) */
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

      if(this.listenScroll) { // 是否需要监听滚动事件？ 需要的话绑定scroll事件，子组件触发它
        let me = this // 因为scroll的this是
        this.scroll.on('scroll', (pos) => { // pos是bscroll的对象， 包含x, y两个参数
          me.$emit('scroll', pos)
        })
      }
 
       if(this.beforeScrollStart) { 
        this.scroll.on('beforeScrollStart', () => { // 触发beforeScrollStart事件
          this.$emit('beforeScroll') // 传递出去
          // console.log(22) // 表明已触发
        })
      }

      if (this.pullingUp) { // 如果出发了pullup 就绑定scrollend事件
        /* this.scroll.on('scrollEnd', () => { 
          this.$emit('scrollEndEvent') 
        }) */
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollEndEvent') // 这只是名称，传递出去
          }
        })
      }


    },

    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },

    scrollToElement() { // 后续别的组件要用到这些组件，所以需要对外提供方法，否则报错： scrollToElement is not a function
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    
    refresh() {
      this.scroll && this.scroll.refresh()
    },

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
