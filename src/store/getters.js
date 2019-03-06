/* mapGetters相当于computed，根据state的数据二次计算出新数据 */
// list 作为一个组件，满足外来的装载数据工作
export const disc  = state => state.disc

export const singer = state => state.singer
// player related 
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => { // 当前播放歌曲
  return state.playList[state.currentIndex] || {}
}
export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
