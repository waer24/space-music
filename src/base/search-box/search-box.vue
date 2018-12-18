<template>
  <div class="search-box">
    <div class="search-box-inner">
      <i class="icon icon-Search"></i>
      <input ref="query" type="text" class="ipt" v-model="query" :placeholder="placeholder">
      <i class="icon-bg icon-close" @click="clear" v-show="query"></i>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: ''
      }
    },

    props: {
      placeholder: {
        type: String,
        default: '请输入歌曲、歌手'
      }
    },

    

    methods: {
      clear(){
        this.query = ''
      },

      /* blur() {
        this.$refs.query.blur()
      } */
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
      }
      .ipt {
        line-height: 3rem;
        width: 80%;
        color: #fff;
        @include fs(1.4rem);
        background-color: $color-text-d;
      }
      .icon-bg {
        font-size: 1.2rem;
        border-radius: 50%;
      }
    }
  }
</style>
