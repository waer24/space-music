<template>
  <div class="add-wrap" v-show="showFlag">
    <div class="header">
      <h1 class="title">添加歌曲到列表</h1>
      <span class="close" @click="hide">
        <i class="icon-no"></i>
      </span>
    </div>
    <search-box></search-box>
    <div class="shortcut">
      <ul class="switches">
        <li class="item active">
          <span class="txt">最近播放</span>
        </li>
        <li class="item">
          <span class="txt">搜索历史</span>
        </li>
      </ul>
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
    
  </div>
</template>

<script>
import searchBox from '@/base/search-box/search-box'

export default {
  data() {
    return {
      showFlag: false
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
    .switches {
          border: 1px solid #C4C4C4;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    width: 24rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
      .item {
       
        color: #C4C4C4;
            padding: 0.4rem 0.5rem;
    margin: 0;
    flex: 1;
    text-align: center;
          .txt {
        @include fs(1.4rem);
    }
      }
       .active {
        color: #fff;
        background-color: $color-text-d;
      }
      } 
     
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

