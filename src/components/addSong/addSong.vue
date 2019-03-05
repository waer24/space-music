<template>
  <transition name="slide">
    <div class="add-wrap" v-show="showFlag">
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <span class="close" @click="hide">
            <i class="icon-no"></i>
          </span>
      </div>
      <search-box @query="onQueryChange" :placeholder="placeholder"></search-box>
      <div class="shortcut">
        <switches :list="switchesList" @switch="" :currentIndex="currentIndex"></switches>
        <div class="list-wrap">
          <scroll :scroll-data="playHistory" :probe-type="probeType" class="list-scroll">
          <div class="list-inner">
            <song-list :is-songs="playHistory" @select="selectSong"></song-list>
          </div>
           </scroll>
        </div>
      </div>
      <!-- result -->
      <div class="search-result" v-show="query">
        <suggest :query="query" @listScroll="blurInput" @searchItem="selectSuggest" :showSinger="showSinger"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="text" >
          <span class="icon"><i class="icon-ok"></i></span> 
          1首歌曲已经添加到播放列表
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
  import searchBox from '@/base/search-box/search-box'
  import suggest from '@/components/suggest/suggest'
  import switches from '@/base/switches/switches'
  import songList from '@/base/song-list/song-list'
  import topTip from '@/base/top-tip/top-tip'
  import scroll from '@/base/scroll/scroll'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    searchMixin
  } from '@/common/js/mixin'
  
  
  export default {
    mixins: [searchMixin],
    data() {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        placeholder: '搜索歌曲',
        probeType: 3,
        switchesList: [{
          name: '最近播放'
        }, {
          name: '搜索历史'
        }]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory',
      ])
    },
  
    methods: {
      hide() {
        this.showFlag = false
      },
      show() {
        this.showFlag = true
        // console.log(this.playHistory)
      },
    selectSuggest() {
      this.saveSearch()
      this.$refs.topTip.show()
    },
      selectSong(song, index) {
        if (this.index !== 0) {
          this.insertSong(song, index)
          this.$refs.topTip.show()
        }
  
      },
      ...mapActions([
        'insertSong',
      ])
    },
    components: {
      searchBox,
      suggest,
      switches,
      songList,
      topTip,
      scroll,
    }
  }
</script>

<style lang="scss" scoped>
  .add-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background-color: $color-background;
    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter,
    &.slide-leave-to {
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
        font-weight: 400;
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
      margin: 0 auto;
      .list-wrap {
        position: absolute;
        top: 16rem;
        bottom: 0;
        width: 100%;
        .list-scroll {
          height: 100%;
          overflow: hidden;
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
    .search-result {
      position: fixed;
      width: 100%;
      top: 11rem;
      bottom: 0;
      background-color: $color-background;
    }
      .text {
        @include fs(1.3rem);
        .icon {
        @include fs(1.3rem);
      }
      }
  }
</style>

