<template>
  <div class="list-view">
    <ul class="list">
      <li class="list-stripe" v-for="(item,index) in listData" :key="index">
        <h2 class="list-title">{{ item.title }}</h2>
        <ul>
          <li class="text-item">
            <img src="@/common/images/default.png" alt="" class="avatar">
            <span class="txt">jay zhou</span>
          </li>
        </ul>
      </li>
  
  
  
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      listData: {
        type: Array,
        default: [] //如果写：default: [] =》 error: Use Array/Object in props as default value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-view {
    position: relative;
    overflow: hidden;
    background-color: darkred;
    .list-stripe {
      padding-bottom: 3rem;
      .list-title {
        @include fs-bg;
        height: 2rem;
        line-height: 2rem;
        background-color: rgb(153, 80, 84)
      }
      .text-item {
        display: flex;
        align-items: center;
        padding: 2rem 0 0 2rem;
        .avatar {
          width: 5rem;
          height: 5rem;
          padding-right: 1rem;
          border-radius: 50%;
        }
        .txt {
          @include fs-bg;
        }
      }
    }
  }
</style>

