<template>
  <scroll @scroll="scroll" :scroll-data="listData" :probe-type="probeType" :listen-scroll="listenScroll" class="list-view" ref="listview">
    <ul>
      <li class="list-stripe" v-for="(group,index) in listData" :key="index" v-show="listData.length" ref="listItem">
        <h2 class="list-title">{{ group.title }}</h2>
        <ul>
          <li class="text-item" v-for="(item, index) in group.items" :key="index" @click="selectItem(item)">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="txt">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="sidebar" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item,index) in shortcutList" :key="index" :data-index="index" class="side-item" :class="{'active': currentIndex === index}">{{ item }}</li>
      </ul>
    </div>
    <div class="fixed-bar" v-show="fixedTitle">
      <h2 class="fixed-title" ref="fixedTitle">{{ fixedTitle }}</h2>
    </div>
    <div v-show="!listData.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import scroll from '@/base/scroll/scroll'
  import loading from '@/base/loading/loading'
  import {
    getData
  } from '@/common/js/dom'
  
  const TITLE_HEIGHT = 20 //  fixed title的高度
  const ANCHOR_HEIGHT = 18 // 右侧快速到导航栏每个item的高度
  
  export default {
    props: {
      listData: {
        type: Array,
        default: [] //如果写：default: [] =》 error: Use Array/Object in props as default value
      }
    },
  
    computed: {
      // 另一个种更好的侧边栏索引 截取方法
      shortcutList() {
        return this.listData.map((group) => { // 直接返回数组中group的数据
          return group.title.substr(0, 1)
          // 这里不要用substring ，因为substr的start和end如果为负数，会返回NAN 坑！
        })
      },
  
      fixedTitle() { // 不必再用循环获取title
        if (this.scrollY > 0) { // 顶部出现两个‘热门’的情况，【一个固定的title，一个是listitem的title】
          return ''
        }
        return this.listData[this.currentIndex] ?  this.listData[this.currentIndex].title : '' // 异步加载，防止有时会来不及渲染，先蹦出一个title is undefined
        // console.log(this.scrollY)
        //  console.log(this.listData[this.currentIndex])
      }
    },
  
    data() {
      return {
        scrollY: -1, // itemlist起点，向下滚动是负数
        currentIndex: 0,
        diff: -1 // 顶部固定title
      }
    },
  
    created() { // 为什么这些不放在data（）中？因为这些数据不需要去监测，只是需要共享，需要实例中都能获取这个值
      this.probeType = 3 // 不仅滚动屏幕，同时触发scroll 事件 
      this.listenScroll = true
      this.touch = {} // 移动端的touch事件
      this.listHeight = []
    },
  
    methods: {
      selectItem(item) { // 组件传递点击事件给父级
        this.$emit('select', item)
      },

      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
  
      },
  
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        // 快读入口移动终结点 = (y2 - y1 ) / 每个快速入口item自身的高度，有0.xxx的小数取0
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta // 
        this._scrollTo(anchorIndex) // start move滚动的index
      },
  
      refresh() {
        this.$refs.listview.refresh()
      },
  
      scroll(pos) { // 实时获取滚动到y轴的位置，用户会不断触发scroll事件，因此需要监听scroll，同时也是回应scroll组件中子组件的绑定事件
        this.scrollY = pos.y // scroll.Y是watch的函数
        // console.log(this.scrollY) // 往下拉是< 0，”热门“上面是>0的值，”热门“的起点是0（ 热门是listitem的起点）
      },
  
      _calculateHeight() {
        this.listHeight = []
        let list = this.$refs.listItem
        let height = 0 // 所有list-item的总高度
        this.listHeight.push(height) // 第0个item先放入，不然后续的index对不上号，总是会要递补一个
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) { // 处理边界值，当点击’热门‘上面的时候
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2

        }
        this.$refs.listview.scrollToElement(this.$refs.listItem[index], 0) // 0表示不需要动画
        this.scrollY = this.$refs.listview.scroll.y // 为什么是负的？ 向下滚动是负值 
      },
    },
  
    watch: { // 在每次监听的值有变化时，都会执行回调
      /*  '_calculateHeight':{ 
         handler: function() {
         setTimeout(function() {
           this._calculateHeight()
         }, 20)
         },
         deep: true
       }, */
      /* data() {
         setTimeout(() => {
          this._calculateHeight()
        }, 20) 
      }, */
      data: { // 为什么要监听data？ data中包含了3个属性，都是在scroll中触发，需要不断监听，便于后续scrolly事件
        handler: function() {
          setTimeout(() => {
            this._calculateHeight()
          }, 200) // 时间设置的太短会导致页面还没渲染完，提示length is undefined
  
        },
        immediate: true,
      },
  
      scrollY: function(newY) {
        /* setTimeout(() => {
          this._calculateHeight()
        }, 20) */
        const listHeight = this.listHeight
        // 从method的scrollY可知，scroll滚动的坐标，即newY 会有在item中间 ，>0, <0的三种情况，因此需要分别讨论
        // 在顶部的情况
        if (newY >= 0) {
          this.currentIndex = 0
          return
        }
        // 在listitem中间滚动的情况 listitem的长度是23
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i] // 0个 => 0px 500px  -new: -520px
          let height2 = listHeight[i + 1] // 22 + 1 = 23个 => such as：-1122px -500 + 200px
          if (-newY >= height1 && -newY < height2) { // newY<0 本身是负值， -newY 变成了正数
            this.currentIndex = i
            this.diff = height2 + newY // 中间的listitem情况--》从下往上拉：下限高度- 滚动上限的高度 newy是负值
            return
          }
        }
        // 当滚动到底部时，且-newY 大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
  
      diff: function(newVal) {
        let fixTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0 // 从上往下拉
        this.$refs.fixedTitle.style.transform = `translate3d(0 ,${fixTop}px, 0) `
        /*  this.$refs.fixedTitle.style.color = `red`
        console.log(newVal)
        console.log(`this.diff:  ${this.diff}`)
        console.log(`fixTop:   ${fixTop}`)
        console.log(`this.fixTop---   ${this.fixTop}`) */
      }
  
      /*  source code
        diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
      */
    },
    components: {
      scroll,
      loading,
    }
  }
</script>

<style lang="scss" scoped>
  .list-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: darkred;
    .list-stripe {
      padding-bottom: 3rem;
      .text-item {
        display: flex;
        align-items: center;
        padding: 2rem 0 0 2rem;
        .avatar {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
        }
        .txt {
          padding-left: 1rem;
          @include fs-bg;
        }
      }
    }
    .list-title,
    .fixed-title {
      @include fs-bg;
      height: 2rem;
      line-height: 2rem;
      padding: 0.4rem 0;
      text-indent: 1.6rem;
      background-color: $bg-item-color;
    }
    .sidebar {
      position: absolute;
      z-index: 30;
      right: 0;
      /* 靠这个上下居中 */
      transform: translateY(-50%);
      top: 50%;
      overflow: hidden;
      padding: 2rem 0;
      width: 2rem;
      text-align: center;
      border-radius: 1rem;
      background-color: $bg-item-color;
      .side-item {
        @include fs(1.3rem);
        color: $color-text-l;
        line-height: 1.6rem;
        padding: 0.1rem 0.2rem;
        &.active {
          color: $color-theme;
        }
      }
    }
    .fixed-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>

