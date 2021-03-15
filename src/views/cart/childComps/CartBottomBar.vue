<template>
    <div class="cart-bottom-bar">
      <div class="check-content">
        <check-button class="check-button"
                      :is-active="isSelectAll" @click.native="buttonClick"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计: {{totalPrice}}
      </div>

      <div class="calculate">
        去计算：({{checkLength}})
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
        },
        checkLength() {
          return this.$store.state.cartList.filter(item => item.itemActive).length
        },
        isSelectAll() {
          if (this.$store.state.cartList.length === 0) {
            return false;
          } else {
            return !(this.$store.state.cartList.filter(item => !item.itemActive).length)
          }
        }
      },
      methods: {
        buttonClick() {
          if (this.isSelectAll) {
            this.$store.state.cartList.forEach(item => item.itemActive = false)
          } else {
            this.$store.state.cartList.forEach(item => item.itemActive = true)
          }
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

    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
