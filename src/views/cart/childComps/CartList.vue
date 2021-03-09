<template>
 <div class="cart-list">
   <Scroll class="content" ref="scroll">
     <cart-list-item v-for="(item, index) in cartList"
                     :product="item"
                     :key="index"></cart-list-item>
   </Scroll>
 </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "@/components/common/scroll/Scroll";
  import CartListItem from "@/views/cart/childComps/CartListItem";
    export default {
        name: "CartList",
        components: {
          Scroll,
          CartListItem
        },
        computed: {
          ...mapGetters(['cartList'])
      },
      activated() {
          this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
   .cart-list {
     height: calc(100% - 44px - 49px);
   }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
