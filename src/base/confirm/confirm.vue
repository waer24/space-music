<template>
  <div class="confirm-wrap" v-show="showFlag">
    <div class="confirm">
      <div class="content">{{contentText}}</div>
      <div class="select">
        <span class="lf" @click="cancel">{{cancelText}}</span>
        <span class="rt" @click="confirm">{{sureText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
  return {
    showFlag: false
  }
},
props: {
contentText: {
  type: String,
  default: ''
},
  cancelText: {
    type: String,
    default: '取消'
  },
  sureText: {
    type: String,
    default: '确定'
  }
},
methods: {
  show() {
    this.showFlag = true
  },
  hide() {
    this.showFlag = false
  },
  cancel() {
    this.$emit('cancel')
  },
  confirm() {
    this.$emit('confirm')
  }
}
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
    background-color: #99112C;
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


