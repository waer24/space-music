<template>
  <div class="playlist" v-show="showFlag" ref="playlist">
    <div class="list-inner">
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
          <span class="like"><i class="icon-like"></i></span>
          <span class="delete"><i class="icon-close"></i></span>
        </li>
      </ul>
    </div>
    <div class="add-button" @click="addSong">
      <i class="icon"> + </i>
      <span class="add">添加歌曲到队列</span>
    </div>
    <div class="close" @click="hide">
      <span class="close-text">关闭</span>
    </div>
  </div>
    <add-song ref="addSong"></add-song>
  </div>
</template>

<script>
import addSong from '@/components/addSong/addSong'

  export default {
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      addSong() {
        this.$refs.addSong.show()
      }
    },
    components: {
      addSong,
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
          flex: 1;
        }
        .delete {
          position: relative;
          margin-right: -1rem;
        }
      }
    }
    .list {
      max-height: 24rem;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        padding: 0.5rem 2rem;
        .icon-play-mini {
          @include fs(1.2rem);
          color: $color-theme;
          margin-right: 1rem;
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
          color: $color-theme;
          @include fs(1.2rem);
        }
        .delete {
          position: relative;
          color: $color-theme;
          @include fs(1.2rem);
        }
      }
    }
    .add-button {
      margin: 2rem auto;
      width: 14rem;
      padding: 0.5rem;
      border: 1px solid $color-text-self;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        font-style: normal;
        @include fs(1.4rem);
        margin-right: 1rem;
      }
      .add {
        @include fs(1.2rem);
      }
    }
    .close {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      height: 3rem;
      width: 100%;
      background-color: #940505;
      padding: 1rem 0;
      .close-text {
        @include fs(2rem);
        line-height: 3rem;
      }
    }
  }
</style>

