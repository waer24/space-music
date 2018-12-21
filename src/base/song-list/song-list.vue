<template>
  <div class="song-list-wrapper">
    <ul>
      <li class="item" v-for="(song,index) in isSongs" :key="index">
        <h2 class="text">{{song.id.name}}</h2>
        <p class="subtext">{{song.id.singer}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: { // 父级传递一个props进来，装载数据，重申组件是子级
      isSongs: { 
        type: Array,
         default() { [] }
      } 
    },

   
  }

</script>

<style lang="scss" scoped>
.song-list-wrapper{
  // height: 64px;
  .item {
    overflow: hidden;
    color: $color-text;
    padding: 0.8rem 0;

    .text {
     @include no-wrap(); 
      @include fs(1.4rem);
     font-weight: 400;
     padding: 0.5rem 0;

    }
    .subtext {
       @include fs(1.4rem);
      color: $color-text-d;
    }
  }
}

</style>
