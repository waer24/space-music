<template>
  <div class="recommend-wrap">
    <!-- scroll放在这里是因为滚动事件会覆盖到整个屏幕,content是父级，slider-wrap是子级 只有传入数据了才能撑起变化 -->
    <scroll ref="commend-content" class="recomment-content" :scroll-data="discList">
      <div>
        <div class="bg-hide"></div>
        <!-- 不加length 会造成事件先于渲染的dom，无法获取所有slider-item的宽度 -->
        <div v-if="recommends.length" class="slider-wrap" ref="sliderWrapper">
          <keep-alive>
            <slider>
              <!-- vfor是slot中的轮播图展示 -->
              <div v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="" class="slider-img">
                </a>
              </div>
            </slider>
          </keep-alive>

        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul class="list-wrap">
            <li v-for="(item,index) in discList" :key="index" @click="selectItem(item)" class="list-item">
              <div class="list-img"><img v-lazy="item.pic" width="60" height="60" alt=""></div>
              <div class="list-txt">
                <h2 class="list-tlt"> {{ item.creator }}</h2>
                <p class="list-subtlt">{{ item.name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <!-- loading icon -->
    <div class='loading' v-show="!discList.length">
      <loading></loading>
    </div>
    <!-- 不加这个会导致不会渲染music-list -->
    <router-view></router-view>
  </div>
</template>

<script>
  // import BScroll from 'better-scroll'
  import {
    getWallSwiper,
    getDiscList,
    getSongList
  } from '@/api/recommend.js'
  import {
     ERR_OK, STATUS_OK
  } from '@/api/config'
  import scroll from '@/base/scroll/scroll'
  import slider from '@/base/slider/slider'
  import loading from '@/base/loading/loading'
  import {
    mapMutations
  } from 'vuex'
  
  
  export default {
    data() {
      return {
        recommends: [],
        discList: [] // 抓取的歌单数据
      }
    },
  
    created() {
      this._getWallSwiper()
      this._getDiscList()
    },

    methods: {
      // 渲染推荐的swiper
      _getWallSwiper() {
        getWallSwiper().then((res) => {
           if (res.code === ERR_OK) {
          // console.log(res.data)
          this.recommends = res.data.slider
          }
        })
      },
  
      // 渲染歌单
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === STATUS_OK ){
             //  console.log(res.data)
            this.discList = res.data // 真正的数据源，用一个变量代进去
          }
        })
      },

     selectItem(item) {
       this.$router.push({
        path: `recommend/${item.id}`, // 进入到点击的那个具体歌单里面
       })
       // console.log(item.id)
       this.setDisc(item) // 触发每个歌单item的歌单详情页面,
     },

     loadImg(){
       this.$refs.commendContent.refresh()
     },

     ...mapMutations({
       setDisc: 'SET_DISC' // 将事件提交到vuex中，使得后面的组件能拿到这个磁盘中的数据
     }) 
    },
  
    components: {
      scroll,
      slider,
      loading,
    }
  }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .recommend-wrap {
    margin-top: 1rem;
    position: fixed;
    width: 100%;
    top: 8.8rem;
    bottom: 0;
    .recomment-content {
      overflow: hidden;
      height: 100%;
      .bg-hide {
        position: fixed;
        width: 100%;
        overflow: hidden;
      }
      .slider-wrap {
        position: relative;
        width: 100%;
        overflow: hidden;
        .slider-img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .recommend-list {
        overflow: hidden;
        .list-title {
          line-height: 6.5rem;
          @include fs(1.4rem);
          text-align: center;
          color: $color-theme;
        }
        .list-wrap {
          padding: 0 2rem;
          .list-item {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            padding-bottom: 2rem;
            .list-img {
              /* 默认不放大； 空间不足时，不缩小，主轴占宽6rem */
              flex: 0 0 6rem;
              width: 6rem;
              padding-right: 2rem;
            }
            .list-txt {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              .list-tlt {
                color: $color-text;
                @include pb(1rem);
                @include fs(1.4rem);
              }
              .list-subtlt {
                color: $color-text-d;
                @include fs(1.4rem);
              }
            }
          }
        }
      }
    }
    .loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 22rem;
    }
  }
</style>