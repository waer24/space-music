<template>
  <div class='link-wrap'>
    <router-link class="link-items" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link class="link-items" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link class="link-items" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link class="link-items" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  
</script>

<style lang="scss" scoped>
  .link-wrap {
    padding-top: 1rem;
    display: flex;
    justify-content: space-around;
    @include fs($font-size-medium);
    .link-items {
      flex: 1;
      text-align: center;
      .tab-link {
        color: $color-text-ll;
        @include pb(0.5rem);
      }
      /* 路由点击时文字高亮 */
      &.router-link-active {
        .tab-link {
          color: $color-theme;
          border-bottom: 0.2rem solid $color-theme;
        }
      }
    }
  }
</style>
