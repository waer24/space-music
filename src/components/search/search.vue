<template>
  <div class='search'>
    <search-box ref="searchBox" @query="onQueryChange"></search-box>
    <div class="serh-wrap" ref="serhWrap" v-show="!query">
      <scroll :scrollData="shortcut"
      :refreshDelay="refreshDelay"
      ref="shortcut">
  <div>
      <div class="serh-hot" ref="searchHot">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li class="label-item" v-for="(item, index) in hotKey" :key="index"
          @click="selectHotSong(item.k)">
            <span class="label">{{item.k}}</span>
          </li>
        </ul>
      </div>
      <div class="serh-history" v-show="searchHistory.length">
        <h2 class="title">
          <span class="text">搜索历史</span>
          <span class="icon-trash-wrap" @click="showConfirm">
            <i class="icon-clear"></i>
          </span>
        </h2>
       <search-list @delete="deleteSearchHistory" @select="selectHotSong" :searches="searchHistory"></search-list>
        <confirm style="display:none"></confirm>
        <router-view></router-view>
      </div>
    </div>
  </scroll>
    </div>
    <div class="serh-result">
      <suggest ref="suggest"></suggest>
    </div>
  </div>
</template>

<script>
  import scroll from '@/base/scroll/scroll'
  import searchBox from '@/base/search-box/search-box'
  import searchList from '@/base/search-list/search-list'
  import confirm from '@/base/confirm/confirm'
  import suggest from '@/components/suggest/suggest'
  import { hotKey } from '@/api/search'
  import { ERR_OK } from '@/api/config'
  import { searchMixin } from '@/common/js/mixin'
  import {mapActions} from 'vuex'

  export default {
    mixins: [searchMixin],
    data() {
      return {
        hotKey: [],
      }
    },
    created() {
      this._getHotKey()
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    methods: {
      selectHotSong(item){
        console.log(item)
      },

      showConfirm() {
        this.$refs.confirm.show()
      },

      _getHotKey() {
        hotKey().then((res) => {
          if(res.code === ERR_OK){
            this.hotKey = res.data.hotkey.slice(0, 10)
          // console.log(this.hotKey)
            return this.hotKey
          }
        })
      },

      ...mapActions([
        'clearSearchHistory'
      ])

    },
     watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },

    components: {
      searchBox,
      confirm,
      suggest,
      searchList,
      scroll,
    },
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
    .serh-result {
      position: fixed;
      width: 100%;
      top: 17rem;
      bottom: 6rem;
    }
  }
</style>