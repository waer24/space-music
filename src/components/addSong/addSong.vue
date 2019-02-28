<template>
<transition name="slide">
  <div class="add-wrap" v-show="showFlag">
    <div class="header">
      <h1 class="title">添加歌曲到列表</h1>
      <span class="close" @click="hide">
        <i class="icon-no"></i>
      </span>
    </div>
    <search-box @query="onQueryChange"></search-box>
    <div class="shortcut">
      <switches :list="switchesList"></switches>
      <div class="list-wrap">
        <div class="list-inner">
          <ul>
            <li class="item">
              <h2 class="name">外婆</h2>
              <p class="sub-name">zhoujielun qilixiang</p>
            </li>
             <li class="item">
              <h2 class="name">外婆</h2>
              <p class="sub-name">zhoujielun qilixiang</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- result -->
   <!--  <div class="result"  v-show="showFlag">
      <suggest></suggest>
    </div> -->
  </div>
  </transition>
</template>

<script>
import searchBox from '@/base/search-box/search-box'
import suggest from '@/components/suggest/suggest'
import switches from '@/base/switches/switches'
import { searchMixin} from '@/common/js/mixin'

export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      switchesList: ['最近播放', '搜索历史']
    }
  },
  methods: {
    hide() {
      this.showFlag = false
    }, 
    show() {
      this.showFlag = true
    }
  },
  components: {
    searchBox,
    suggest,
    switches,
  }
}
</script>

<style lang="scss" scoped>
.add-wrap{
      position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color:$color-background;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
  .header {
    height: 4.4rem;
    text-align: center;
    .title {
      @include fs(1.8rem);
      color: #fff;
      line-height: 4.4rem;
          display: inline-block;
    }
    .close {
     position: absolute;
      right: 0.8rem;
      color: $color-theme;
      padding: 0.8rem 1rem;
      @include fs(2rem);
    }
  }
  .shortcut {
    margin:0 auto;
    .list-wrap {
      position: absolute;
      top: 16rem;
      left: 0;
      width: 100%;
      .list-inner {
        padding: 2rem;
        .item {
          @include fs(1.4rem);
          padding: 0.5rem;
          .name {
            @include fs(1.4rem);
            font-weight: 400;
            color: #fff;

          }
          .sub-name {
            color: $color-text-self; 
          }
        }
      }
    }
  }

}
</style>

