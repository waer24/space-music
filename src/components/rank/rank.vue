<template>
  <div class='rank-wrap'>
    rank 页面
  </div>
</template>

<script>
import { getMusicList } from '@/api/rank.js'
import { ERR_OK } from '@/api/config'

  export default {
    created() {
      this._getMusicList()
    },

    methods: {
      _getMusicList() {
        getMusicList().then((res) => {
          
          if (res.code === ERR_OK) {
            console.log(22  )
            console.log(res.data)
          }
        })
      },

      
    },

    
  
  }
</script>

<style lang="scss">
  .rank-wrap {
    color: $color-theme
  }
    
</style>