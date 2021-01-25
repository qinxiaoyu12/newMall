<template>
  <div class="tabControl" >
    <div v-for="(item, index) in titles"
         class="tabControlItem"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style scoped>
  .tabControl {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    lin-height: 40px;
    background-color: #fff;
}
  .tabControlItem {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
