
<template>
  <!-- 切换列表的展示作为slot，能套用不同的切换方式，扩展slider的可用性 -->
  <div class='slider-wrap' ref='slider'>
    <div class='slider-group' ref='sliderGroup'>
      <!-- 轮播图展示在slot中 -->
      <slot></slot>
    </div>
    <div v-show="showDot"  class='dots'>
      <span class='dot' v-for="(dot, index) in dots" :key="index"
      :class="{active: currentPageIndex === index}"> </span>
    </div>
  </div>
</template>

<script>
/* bscroll的滚动原理
父元素 wrap设置一个高度，第一个子元素不设置高度，子元素超过父元素才能具备滚动的条件
横向滚动也是这个原理
better-scroll的文档：https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options-advanced.html#wheel

*/
  import { addClass } from '@/common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    
    props: { // 用于外部组件能控制的3个元素
       loop: {
          type: Boolean,
          default: true,
        },
       autoPlay: {
          type: Boolean,
          default: true,
        },
        interval:{
          type: Number,
          default: 4000
        },
        showDot: {
          type: Boolean,
          default: true
        },
        speed: { // 来自bscroll
          type: Number,
          default: 400
        }, 
        click: { // 打开bscroll的点击事件, 默认false，默认阻止浏览器的原生点击事件
          type: Boolean,
          default: true
        },
        threshold:{  // 来自snap中的属性，为slider专用
          type: Number,
          default: 0.3
        }
    },
    data() {
      return {
        dots: [], // 轮播图的点
        currentPageIndex: 0  
      }
    }, 

    
    mounted() {
      this.update()

      window.addEventListener('resize', () => {
        if(!this.slider || !this.slider.enable) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if(this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if(this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    }, 

    activated() { // keep-alive 组件激活时使用
      if(!this.slider) {
        return
      }
      this.slider.enable()
      let pageIndex = this.slider.getCurrentPage().pageX
      this.slider.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },

    deactivated() {
      this.slider.disable()
      clearTimeout(this.timer)
    },

    beforeDestroy(){
      this.slider.disable()
      clearTimeout(this.timer)
    },


    methods: {
      update() {
        if(this.slider) {
          this.slider.destroy()
        }
        this.$nextTick(() => {
          clearTimeout(this.timer)
          this.init()
        })
      },

      refresh() {
        this._setSliderWidth(true)
        this.slider.refresh()
      },

      prev() {
        this.slider.prev()
      },

      next() {
        this.slider.next()
      },

      init() {
        clearTimeout(this.timer) 
        this.currentPageIndex = 0
        this._setSliderWidth()
        if(this.showDot) {
         this. _setDots()
        }

        this._initSlider()

        if(this.autoPlay) {
          this._play()
        }
      },
      
      // 分别设置父级和子级的宽度，并为每个子级添加class.this 是在单独指明哪个时才写 
      _setSliderWidth(isResize){
        this.children = this.$refs.sliderGroup.children
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth // 父级元素的宽度
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
         child.style.width = sliderWidth + 'px' // 获取每个slider-item的宽度样式
         width += sliderWidth
        }
        // 2倍的宽度才能保证bscroll的无缝滚动
        if ( this.loop && !isResize ) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px' // 获得所有slider总宽度样式
        // console.log(this.$refs.sliderGroup.style.width)
      },

      _initSlider() {
        // this.slider => 7个滚动的div
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: true, // 快递滑动时，开启动画,css用了translation
          // 一个轮播元素无效，bscroll会重复添加第一个和最后一个滚动元素，才能无缝滚动，本例中，bscroll渲染的dom有7个，但dom的length实则只有5个
          snap: { 
            loop: this.loop, 
            threshold: this.threshold, 
            speed: this.speed,
          }, 
          bounce: true,
          stopPropagation: true, // 阻止冒泡
          click: this.click,
        })
        // 监听 一张 滚动结束,这里是事件名，不用_onScrollEnd()
        this.slider.on('scrollEnd', this._onScrollEnd)

        this.slider.on('touchEnd', () => {
          if(this.antoPlay) {
            this._play()
            
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if(this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
       

      },

      _onScrollEnd() {
        
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if ( this.autoPlay ) {
          this._play()
        }
      },

            // 即便设置了数组长度，也是可以改变的，给dot设定数组长度5，主要是考虑到后期代码内存的优化问题
      _setDots() {
        this.dots = new Array(this.children.length)

      },
      
      _play(){
        // 人划动的时候，页面也在播放，避免跳页面的现象，需要清除定时器
        clearTimeout(this.timer) 
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    },

    watch: {
      loop() {

        this.update()
        
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    },
  }
</script>

<style lang="sass">
/* slot的标签内容虽然在别处引用，但slot的样式仍可在slider组件 */
.slider-wrap
  min-height: 0.1rem
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
      img
      display: block
      width: 100% 

  /* 有了text-align和绝对定位0的配合，
    兼容任意分辨率的位置保持不变 */
  .dots
    position: absolute
    bottom: 0.6rem
    transform: translateZ(0.1rem)
    left: 0
    right: 0
    text-align: center
    .dot
      display: inline-block
      width: 0.6rem
      height: 0.6rem
      margin: 0 0.4rem
      background-color: $color-dot
      border-radius: 50%
      &.active /* 同级添加其他class */
        width: 2rem
        border-radius: 0.5rem
        background-color: #fff

</style>
