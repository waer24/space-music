import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/utils'


// 需要共用的方法
// 播放列表
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: { 
    playList(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handPlaylist method')
    }
  }
}

// 实时搜索结果
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120,
    }
  },

  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(newQuery){
      this.query = newQuery
    },
    blurInput(){
      this.$refs.searchBox.blur()
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query) // setQuery在sugges 页面中有出现
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
// 播放 和 收藏喜欢歌曲相关
export const playerMixin = {
  computed: {
    ...mapGetters([
      'sequenceList',
      'mode', // mode要从mapgetter中获取，不然无法获得上下的值
      'playList',
      'currentSong',
      'favoriteList',
    ]),
    iconClass() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
  },
  methods: {
    // 新增歌曲列表页面点击切换播放模式
    changeIcon() {
      const mode = (this.mode + 1) % 3 // 0, 1, 2
      this.setPlayMode(mode) // 提交到mutation
      let list = null
      if(this.mode === playMode.random ) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.setCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list){
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
        // 选中喜欢
        isFavorite(song) {
          const index = this.favoriteList.findIndex((item) => {
            return item.id === song.id
          })
          return index > -1 
        },
        toggleFavorite(song) {
          if(this.isFavorite(song)) {
            this.deleteFavoriteList(song)
          }else {
            this.saveFavoriteList(song)
          }
          
        },
        getFavoriteIcon(song) {
          if(this.isFavorite(song)) {
            return 'icon-like'
          }
          return 'icon-not-like'
          
          
        },
        
        
        ...mapMutations({
          setPlayMode: 'SET_PLAY_MODE',
          setPlayList: 'SET_PLAYLIST',
          setCurrentIndex: 'SET_CURRENT_INDEX',
          setPlayState: 'SET_PLAYING_STATE'
        }),

    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList',
    ])
  }
}