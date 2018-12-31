/* mapActins => this.$store.dispatch('functionName') */
import * as types from './mutation-types'

export const selectItemPlay = function ({state, commit}, {list, index}) {
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
}

