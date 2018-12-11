<template>
 <transition name="slide">
   <music-list :is-title="title" :is-bg-img="bgImg">

   </music-list>
 </transition>
</template>

<script>
import musicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'

  export default {
    computed: {
      title() {
       
        return this.disc.dissname
      },
      bgImg() {
         // console.log(this.disc)
        return this.disc.imgurl
      },
      ...mapGetters(['disc'])
    }, 

    components: {
      musicList,
    }
  }
</script>

<style lang="scss" scoped>
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s
}
</style>
