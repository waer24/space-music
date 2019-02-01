<template>
  <div class="suggest-wrap">
    <ul class="list">
        <li>
          <!-- icon-mine -->
          <div class="item">
            <i class="icon icon-music"></i>
            <p class="name">withof</p>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .suggest-wrap {
    height: 100%;
    overflow: hidden;
    .list {
        margin: 0 2rem;
        overflow: hidden;
          .item {
          width: 100%;
          overflow: hidden;
          display: flex;
          padding-bottom: 1rem;
          .icon {
            font-size: 1.6rem;
            flex: 0 0 1.6rem;
            padding-right: 0.5rem;
            width: 1.6rem;
            line-height: 2rem;
            color: $color-text-self;
          }
          .name {
            display: inline-block;
            font-size: 1.4rem;
            color: $color-text-self;
            @include no-wrap()
          }
        }
      }
  }
</style>



