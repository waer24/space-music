<template>
  <div class="rank-wrap" ref="rank">
    <scroll :scroll-data="topList" :probe-type="probeType" class="toplist" ref="scroll">
    <ul>
      <li class="rank-item" v-for="(item,index) in topList" :key="index" @click="selectItem(item)">
        <div>
          <img :src="item.picUrl" alt="" width="100" height="100">
        </div>
        <ul class="list-song">
          <li class="song" v-for="(song,index) in item.songList" :key="index"
          @click="selectItem(item)"
          >{{index+1}}&nbsp;{{song.singername}}-{{song.songname}}</li>
        </ul>
      </li>
    </ul>
    </scroll>
     <router-view></router-view>
  </div>
 
</template>

<script>

import scroll from '@/base/scroll/scroll'
import { mapMutations } from 'vuex'
  import {
    getMusicList,
    topList
  } from '@/api/rank.js'
  import {
    ERR_OK
  } from '@/api/config'
  import { playlistMixin } from '@/common/js/mixin'
  
  export default {
    mixins: [playlistMixin],
    data() {
      return {
        topList: [],
        probeType: 3,
        rank: true,
      }
    },
    created() {
      this._getTopList()
    },
  
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '6rem' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getTopList() {
        topList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
      
        })
       
      },

      selectItem(item) {   // 触发每个歌单item的歌单详情页面
       this.$router.push({
        path: `/rank/${item.id}`,
       })
       this.setTopList(item) // 应该返回item
     },

     ...mapMutations({
       setTopList: 'SET_TOP_LIST'
     }) 
    },

    components: {
      scroll,
    }
  
  
  
  }
</script>

<style lang="scss">
  .rank-wrap {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;

   .toplist {
     height: 100%;
     overflow: hidden;
   }
    color: $color-theme;
    .rank-item {
      display: flex;
      margin: 0 2rem;
      padding-top: 2rem;
      overflow: hidden;
      &:last-child{
        padding-bottom: 2rem;
      }
      .list-song {
        flex: 1;
        display: flex;
            overflow: hidden;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: 0 2rem;
        background-color: $bg-item-color;
        .song {
          @include fs(1.2rem);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 2.6rem;
          color: $color-text-l;
        }
      }
    }
  }
</style>