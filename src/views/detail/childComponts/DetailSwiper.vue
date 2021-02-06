<template>
    <Swiper>
      <SwiperItem id="detailStyle" v-for="item in topImages">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: Array,
    default() {
      return []
    }
  }
}
</script>

<style scoped>
  #detailStyle {
    height: 300px;
    overflow: hidden;
  }
</style>
