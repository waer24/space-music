<template>
  <div id="App">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <a target="_blank" @click="jumpMonitor" style="cursor: pointer;color:#fff">201711078226927</a>
    <!-- 不属于路由，是应用相关的页面，在任何路由下都可以播放 -->
  </div>
</template>

<script>
  import mHeader from '@/components/m-header/m-header'
  import tab from '@/components/tab/tab'
  import player from '@/components/player/player'

  import { imeiLink } from '@/common/js/player2.js'
  
  
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
    
    methods: {
       jumpMonitor() {
				let keyword = this.sendFormLink.keyword
				let userId = this.sendFormLink.userId
				let url = 'http://172.16.0.121:8280/console'
				imeiLink(keyword, userId).then((res) => {
					if(res.code) {
						this.$router.push({
							path: url,
							query: {
								keyword,
								userId
							}
						})
					}
				})
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