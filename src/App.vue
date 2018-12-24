<template>
  <div id="App">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import mHeader from '@/components/m-header/m-header'
  import tab from '@/components/tab/tab'
  import player from '@/components/player/player'
  
  
  export default {
    name: "App",
    methods: {
  
    },
    components: {
      mHeader,
      tab,
      player
    },
  }
</script>

<style lang="scss">
  
</style>