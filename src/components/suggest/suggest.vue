<template>
 <scroll ref="suggest"
         :scrollData="result"
         :pullup="pullup"
         :beforeScroll="beforeScroll"
         @scrollToEnd="searchMore"
          @beforeScroll="listScroll"> 
  <div class="suggest-wrap">
    <ul class="list">
        <li @click="selectItem(item)" v-for="(item, index) in result" :key="index">
          <div class="item">
            <div class="icon"></div>
              <i :class="getIconClass(item)"></i>
            <div class="name">
              <p class="text">{{getDisplayName(item)}}</p>
            </div>
          </div>
        </li>
        <loading v-show="hasMore" title="" ></loading>
      </ul>
      <div class="no-result-wrap" v-show="!hasMore && !result.length">
        <no-result></no-result>
      </div>
  </div>
  </scroll>
</template>

<script>
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import noResult from '@/base/no-result/no-result'
import { search } from '@/api/search'
import Singer from '@/common/js/singer'
import { createSongs } from '@/common/js/song'
import { ERR_OK} from '@/api/config'
import {mapMutations, mapActions} from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },

  data(){
    return {
      page: 1,
      hasMore: true, // 标识符
      result: [], // 搜索结果
      pullup: true, //滚动到底
      beforeScroll: true

    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },

    // 重点： 实时根据ipt框的内容搜索
    search() {
      this.page = 1
      this.hasMore = truethis.$refs.suggest.scrollTo(0 ,0)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if ( res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },

    searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },

    listScroll() {
          this.$emit('listScroll')
     },

    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername,
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    },

    // 搜索结果有歌手和歌曲的icon，需要判断
    getIconClass(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },

    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },

    // 获取搜索结果
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },

    _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSongs(musicData))
          }
        })
        return ret
      },
       _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },

       ...mapMutations({
        setSinger: 'SET_SINGER'
      }),

      ...mapActions([
        'insertSong'
      ])
  },
  watch: { // 实时监控输入
    query(newQuery) {
      this.search(newQuery)
    }
  },
  components: {
    loading,
    noResult,
    scroll,
  }
}
</script>

<style lang="scss" scoped>
  .suggest-wrap {
    height: 100%;
    overflow: hidden;
    .list {
        margin: 0 2rem;
        overflow: hidden;
          .item {
          width: 100%;
          overflow: hidden;
          display: flex;
          padding-bottom: 1rem;
          .icon {
            font-size: 1.6rem;
            flex: 0 0 1.6rem;
            padding-right: 0.5rem;
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



