<template>
  <div class="recommend-wrap">
    <!-- scroll放在这里是因为滚动事件会覆盖到整个屏幕,content是父级，slider-wrap是子级 -->
    <scroll ref="commend-content" class="recomment-content" :scroll-data="discList">
      <div>
        <div class="bg-hide"></div>
        <!-- 不加length 会造成事件先于渲染的dom，无法获取所有slider-item的宽度 -->
        <div v-if="recommends.length" class="slider-wrap" ref="sliderWrapper">
          <slider>
            <!-- vfor是slot中的轮播图展示 -->
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="" class="slider-img">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul class="list-wrap">
            <li v-for="(item,index) in discList" :key="index" @click="selectItem(item)" class="list-item">
              <div class="list-img"><img :src="item.imgurl" width="60" height="60" alt=""></div>
              <div class="list-txt">
                <h2 class="list-tlt"> {{ item.creator.name }}</h2>
                <p class="list-subtlt">{{ item.dissname }}</p>
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
    getDiscList
  } from '@/api/recommend.js'
  import {
    ERR_OK
  } from '@/api/config'
  import scroll from '@/base/scroll/scroll'
  import slider from '@/base/slider/slider'
  import loading from '@/base/loading/loading'
  
  
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
            this.recommends = res.data.slider
          }
        })
      },

      // 渲染歌单
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK){
            //  console.log(res.data.list)
            this.discList = res.data.list // 真正的数据源，用一个变量代进去
          }
        })
      },
  
     selectItem(item) {
       this.$router.push({
        path: `recommend/${item.dissid}`,
       })
     }
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
                font-size: $font-size-small;
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