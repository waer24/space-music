<template>
  <div class="playlist" v-show="showFlag">
    <div class="list-header">
      <h1 class="title">
        <i class="icon-list icon-random"></i>
        <span class="text">suijibofang</span>
        <span class="delete">
          <i class="icon-clear"></i>
        </span>
      </h1>
    </div>
   <div class="list">
      <ul>
      <li class="item">
        <i class="icon-play-mini"></i>
        <span class="text">等你下来</span>
        <span class="like"><i class="icon-favorite"></i></span>
        <span class="delete"><i class="icon-delete"></i></span>
      </li>
      <li class="item">
        <i class="icon-play-mini"></i>
        <span class="text">等你下来</span>
        <span class="like"><i class="icon-like"></i></span>
        <span class="delete"><i class="icon-delete"></i></span>
      </li>
    </ul>
   </div>
    <div class="add-button">
      <i></i>
      <span>添加歌曲到队列</span>
    </div>
    <div class="close">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFlag: true
    }
  },
  methods: {
    show() {
      this.showFlag = true
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
      position: absolute;
      left: 0;
    bottom: 0;
    width: 100%;
    height: 41rem;
    background-color: $color-detail-bg;
    color: $color-text-l;
    
    .list-header {
      padding: 2rem 3rem 1rem 2rem;
      .title {
        display: flex;
        align-items: center;
        @include fs(1.6rem);
        .icon-list {
          @include fs(3rem);
          color: $color-theme;
          margin-right: 1rem;
        }
        .text {
          flex:1;
        }
        .delete {
         position: relative;
        }
      }
    }
    .list {
      max-height:  24rem;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        padding: 0.5rem 2rem;
        .icon-play-mini {
          @include fs(1.2rem);
          color: $color-theme;
        }
        .text {
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          @include fs(1.6rem);
        }
        .like {
         
          margin-right: 1.6rem;
          color:  $color-theme;
          @include fs(1.2rem);
        }
        .delete { 
          position: relative;
          color:  $color-theme;
          @include fs(1.2rem);
        }
      }
    }
}
</style>

