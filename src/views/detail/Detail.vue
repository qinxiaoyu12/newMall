<template>
    <div id="detail">
        <detail-nav-bar/>
        <detail-swiper :topImages="topImages"/>
    </div>
</template>

<script>
  import DetailSwiper from "@/views/detail/childComponts/DetailSwiper";
  import {getDetail} from "@/network/detail";
  import DetailNavBar from './childComponts/DetailNavBar'
    export default {
        name: "Detail",
        components: {
          DetailNavBar,
          DetailSwiper
        },
      data() {
          return {
            iid: null,
            topImages: []
          }
        },
      created() {
          this.iid = this.$route.params.iid

        //2.根据iid请求详细数据
        getDetail(this.iid).then(res => {
          this.topImages = res.result.itemInfo.topImages
        })
      }
    }
</script>

<style scoped>

</style>
