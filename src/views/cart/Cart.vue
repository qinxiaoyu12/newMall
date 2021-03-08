<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="car-bar">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import { mapGetters } from "vuex"
  export default {
    name: "Cart",
    components: {
      NavBar
    },
    computed: {
     ...mapGetters({
       length: 'cartLength',
       list: 'cartList'
     })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }
</style>
