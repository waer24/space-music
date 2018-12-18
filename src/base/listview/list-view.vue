<template>
  <scroll :scroll-data="listData" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll"
  class="list-view" ref="listview">
    <ul>
      <li class="list-stripe" v-for="(group,index) in listData" :key="index" ref="listItem">
        <h2 class="list-title">{{ group.title }}</h2>
        <ul>
          <li class="text-item" v-for="(item, index) in group.items" :key="index" >
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="txt">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="sidebar" @touchstart.stop.prevent="onShortcutTouchStart"  @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item,index) in shortcutList" :key="index" :data-index ="index" class="side-item" :class="{'active': currentIndex === index}">{{ item }}</li>
      </ul>
    </div>
    <div class="fixed-bar"></div>
     <div v-show="!listData.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import scroll from '@/base/scroll/scroll'
  import loading from '@/base/loading/loading'
  import { getData } from '@/common/js/dom'
  
  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18

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
          return group.title.substring(0, 1)
        })
      },
    },
  
    data() {
      return {
        currentIndex: 0,
        scrollY: -1,
        diff: -1
       //  probeType: 3 // 不仅滚动屏幕，同时触发scroll 事件
      }
    },
  
    created() {  // 数据放在created中，在实例已经创建完成之后被调用，用于数据观测(data observer) ，属性和方法的运算， watch/event 事件回调
      this.probeType = 3 // 不仅滚动屏幕，同时触发scroll 事件 ?为什么不妨在data（）中
      this.listHeight = []
      this.listenScroll = true
      this.touch = {} // 
    },
  
    methods: {
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
        
        const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 快读入口移动终结点 = (y2 - y1 ) / 每个快速入口item自身的高度，有0.xxx的小数取0
        let anchorIndex2 = firstTouch + delta
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta // 
        this._scrollTo(anchorIndex) // start move滚动的index
      },

      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) { // 实时获取滚动到y轴的位置
        this.scrollY = pos.y
      },

       _calculateHeight() {
        this.listHeight = [] 
        const list = this.$refs.listItem
         console.log(list)
        let height = 0 // 所有list-item的总高度
        this.listHeight.push(height) // 第0个item先放入，不然后续的index对不上号，总是会要递补一个
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },


      _scrollTo(index){
       /*  if (!index && index !== 0 ) {
          return
        }
        if (index < 0) {

          index = 0
        } else if (index > this.listHeight.length - 2 ) {
          
          index = this.listHeight.length - 2
        }  
          this.scrollY = -this.listHeight[index] // 为什么是负的？*/
        this.$refs.listview.scrollToElement(this.$refs.listItem[index], 0) // 0表示不需要动画
        
         
      },
    },
  
    watch: { // 在每次监听的值有变化时，都会执行回调
      data() {
        setTimeout(() => {
          this._calculateHeight()
          console.log(22)
        }, 20)
      },
    
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 中间部分滚动
        for (let i = 0 ; i < listHeight.length - 1 ; i++) {
          let h1 = listHeight[i]
          let h2 = listHeight [i + 1]
          if (-newY >= h1 && -newY < h2) {
            this.currentIndex = i
            this.diff = h2 + newY
            return 
          }
        }
        // 当滚动到底部时，且-newY 大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal > TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return 
        }
        
      }
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
      .list-title {
        @include fs-bg;
        height: 2rem;
        line-height: 2rem;
        padding: 0.4rem 0;
        text-indent: 1.6rem;
        background-color: $bg-item-color;
      }
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
    .sidebar {
      position: fixed;
      right: 0;
      top: 22%;
      overflow: hidden;
      .side-item {
        @include fs-bg;
        @include fs(1.2rem);
        background-color: $bg-item-color;
        padding: 0.1rem 0.2rem;
        &.active {
          color: $color-theme;
        }
      }
    }
    .fixed-bar {
      position: fixed;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
      
  }
</style>

