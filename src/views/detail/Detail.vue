<template>
    <div id="detail">
        <detail-nav-bar/>
    </div>
</template>

<script>
  import DetailNavBar from './childComponts/DetailNavBar'
    export default {
        name: "",
        components: {
          DetailNavBar
        },
        data() {
          return {
            iid: null
          }
        },
      created() {
          this.iid = this.$route.params.iid
      }
    }
</script>

<style scoped>

</style>
