<template>
  <div class='search' >
  <search-box ref="searchBox" @query="onQueryChange"></search-box>
    <div class="serh-wrap" ref="searchWrap" v-show="!query">
      <div>
        <div class="serh-hot" ref="searchHot">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="label-item" @click="selectHistory(item.k)" v-for="(item, index) in hotkey" :key="index">
              <span class="label">{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="serh-history" v-show="searchHistory.length" ref="searchHistory">
          <h2 class="title">
            <span class="text">搜索历史</span>
            <span class="icon-trash-wrap" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h2>
          <search-list ref="searchList" :searches="searchHistory" @deleteHistory="deleteSearchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" :query="query" @listScroll="blurInput" @searchItem="saveSearch"></suggest>
    </div>
    <div class="confirm">
      <confirm ref="confirm" 
             contentText="是否清空所有搜索历史"
             sureText="清空"
             @cancel="cancelClear"
             @confirm="clearSearchHistory"></confirm>
    </div>
    <router-view></router-view>
  </div>
</template>
 
<script>
import searchBox from '@/base/search-box/search-box'
import {hotKey} from '@/api/search'
import {ERR_OK} from '@/api/config'
import suggest from '@/components/suggest/suggest'
import searchList from '@/base/search-list/search-list'
import confirm from '@/base/confirm/confirm'
import { mapGetters, mapActions } from 'vuex';
import { searchMixin, playlistMixin } from '@/common/js/mixin'

  export default {
    mixins: [searchMixin, playlistMixin],
    data() {
      return {
        hotkey: [], 
      }
    },
    created() {
      this._getHotKey()
    },
    methods: {
     
      selectHistory(item) {
       this.$refs.searchBox.setQuery(item)
      },
     /*  deleteSearch() { 删除的时候不需要再创建一个函数,为什么呢？
        this.deleteSearchHistory()
      }, */
     showConfirm() {
       this.$refs.confirm.show()
     },
      cancelClear() {
        this.$refs.confirm.hide()
      },
      _getHotKey() {
        hotKey().then((res) => {
          if (res.code === ERR_OK) {
           this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '6rem' : ''
        this.$refs.searchResult.style.bottom = bottom
      },
      ...mapActions([
        'clearSearchHistory',
      ])
     },
     components: {
       searchBox,
       suggest,
       searchList,
       confirm,
     }
  
  }
</script>

<style lang="scss" scoped>
  .search {
    color: $color-theme;
    overflow: hidden;

    .title {
      padding-bottom: 1rem;
      display: flex;
      @include fs(1.4rem);
      color: $color-text-self;
      .text {
        flex: 1;
      }
    }
    .serh-history,
    .serh-hot {
      margin: 2rem 2rem 2rem;
      .label-item {
        margin: 0 2rem 1rem 0;
        display: inline-block;
        .label {
          padding: 0.2rem 1rem;
          border-radius: 0.4rem;
          background: $color-text-d;
          font-size: 1.4rem;
          color: $color-text-self;
        }
      }
    }
    .search-result {
      position: fixed;
      width: 100%;
      top: 17rem;
      bottom: 0;
    }
    .confirm {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
  }
</style>