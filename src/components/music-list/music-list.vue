<template>
<div class="music-list-wrap">
  <div class="back">
    <i class="icon icon-back"></i>
  </div>
  <h1 class="title"> {{ title }} </h1>
  <div class="bg-img"> dsf</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
       // dissname,
      }
    },

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
        // Object/Array must use a factory function to return the default value.
        default(){ 
          []
        }
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
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0.6rem;
    z-index: 50
  }
}
</style>
