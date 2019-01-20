/* mapActins => this.$store.dispatch('functionName') */
import * as types from './mutation-types'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/utils'


export const selectItemPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)

}

export const randomModePlay = function ({commit, state}, {list}) { // commit & payload
    commit(types.SET_PLAY_MODE, playMode.random) // 先设置播放模式
    commit(types.SET_SEQUENCE_LIST, list)

    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList) // 播放列表设置为随机模式
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_CURRENT_INDEX, 0) // 从第一个开始播放 这里一直想不出怎么传index
    commit(types.SET_PLAYING_STATE, true)
}
