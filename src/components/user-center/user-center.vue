<template>
 <transition name="slide">
    <div class="user-center" ref="userCenter">
    <div class="back" @click="back">
      <i class="icon icon-back"></i>
    </div>
    <div class="switch-wrap">
      <switches :list="list" @switch="switchItem" :currentIndex="currentIndex"></switches>
    </div>
    <div class="play-btn" ref="playBtn" @click="randomPlay">
      <i class="icon icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrap">
      <!-- 我喜欢的 -->
      <scroll :scroll-data="favoriteList"
               class="list-scroll" 
               v-if="currentIndex===0"
               ref="favoriteList">
        <div class="list-inner">
          <song-list :is-songs="favoriteList" @select="selectItem"></song-list>
        </div>
      </scroll>
      <!-- 最近听的 -->
      <scroll :scroll-data="playHistory" 
              class="list-scroll" 
              v-if="currentIndex===1"
              ref="playList">
        <div class="list-inner">
          <song-list :is-songs="playHistory" @select="selectItem"></song-list>
        </div>
        <div class="no-result-wrap" >
          <no-result ></no-result>
        </div>
      </scroll>
    </div>
    <!-- mini player -->

  </div>
 </transition>
</template>

<script>
  import switches from '@/base/switches/switches'
  import scroll from '@/base/scroll/scroll'
  import songList from '@/base/song-list/song-list'
  import Song from '@/common/js/song'
  import noResult from '@/base/no-result/no-result'
  import { playlistMixin } from '@/common/js/mixin'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  
  export default {
    mixins: [ playlistMixin ],
    data() {
      return {
        list: [{
          name: '我喜欢的'
        }, {
          name: '最近听的'
        }],
        currentIndex: 0,
      }
    },
    created() {
      this.noResult()
    },
    computed: {
      ...mapGetters([
        'playHistory',
        'favoriteList',
      ])
    },
    methods: {
      noResult() {
        if (!this.playHistory.length) {
          return '暂无收藏'
        }
        if(!this.favoriteList.length) {
          return '最近没听什么～'
        }
      },
      back() {
        this.$router.back()
      },
      switchItem(index) {
        // 更优写法
        this.currentIndex = index
        /* if (this.currentIndex === 0) {
          this.currentIndex = 1
        } else {
          this.currentIndex = 0
        } */
      },
      selectItem(song) {
        this.insertSong(new Song(song)) // 为什么是new Song？
      },
       handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '6rem' : ''
        this.$refs.userCenter.style.bottom = bottom
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()   // 为什么要加上 this.$refs.favoriteList ？
        this.$refs.playList && this.$refs.playList.refresh()
      },

      randomPlay() {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory 
        if(list.lengh === 0 ) {
          return 
        }
          list = list.map((song) => {
            return new Song(song)
          })
        // console.log(list)
        this.randomModePlay({list: list})
      },

      ...mapActions([
        'insertSong',
        'randomModePlay'
      ])
     
    },
    components: {
      switches,
      scroll,
      songList,
      noResult,
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
     &.slide-enter-active,&.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0 ,0)
    }
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
      box-sizing: border-box;
      margin: 2rem auto;
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
      bottom: 0rem;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 0 3rem;
        }
      }
    }
   
  }
</style>


