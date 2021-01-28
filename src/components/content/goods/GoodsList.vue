<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {GoodsListItem},
  comments: {
    GoodsListItem
  },
  props: {
    goods:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
