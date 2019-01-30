<template>
  <div class="confirm-wrap">
    <div class="confirm">
      <div class="content">是否清空所有搜索历史</div>
      <div class="select">
        <span class="lf">取消</span>
        <span class="rt">清空</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.confirm-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index:400;
  .confirm {
    padding: 2rem 4rem;
    background-color: darkred;
    font-size: 1.5rem;
    min-width: 15rem;
    color: $color-text-ll;
    border-radius: 0.8rem;
    .content {
      border-bottom: 1px solid #800000;
    padding-bottom: 1rem;
    }
    .select{
      padding-top: 1rem;
      text-align: center;
      .lf {
        border-right: 1px solid #800000;
        padding-right: 1rem;
      }
      .rt {
        padding-left: 1rem;
      }
    }
  }
}
</style>


