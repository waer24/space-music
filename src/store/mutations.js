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
  [type.SET_PLAYING_STATE](state, flag) { // 布尔值就用flag
    state.playing = flag
  },
  [type.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [type.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },
  [type.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [type.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [type.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }

}

export default mutations