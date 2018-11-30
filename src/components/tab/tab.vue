<template>
  <div class='link-wrap'>
    <router-link class="link-items" :to="{name: 'recommand'}"><span class="tab-link">推荐</span></router-link>
    <router-link class="link-items" :to="{name: 'singer'}"><span class="tab-link">歌手</span></router-link>
    <router-link class="link-items" :to="{name: 'rank'}"><span class="tab-link">排行</span></router-link>
    <router-link class="link-items" :to="{name: 'search'}"><span class="tab-link">搜索</span></router-link>
  </div>
</template>

<script>
  
</script>

<style lang="sass">
  .link-wrap
    padding-top: 1rem
    display: flex
    justify-content: space-around

    .link-items
      color: $color-text-l
      @include fs(1.8rem)


</style>
