
<template>
  <!-- 切换列表的展示作为slot，能套用不同的切换方式，扩展slider的可用性 -->
  <div class='slider-wrap' ref='slider'>
    <div class='slider-group' ref='sliderGroup'>
      <!-- 轮播图展示在slot中 -->
      <slot></slot>
    </div>
    <div class='dots'>
      <span class='dot'></span>
    </div>
  </div>
</template>

<script>
/* bscroll的滚动原理
父元素 wrap设置一个高度，第一个子元素不设置高度，子元素超过父元素才能具备滚动的条件
横向滚动也是这个原理
*/
  import { addClass } from '@/common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    created() {

    },

    mounted() {
      // 浏览器渲染成html 最低是17ms的延迟，20ms的设定是比较科学的
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
      }, 20)

    },

    methods: {
      // 分别设置父级和子级的宽度，并为每个子级添加class
      // this 是在单独指明哪个时才写

      _setSliderWidth(){
        let width = 0;
        this.children = this.$refs.sliderGroup.children
        let sliderWidth = this.$refs.slider.clientWidth // 父级的宽度
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
         child.style.width = sliderWidth + 'px'
         width += sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px' // 子级的总宽度
        console.log(this.$refs.sliderGroup.style.width)
      },

      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: true,
          snap: true,
        })
      }
    },
  }
</script>

<style lang="sass">
/* slot的标签内容虽然在别处引用，但slot的样式仍在slider组件 */
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
  .dots
    position: absolute
    .dot
      display: inline-block
      width: 0.4rem
      height: 0.4rem
      color: $color-text-ll
      border-radius: 50%

</style>
