<template>
<transition name="confirm-fade">
  <div class="confirm-wrap" v-show="showFlag">
    <div class="confirm-inner">
    <div class="confirm">
      <div class="content">{{contentText}}</div>
      <div class="select">
        <span class="lf" @click.stop="cancel">{{cancelText}}</span>
        <span class="rt" @click.stop="confirm">{{sureText}}</span>
      </div>
    </div>
    </div>
  </div>
</transition>
  
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
  position: fixed;
  left:0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index:400;
  &.confirm-fade-enter-active{
    animation: confirm-fadein 0.3s;
    .confirm {
      animation: confirm-zoom 0.3s;
    }
  }
  .confirm-inner {
     position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #99112C;
  
  .confirm{
   width: 27rem;
    
    font-size: 1.5rem;
    min-width: 15rem;
    color: $color-text-ll;
    border-radius: 0.8rem;
    
    .content {
      border-bottom: 1px solid #800000;
    padding: 1rem 0;
        text-align: center;
    }
    .select{
      display: flex;
      text-align: center;
      .lf {
        flex: 1;
        padding: 1rem 0;
        border-right: 1px solid #800000;
      }
      .rt {
        flex: 1;
        padding: 1rem 0;
      }
    }
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

}
@keyframes confirm-zoom {
  0% {
    transform: scale(0)
  }
  50% {
    transform: scale(1.1)
  }
  100% {
    transform: scale(1)
  }



  }
}
}
</style>


