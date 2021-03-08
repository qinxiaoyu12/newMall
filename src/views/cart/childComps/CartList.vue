<template>
 <div class="cart-list">
   <li v-for="item in cartList">{{item}}</li>
 </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "CartList",
        computed: {
          ...mapGetters(['cartList'])
      }
    }
</script>

<style scoped>

</style>
