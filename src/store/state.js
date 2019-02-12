/* 
声明 state => this.$store.state.NAME
*/
import { playMode } from '@/common/js/config'
import {loadSearch} from '@/common/js/cache'

const state = {
   disc: {},
   singer: {},
   /* state记录最基础的player数据，如当前播放歌曲可以通过playlist[currentIndex]来合成,放在gettters里面，所以不必写在state中 */
   playing: false,
   fullScreen: false,
   playList: [],
   sequenceList: [],
   mode: playMode.sequence, // 默认顺序播放
   currentIndex: -1,
   topList: {}, // rank 
   searchHistroy: loadSearch(), // 加载本地缓存的加载历史
   

}
export default state