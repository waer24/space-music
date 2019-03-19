<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-txt">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .no-result {
    text-align: center;
    .no-result-icon {
      @include bg-img('no-result');
      background-size: 8.6rem 9rem;
      width: 8.6rem;
      height: 9rem;
      margin: 0 auto;
    }
    .no-result-txt {
      @include fs(1.6rem);
      padding-top: 1rem;
      color: $color-text-d;
    }
  }
</style>

