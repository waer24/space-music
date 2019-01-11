<template>
  <div class="singer-wrap">
   <list-view :list-data="singerData" @select="selectSinger"></list-view>
  <router-view></router-view> <!-- 挂载子路由，singer-details -->
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import listView from '@/base/listview/list-view'
import Singer from '@/common/js/singer'
import { mapMutations } from 'vuex'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

  export default {
    data() {
      return {
        singerData: []
      }
    },

    created() {
      this._getSingerList();
    },

    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer) // store.commit()提交singer数据给vuex
      },

      // 获取歌手的显示数据
      _getSingerList () {
        getSingerList().then((res) => {
         if (res.code === ERR_OK) {
             // console.log(res.data) // Fsinger_mid Fsinger_name
            this.singerData = this._normalizeSinger(res.data.list)
            // console.log(this.singerData)
           }
        })
      },
     //   let title = list[0].Fsinger_name 直接赋值去取list数组中Fsinger_name的值 取不到，数组有很多个，需要用到循环才行, forEach,
     // 将热门的放在一个数组，按首字母分类，一个字母一个数组，装好在map中
      _normalizeSinger(list){
        let map = { // {hot: items: [], title: '热门'}
          hot: { // 热门组成数组
            title: HOT_NAME,
            items: []  // 热门的所有singer
          }
        }
        Array.from(list).forEach((item, index) => {
          if ( index < HOT_SINGER_LEN ) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid // 取id是为了获取头像，所有歌手的头像的地址中有id的嵌套
            }))
          }

        // console.log(map)  // 已获取10个hot
        // 获取a-z 的 歌手数据
        const key = item.Findex 
        if ( !map[key] ) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({ // 同 Singer连接起来，才能嵌套到头像地址中
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
            // console.log(map) // yes!
      }) 
      
      // 得到有序列表，处理map 一维数组，{title: 'XXX', items: {["XXX", "XXX"]} } 对象的遍历是无序的
      let ret = []
      let hot = []
       for (let key in map) {
         let val = map[key]
         if(val.title.match(/[a-zA-Z]/)) {
           ret.push(val)
         } else if (val.title === HOT_NAME) {
           hot.push(val)
         }
       }
       // console.log(hot)
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0) // 这里报错，chartCodeAt 不是一个funcion！，是自己多加了一个t

        })
         // console.log(  hot.concat(ret) )
        return hot.concat(ret) 
      },
       ...mapMutations({
        setSinger: 'SET_SINGER'
      }) 

    },

    components: {
      listView,
    }
  }
</script>

<style lang="scss">
  .singer-wrap {
    /* wrap作为父元素，需要有固定的高度，子元素的scroll才能滚动 */
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    color: $color-theme;
  }
   
</style>