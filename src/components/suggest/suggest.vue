<template>
    <scroll :scroll-data="result"
            :probe-type="probeType"
            :pullingUp="pullingUp"
            :beforeScrollStart="beforeScrollStart"
            @beforeScroll="listScroll"
            @scrollEndEvent="searchMore"

            class="scroll">
    <ul class="list">
        <li @click="selectItem(item)" v-for="(item, index) in result" :key="index">
          <div class="item">
            <div class="icon" :class="getIconCls(item)"></div>
              <i ></i>
            <div class="name">
              <p class="text" v-html="getDisplayName(item)"></p>
            </div>
          </div>
        </li>
       <loading v-show="hasMore && loadingShow" title=""></loading> 
      </ul>
      <div v-show="!hasMore && !result.length"  class="no-result-wrap" >
        <!-- title是props传递的，若值是固定的，则不必加冒号 -->
        <no-result title=""></no-result> 
      </div>
      <!-- 通过搜索歌手，router进入到歌手详情页面，需要router-view给定页面来显示 -->
      <router-view></router-view> 
      </scroll> 
</template>

<script>
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { createSongs } from '@/common/js/song'
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import NoResult from '@/base/no-result/no-result'
import Singer from '@/common/js/singer' // class Singer
import { mapMutations, mapActions } from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20 // 一页设定有20条搜索结果
/* 这里有个困扰项，loading会默认显示，按源码写不得解；noresult在输入框为空时，也会默认显示。目前自己加了loadingshow和改变hasmore在checkmore的设置暂时解决*/
export default {
  data() {
    return {
      hasMore: true,
      loadingShow: false,
      result: [],
      pullingUp: true, // scroll上拉加载
      page: 1,
      probeType: 3,
      beforeScrollStart: true, 

    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectItem(item) {
      if(item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
          // path: `/search/${item.singermid}` // 这样子会跳转到详情页面，singerdetail又回因为没有singer id返回到singer页面
        })
        
        this.setSinger(singer)
      } else { 
        this.insertSong(item)
      }
      this.$emit('searchItem', item)
    },

    search() {
      this.page = 1
      this.hasMore = true
      this.loadingShow = true
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if ( res.code === ERR_OK ) {
          this.result = this._genResult(res.data) // 取到了值,但是搜索要考虑两种情况，歌手 / 歌曲 且icon的表示也不同，因此需要区分，再显示到搜索结果中
          console.log(this.result)
          this._ckeckMore(res.data)
        }
      })
    },

    searchMore() { // 上拉加载
      if (!this.hasMore) {
        return
      }
      this.page ++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK ) {
          this.result = this.result.concat(this._genResult(res.data))
          this._ckeckMore(res.data)
        }
      })
    },

    listScroll() {
      this.$emit('listScroll') // 从scroll中引来，再传到上层search页面
    },

    getIconCls(item) {
      if(item.type === TYPE_SINGER) {
        return `icon-mine`
      } else { 
        return `icon-music`
      }
    },

    // 名称的显示，歌手 / 歌曲名-歌手
    getDisplayName(item) {
      if(item.type === TYPE_SINGER) {
        return `${item.singername}`
      } else { 
        return `${item.name} - ${item.singer}`
      }
    },

    _ckeckMore(data) { // 检查是否到底了
      const song = data.song
      if (!song.list.length || (perpage * this.page + song.curpage > song.totalnum )) { // 当前的歌曲数量等于总共搜索出来的数量，证明到底了
        this.hasMore = false
        this.loadingShow = false
      }
    },

    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {  // 歌手 
        ret.push({...data.zhida, ...{type: TYPE_SINGER}}) // 只合并为一个集合, 将type合并到data.zhida中，一起push到ret中
       // ret.push({...data.zhida}, ...{type: TYPE_SINGER}) // 之前写成这样变成2个集合，且第二个只有type了，导致后面获取歌手名:undifined
      }
      if (data.song) { // 歌曲
        ret = ret.concat(this._normalizeSong(data.song.list)) // 只获取指定需要的几个数据
      }
      return ret
    },

    _normalizeSong(list) {
      let ret = []
      Array.from(list).forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSongs(musicData))
        }
      })
      return ret
    },

    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),

    ...mapActions([
      'insertSong'
    ]),

    
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  },

  components: {
    scroll,
    loading,
    NoResult,
  }

}

</script>

<style lang="scss" scoped>
  .scroll {
    height: 100%;
    overflow: hidden;
    .list {
        margin: 0 2rem;
        overflow: hidden;
          .item {
          width: 100%;
          overflow: hidden;
          display: flex;
          padding-left: 0.8rem;
          padding-bottom: 1rem;
          .icon {
            font-size: 1.6rem;
            flex: 0 0 1.6rem;
            padding-right: 1.5rem;
            width: 1.6rem;
            line-height: 2rem;
            color: $color-text-self;
          }
          .name {
            display: inline-block;
            font-size: 1.4rem;
            color: $color-text-self;
            @include no-wrap()
          }
        }
      }
      .no-result-wrap {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
</style>



