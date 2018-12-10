<template>
<div class="music-list-wrap">
  <div class="back">
    <i class="icon icon-back"></i>
  </div>
  <h1 class="title"></h1>
  <div class="bg-img"> </div>
</div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../common/style/fonts.css';

.music-list-wrap {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 0.6rem;
    z-index: 50;
    .icon-back {
      padding: 1rem;
    }
  }
}
</style>
