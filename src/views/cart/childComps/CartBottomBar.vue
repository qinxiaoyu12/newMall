<template>
    <div class="cart-bottom-bar">
      <div class="check-content">
        <check-button class="check-button"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计: {{totalPrice}}
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButtom/CheckButton";
    export default {
        name: "CartBottomBar",
      components: {
        CheckButton
      },
      computed: {
        totalPrice() {
          return '￥' + this.$store.state.cartList.filter(item => {
            return item.itemActive
          }).reduce((preValue, item) => {
              return preValue + (item.price * item.count)
          }, 0).toFixed(2)
        }
      }
    }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
  }
</style>
