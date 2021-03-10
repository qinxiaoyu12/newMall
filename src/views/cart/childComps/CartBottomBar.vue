<template>
    <div class="cart-bottom-bar">
      <div>
        <cart-bottom-bar/>
        <span>全选</span>
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButtom/CheckButton";
    export default {
        name: "CartBottomBar",
      components: {
        CheckButton
      }
    }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    background-color: red;
    position: relative;
  }
</style>
