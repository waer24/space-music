<template>
<transition name="slide">
  <div class="top-tip" v-show="showFlag">
    <span class="icon"><i class="icon-ok"></i></span>
    {{tip}}</div>
</transition>
  
</template>
<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    tip: {
      type: String,
      default: '1首歌曲已经添加到播放列表'
    }
  },
  methods: {
    hide() {
      this.showFlag = false
    },
    show() {
      this.showFlag = true
    }
  },
}
</script>

<style lang="scss" scoped>
.slide {
  &.slide-enter-active, &.alide-leave-active {
    transition:  all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(0, 0, 0)
  }
  .top-tip {
  .icon {
    @include fs(1.3rem);
  }
  position: fixed;
  top: 0;
  width: 100%;
  height:4rem;
  text-align: center;
  line-height: 4rem;
  @include fs(1.4rem);
  color: #fff;
  background-color: $bg-item-color;
}
}

</style>


