import * as types from './mutation-types'
/* 
提交 mutation => this.$store.commit('functionName')
*/
const mutations = {
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },

  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) { // 布尔值就用flag
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }

}

export default mutations