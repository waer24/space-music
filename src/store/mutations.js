import * as types from './mutation-types'

const mutations = {
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
}

export default mutations