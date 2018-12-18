<template>
  <div id="App">
  
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import mHeader from '@/components/m-header/m-header'
  import tab from '@/components/tab/tab'
  
  
  export default {
    name: "App",
    methods: {
  
    },
    components: {
      mHeader,
      tab
    },
  }
</script>

<style lang="scss">
  
</style>