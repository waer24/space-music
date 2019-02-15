<template>
 <!-- <scroll > --> 
  <div class="suggest-wrap">
    <ul class="list">
        <li v-for="(item, index) in result" :key="index">
          <div class="item">
            <div class="icon"></div>
              <i :class="getIconCls(item)"></i>
            <div class="name">
              <p class="text"></p>
            </div>
          </div>
        </li>
        <!-- <loading v-show="hasMore" title="" ></loading> -->
      </ul>
      <div class="no-result-wrap" >
        <!-- <no-result title="抱歉，暂无搜索结果"></no-result> -->
      </div>
  </div>
 <!--  </scroll> -->
</template>

<script>
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'

const TYPE_SINGER = 'singer'

export default {
  data() {
    return {
      hasMore: true,
      result: []
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    search() {
      search(this.query, this.page, this.showSinger).then((res) => {
        if ( res.code === ERR_OK ) {
          console.log(22)
          this.result = res.data
        }
      })
    },
    getIconCls(item) {

    },
    _genResult() {
      
    }
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  }

}

</script>

<style lang="scss" scoped>
  .suggest-wrap {
    height: 100%;
    overflow: hidden;
    .list {
        margin: 0 2rem;
        overflow: hidden;
          .item {
          width: 100%;
          overflow: hidden;
          display: flex;
          padding-bottom: 1rem;
          .icon {
            font-size: 1.6rem;
            flex: 0 0 1.6rem;
            padding-right: 0.5rem;
            width: 1.6rem;
            line-height: 2rem;
            color: $color-text-self;
          }
          .name {
            display: inline-block;
            font-size: 1.4rem;
            color: $color-text-self;
            @include no-wrap()
          }
        }
      }
      .no-result-wrap {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
  }
</style>



