<template>
  <div class='wrap'>
    <div class='header'>
      <div class="logo"></div>
      <h4 class='fc'>Space Music</h4>
      <router-link tag="div" class='mine-wrap pa' to="/user">
        <i class='icon icon-mine'></i>
      </router-link>
    </div>
  </div>
</template>


<style lang='scss'>
  @import '../../common/style/fonts.css';
  .wrap {
    .header {
      padding-top: 0.5rem;
      text-align: center;
      position: relative;
      .logo {
        width: 4rem;
        height: 4rem;
        @include ib;
        @include bg-img('./logo');
        background-size: 100% 100%;
        ;
        margin-right: 1rem;
      }
      .fc {
        @include ib;
        @include fs(2.3rem);
        padding-top: 0.5rem;
        color: $color-theme;
        vertical-align: top;
        font-weight: 400;
      }
      .mine-wrap {
        right: 1.5rem;
        top: 1rem;
      }
    }
  }
</style>