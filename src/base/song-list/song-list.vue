<template>
  <div class="song-list-wrapper">
    <ul>
      <li class="item" @click="selectItem(song, index)" v-for="(song,index) in isSongs" :key="index">
        <div class="rank-list" v-show="rank">
          <span :class="getRankIcon(index)" v-text="getRankIndex(index)"></span>
        </div>
          <div class="content">
            <h2 class="text">{{song.name}}</h2>
        <p class="subtext">{{song.singer}} </p>
          </div>
        
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
      },
      rank: {
        type: Boolean,
        default: false,
      } 
    },
    computed: {
      getDesc(song) {
        return `${song.singer}·${song.name}`
      },
    },

    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getRankIcon(index){
        if ( index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankIndex(index){
        if (index > 2) {
          return `${index}`
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
.song-list-wrapper{
  // height: 64px;
  .item {
    display: flex;
    align-items: center;
    overflow: hidden;
    color: $color-text;
    padding: 0.8rem 0;
    .rank-list {
      flex: 0 0 2.5rem;
      width:2.5rem;
      margin-right: 2rem;
      text-align: center;
      .icon {
        width: 2.5rem;
        height: 2.4rem;
        background-size: 2.5rem 2.4rem;
        display: inline-block;
        &.icon0 {
          @include bg-img('first')
        }
        &.icon1 {
          @include bg-img('second')
        }
        &.icon2 {
          @include bg-img('third')
        }
      }
      .text{
        font-size: 1.8rem;
        color: $color-theme;
      }
    }
    .content{
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
}

</style>
