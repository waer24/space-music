<template>
  <div class="player-wrap">
    <div class="normal-player">
      <div class="bg">
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ.jpg?max_age=2592000" alt=""
        width="100%" height="100%">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">dao想</h1>
        <h2 class="singer">Jay</h2>
      </div>
      <div class="middle">
        <div class="cd-wrap">
          <img class="disc" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ.jpg?max_age=2592000" alt="">
        </div>
        <div class="lyrics-wrap">
          <p class="lyrics">稻香稻香稻香稻香稻香稻香稻香稻香稻香稻香</p>
        </div>
      </div>
      <div class="bottom">
        <div class="disc-dot-wrap">
          <slider></slider>
        </div>
        <div class="process-stripe">

        </div>
        <div calss="operators">
          <div class="icon">
        
          </div>
        </div>
          <p>bottom</p>
      </div>
    </div>
    <div class="mini-player"></div>
  </div>
</template>

<script>
import slider from '@/base/slider/slider'

export default {
  compoennts: {
    slider,
  }
}
</script>

<style lang="scss" scoped>
.player-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
  color: $color-text;
 
  .normal-player {
    overflow: hidden;
    height: 100%;
    .bg {
          position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
        opacity: 0.8;
     filter: blur(2rem);
     -webkit-filter: blur(2rem); 
    }
    .top {
      margin-bottom: 2rem;
      .back {
        position: absolute;
        top: 0;
        left: 1rem;
        padding: 1rem;
        transform: rotate(-90deg);
        .icon-back {
          color: $color-theme;
          @include fs(2.2rem);
        }
       
      }
       .title, .singer {
         width: 70%;
         margin: 0 auto;
           @include fs(1.8rem);
           font-weight: 400;
           text-align: center;
           padding:0.2rem 0;
           @include no-wrap;
        }
        .singer {
            @include fs(1.4rem);
        }
    }
    .middle {
      position: fixed;
      top: 8rem;
      bottom: 17rem;
      width: 100%;
      .cd-wrap {
            box-sizing: border-box;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
        .disc {
          border: 1rem solid $color-disc-border;
          border-radius: 50%;
        }
      }
      .lyrics-wrap {
        width: 80%;
        margin: 3rem auto 0;
        text-align: center;
        .lyrics {
          @include fs(1.4rem);
          overflow: hidden;
          white-space: nowrap;
          color: $color-text-self;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 5rem;
      width: 100%;
    }
  }
}
</style>


