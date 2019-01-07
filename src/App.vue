<template>
  <div id="App">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <!-- 不属于路由，是应用相关的页面，在任何路由下都可以播放 -->
  </div>
</template>

<script>
  import mHeader from '@/components/m-header/m-header'
  import tab from '@/components/tab/tab'
  import player from '@/components/player/player'
  
  
  export default {
    name: "App",
    data() {
    return {
      sendFormLink: {
					keyword: null,
					userId: null,
				}
    }
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