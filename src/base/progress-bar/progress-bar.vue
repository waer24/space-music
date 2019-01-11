<template>
    <div class="process-bar-wrap">
        <div class="bar-inner">
            
            <div>
                <div class="play-dot"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
    .process-bar-wrap {
        flex: 1;
        height: 3rem;
        .bar-inner {
            height: 0.4rem;
            top: 0.5rem;
            background-color: $color-background-d;
            position: relative;
            .bar-passed {
                height: 100%;
                background-color: $color-theme;
            }
            .play-dot {
                position: absolute;
                top: -0.4rem;
                left: 0;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                box-sizing: border-box;
                border: 0.2rem solid $color-text;
                background-color: $color-theme;
            }
        }
    }
</style>


