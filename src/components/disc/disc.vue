<template>
 <transition name='slide'>
   <music-list >desdd</music-list>
 </transition>
</template>

<script>
import musicList from '@/components/music-list/music-list'

  export default {
    computed: {
      title() {
        console.log(this.disc);
         return this.disc.dissname;
      }
    },

    components: {
      musicList,
    }
  }
</script>

<style lang="scss" scoped>
.slide-enter, .slide-leave {
  transform: translate3d(100%, 0, 0);
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s
}
</style>
