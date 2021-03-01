import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener )
  }
}
