<template>
  <div class='search' >
  <search-box ref="searchBox" @query="onQueryChange"></search-box>
    <div class="serh-wrap" ref="serhWrap" v-show="!query">
      <div>
        <div class="serh-hot" ref="searchHot">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="label-item" @click="selectHistory(item.k)" v-for="(item, index) in hotkey" :key="index">
              <span class="label">{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="serh-history" v-show="searchHistory.length">
          <h2 class="title">
            <span class="text">搜索历史</span>
            <span class="icon-trash-wrap">
              <i class="icon-clear"></i>
            </span>
          </h2>
          <search-list :searches="searchHistory" @deleteHistory="deleteSearchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @listScroll="blurInput" @searchItem="saveSearch"></suggest>
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
import { mapGetters, mapActions } from 'vuex';
import { searchMixin} from '@/common/js/mixin'

  export default {
    mixins: [searchMixin],
    data() {
      return {
        hotkey: [], 
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    created() {
      this._getHotKey()
    },
    methods: {
      selectHistory(item) {
       this.$refs.searchBox.setQuery(item)
      },
     /*  deleteSearch() { 删除的时候不需要再创建一个函数
        this.deleteSearchHistory()
      }, */
      _getHotKey() {
        hotKey().then((res) => {
          if (res.code === ERR_OK) {
           this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory'
      ])
     },
     components: {
       searchBox,
       suggest,
       searchList,
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
  }
</style>