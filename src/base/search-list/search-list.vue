<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li class="list-item" v-for="item in searches" :key="item"
          @click="select(item)">
        <span class="list-content">{{item}}</span>
        <span class="icon-wrap" @click.stop="deleteOne(item)"><i class="icon-close"></i></span>
      </li>
        </ul>
  </div>  
</template>

<script>
export default {
  props:  {
      searches: {
        type: Array,
        default:function() {
          return []
        }
      }
  },
  methods: {
    deleteOne (item) {
      this.$emit('deleteHistory', item)
    },
    select (item) {
      this.$emit('selectHistory', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-list {


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
      }
</style>

