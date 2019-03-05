<template>
<transition name="drop">
 <div class="top-tip-wrap" v-show="showFlag" @click.stop="hide">
   <slot></slot>
  </div>
</transition>
  
</template>
<script>
export default {
  data() {
    return {
      showFlag: false,
    }
  },
  props: {
   delay: {
      type: Number,
      default: 3000,
   }
  },
 
  methods: {
    hide() {
      this.showFlag = false
    },
    show() {
      this.showFlag = true
      clearTimeout(this.timer) 
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay);
    }
  },
}
</script>

<style lang="scss" scoped>

  
  .top-tip-wrap {
  position: fixed;
  z-index: 500;
  top: 0;
  width: 100%;
  height:4rem;
  text-align: center;
  line-height: 4rem;
  color: #fff;
  background-color: $bg-item-color;
  &.drop-enter-active, &.drop-leave-active {
    transition:  all 0.3s;
  }
  &.drop-enter, &.drop-leave-to {
    transform: translate3d(0, -100%, 0)
  }
}


</style>


