<template>
  <div class='search-wrap'>
    <search-box></search-box>
    <div class="serh-inner">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li class="item">
          <span>linjunjie</span>
        </li>
      </ul>
    </div>
    <div class="serh-inner">
      <h2 class="title">
        <span class="text">搜索历史</span>
        <span class="icon-trash-wrap"><i class="icon-clear"></i></span>
      </h2>
      <ul>
        <li class="list-item">
          <span class="list-content">zhoujielun</span>
          <span class="icon-wrap"><i class="icon-close"></i></span>
        </li>
         <li class="list-item">
          <span class="list-content">zhoujielun</span>
          <span class="icon-wrap"><i class="icon-close"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import searchBox from '@/base/search-box/search-box'
  
  export default {
    components: {
      searchBox,
    }
  }
</script>

<style lang="scss" scoped>
  .search-wrap {
    color: $color-theme;
    overflow: hidden;
    .title {
      padding-bottom: 1rem;
      display: flex;
      @include fs(1.4rem);
      color: $color-text-self;
       .text {
         flex: 1;
      }
      
    }
    .serh-inner {
      margin: 2rem 2rem 2rem;
      .item {
        display: inline-block;
        padding: 0.2rem 1rem;
        margin: 0 2rem 1rem 0;
        border-radius: 0.6rem;
        background: $color-text-d;
        font-size: 1.4rem;
        color: $color-text-self;
      }
      .list-item {
        display: flex;
        padding-bottom:0.5rem;
         @include fs(1.4rem);
        color: $color-text-self;
        .list-content {
          flex: 1;
        }
        .icon-wrap {
         
          position: relative;
        }
      }
    }
  }
</style>