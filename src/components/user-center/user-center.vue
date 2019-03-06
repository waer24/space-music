<template>
  <div class="user-center">
    <div class="back">
      <i class="icon icon-back"></i>
    </div>
    <div class="switch-wrap">
      <switches :list="list"></switches>
    </div>
    <div class="play-btn" ref="playBtn">
      <i class="icon icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrap">
      <!-- 我喜欢的 -->
      <scroll :scroll-data="favoriteList">
        <song-list :is-song="favoriteList"></song-list>
      </scroll>
      <!-- 最近听的 -->
      <scroll :scroll-data="playHistory">
        <song-list :is-song="playHistory"></song-list>
      </scroll>
    </div>
  </div>
</template>

<script>
  import switches from '@/base/switches/switches'
  import scroll from '@/base/scroll/scroll'
  import songList from '@/base/song-list/song-list'
  import {
    mapGetters
  } from 'vuex'
  
  export default {
    data() {
      return {
        list: [{
          name: '我喜欢的'
        }, {
          name: '最近听的'
        }],
  
      }
    },
    computed: {
      ...mapGetters([
        'playHistory',
        'favoriteList',
      ])
    },
    components: {
      switches,
      scroll,
      songList,
    }
  }
</script>

<style lang="scss" scoped>
  .user-center {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: $color-background;
    .back {
      position: absolute;
      left: 1rem;
      top: 1rem;
    }
    .switch-wrap {
      margin-top: 1rem;
    }
    .play-btn {
      display: flex;
      justify-content: center;
      margin: 2rem auto;
      box-sizing: border-box;
      width: 13.5rem;
      @include fs(1.2rem);
      padding: 0.7rem 0.4rem;
      border: 0.1rem solid $color-theme;
      border-radius: 10rem;
      color: $color-theme;
      .icon {
        @include fs(1.6rem);
        margin-right: 0.4rem;
      }
    }
    .list-wrap {
      position: absolute;
      top: 12rem;
      bottom: 6rem;
      width: 100%;
    }
  }
</style>


