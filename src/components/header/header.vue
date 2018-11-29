<template>
  <div class='wrap'>
    <div class='header'>
      <img src="@/common/images/default.png" alt="" class="logo">
      <h4 class='fc'>Space Music</h4>
      <span class='icon mine'></span>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang='scss' scoped>
@import '@/common/style/variable.scss';
@import '@/common/style/mixin.scss';
@import '../../common/style/fonts.css';

.wrap {
  .header{
    .logo {
      display: inline-block;
    }
    .fc {
      color:$color-theme;
      @include fs(2.3rem);
    }
  }
}

</style>