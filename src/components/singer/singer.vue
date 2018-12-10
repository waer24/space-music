<template>
  <div class='singer-wrap'>
    dddd
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'

  export default {
    created() {
      this._getSingerList();
    },

    methods: {
      _getSingerList () {
         
        getSingerList().then((res) => {
          
         if (res.code === ERR_OK) {
           // ok le 
            // console.log(res.data.list)
           }
        })
      }
    }
  }
</script>

<style lang="scss">
  .singer-wrap {
     color: $color-theme;
  }
   
</style>