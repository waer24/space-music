<template>
  <div id="App">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
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

<style lang="sass">

</style>

