<template>
  <div class="top-tip">{{tip}}</div>
</template>
<script>
export default {
  props: {
    tip: {
      type: String,
      default: '1首歌曲已经添加到播放列表'
    }
  }
}
</script>

<style lang="scss" scoped>
.top-tip {
  position: fixed;
  top: 0;
  background-color: $bg-item-color;
}
</style>


