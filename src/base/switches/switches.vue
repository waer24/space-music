<template>
  <ul class="switches">
    <li class="item" v-for="(item, index) in list" :key="index"
    :class="{'active': currentIndex === index}"
    @click="switchItem(index)">
      <span class="txt">{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    switchItem(index) {
      this.$emit('switch',index)
    }
  }
  }
</script>

<style lang="scss" scoped>
  .switches {
    border: 1px solid #C4C4C4;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    width: 24rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .item {
      color: #C4C4C4;
      padding: 0.4rem 0.5rem;
      margin: 0;
      flex: 1;
      text-align: center;
      .txt {
        @include fs(1.4rem);
      }
    }
    .active {
      color: #fff;
      background-color: $color-text-d;
    }
  }
</style>

