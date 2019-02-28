<template>
  <div class="playlist" v-show="showFlag" ref="playlist">
    <div class="list-inner">
      <div class="list-header">
        <h1 class="title">
          <i class="icon-list" :class="iconClass" @click="changeIcon"></i>
          <span class="text">{{modeText}}</span>
          <span class="delete" @click="showComfirm">
              <i class="icon-clear"></i>
            </span>
        </h1>
      </div>
    
      <scroll :scroll-data="sequenceList" class="list" ref="scrollList">
        <ul>
          <li class="item" v-for="(item, index) in sequenceList" :key="index"
              @click="selectItem(item, index)">
            <i class="current" :class="currentPlay(item)"></i>
            <span class="text" >{{item.name}}</span>
            <span class="like" @click.stop="toggleFavorite(item)"><i :class="getFavoriteIcon(item)"></i></span>
            <span class="delete" @click.stop="deleteItem(item)"><i class="icon-close"></i></span>
          </li>
        </ul>
      </scroll>
      <div class="add-button" @click="addSong">
        <i class="icon">+</i>
        <span class="add" @click="showSongList">添加歌曲到队列</span>
      </div>
      <div class="close" @click="hide">
        <span class="close-text">关闭</span>
      </div>
    </div>
    <add-song ref="addSong"></add-song>
    <confirm ref="confirm"
             contentText="是否清空所有搜索历史"
             @cancel="cancelClear"
             @confirm="confirmClear"></confirm>
  </div>
</template>

<script>
  import addSong from '@/components/addSong/addSong'
  import confirm from '@/base/confirm/confirm'
  import {
    mapGetters, mapMutations, mapActions
  } from 'vuex'
  import {
    playMode
  } from '@/common/js/config'
  import { shuffle } from '@/common/js/utils'
  import scroll from '@/base/scroll/scroll'
  import { playerMixin } from '@/common/js/mixin'
  
  export default {
    mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
      }
    },
    computed: {
      modeText() {
        //ERROR return this.playMode === playMode.sequence ? '顺序播放' : this.playMode === playMode.loop ? '单曲循环' : this.playMode === playMode.random ? '随机播放'
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
      },
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
      },
      
      currentPlay(item) {
        if(this.currentSong.id === item.id) {
          return 'icon-play-mini'
        } else {
          return ''
        }
      },
      
      deleteItem(item) {
        this.deleteSong(item)
        if (!this.playList.length) {
          this.hide()
        }
      },
      deleteList() {
        this.deleteSongList()
        if(this.playList.length) {
          this.hide()
        }
      },

      // 选中当前的播放
      selectItem(item ,index) {
       if (this.mode === playMode.random ) {
         index = this.playList.findIndex((song) => {
           return song.id === item.id
         })
       }
        this.setCurrentIndex(index)
        // console.log(index) // 具体的数字
        this.setPlayState(true)
      },

      showComfirm() {
        this.$refs.confirm.show()
      },

      cancelClear() {
        this.$refs.confirm.hide()
      },

      confirmClear() {
        this.deleteSongList()
        this.hide()
      },
      // 打开添加歌曲列表
      showSongList() {
        this.$refs.addSong.show()
      },
      ...mapActions([
        'deleteSong',
        'deleteSongList',
      ])
    },
    components: {
      addSong,
      scroll,
      confirm,
    }
  }
</script>

<style lang="scss" scoped>
  .playlist {
   position: fixed;
   left: 0;
   top: 0;
   right:0;
   bottom: 0;
    z-index: 200;
   color: $color-text-l;
       background-color: $color-background-d;
    .list-inner {
 position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
     
     background-color: $color-detail-bg;
    
    
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
          color: #f8f8f8;
        }
        .delete {
          position: relative;
          margin-right: -1rem;
        }
      }
    }
    .list {
      height: 24rem;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        padding: 0.5rem 2rem;
        .current {
          flex: 0 0 1.2rem;
          width: 1.2rem;
          @include fs(1.2rem);
          color: $color-theme;
          margin-right: 1rem;
        }
        .text {
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          @include fs(1.4rem);
        }
        .like {
          margin-right: 1.6rem;
          color: $color-favorite;
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
  }
</style>

