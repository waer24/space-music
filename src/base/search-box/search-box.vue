<template>
  <div class="search-box">
    <div class="search-box-inner">
      <i class="icon icon-Search"></i>
      <input ref="query" type="text" class="ipt" v-model="query" :placeholder="placeholder">
      <i class="icon-bg icon-close" @click="clear" v-show="query" ></i>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/common/js/utils'
import { searchMixin} from '@/common/js/mixin'

  export default {
    mixins: [searchMixin],
  
    props: {
      placeholder: {
        type: String,
        default: '请输入歌曲、歌手'
      }
    },

    created() { // 监控输入到input框的值
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery) // 组件当中引用query,把query能够暴露出去
      }, 200))
    },

    methods: {
      blur() {
        this.$refs.query.blur()
      },
      clear(){
        this.query = ''
      },
      setQuery(newQuery) { // 设置，通过mixin能取到
        this.query = newQuery
      }
    },
    
  }
</script>

<style lang="scss" scoped>
  .search-box {
    // width: 100%;
    margin: 2rem;
    .search-box-inner {
      background-color: $color-text-d;
      .icon {
        vertical-align: middle;
        line-height: 3.2rem;
        padding-left: 0.3rem;
      }
      .ipt {
        line-height: 3rem;
        width: 80%;
        color: #fff;
        @include fs(1.4rem);
        background-color: rgba(255, 255, 255, 0);
      }
      .icon-bg {
        font-size: 1.2rem;
        border-radius: 50%;
      }
    }
  }
</style>
