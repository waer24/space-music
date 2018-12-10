<template>
  <div class='loading-wrap'>
    <img src="./loading.gif" alt="" class='loading-icon' width="24" height="24">
    <p class='desc'>{{ title }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style lang="scss" scoped>
.loading-wrap {
  width: 100%;
  text-align: center;
  .desc{
    line-height: 2.4rem;
    font-size: $font-size-small;
    color: $color-text-l;
  }
  
}
</style>
