<template>
  <div class="list-wrap">
    <ul>
          <li class="list-item">
            <span class="list-content">zhoujielun</span>
            <span class="icon-wrap"><i class="icon-close"></i></span>
          </li>
          <li class="list-item">
            <span class="list-content">zhoujielun</span>
            <span class="icon-wrap" @click="deleteHistory"><i class="icon-close"></i></span>
          </li>
        </ul>
  </div>
</template>

<script>
export default {
  methods: {
    deleteHistory () {
      this
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
        display: flex;
        padding-bottom: 0.5rem;
        @include fs(1.6rem);
        color: $color-text-self;
        .list-content {
          flex: 1;
        }
        .icon-wrap {
          position: relative;
           @include fs(1.2rem);
          padding: 0.2rem 0.4rem;
        }
      }
</style>

