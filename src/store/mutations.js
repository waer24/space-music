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
}

export default mutations