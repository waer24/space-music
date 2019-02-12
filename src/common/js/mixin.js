import { mapGetters, mapMutations, mapActions } from 'vuex'


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
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory'
    ])
  }

}
