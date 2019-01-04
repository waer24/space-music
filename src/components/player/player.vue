<template>
  <a target="_blank" @click="jumpMonitor" style="cursor: pointer">201711078226927</a>
</template>

<script>
import { imeiLink } from '@/common/js/player2.js'

export default {
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
				let url = GO_BACK_URL.split('/fleetIndex').join('')+ '/console'
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
  }
}
</script>

