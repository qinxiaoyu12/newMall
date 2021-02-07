<template>
    <div id="detail">
        <detail-nav-bar class="detail-bar"/>
        <Scroll class="content" ref="scroll">
          <detail-swiper :topImages="topImages"/>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop-info="shopInfo"/>
          <detail-goods-info :DetailGoodsInfo="detailGoodsInfo" @imageLoad="imageLoad"/>
        </Scroll>
    </div>
</template>

<script>
  import DetailSwiper from "@/views/detail/childComponts/DetailSwiper";
  import DetailNavBar from './childComponts/DetailNavBar'
  import DetailBaseInfo from "./childComponts/DetailBaseInfo";
  import DetailShopInfo from "./childComponts/DetailShopInfo";
  import DetailGoodsInfo from "./childComponts/DetailGoodsInfo";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, Goods, shop} from "@/network/detail";
    export default {
        name: "Detail",
        components: {
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          Scroll,
          DetailGoodsInfo
        },
      data() {
          return {
            iid: null,
            topImages: [],
            goods: {},
            shopInfo: {},
            detailGoodsInfo: {}
          }
        },
      created() {
          this.iid = this.$route.params.iid

        //2.根据iid请求详细数据
        getDetail(this.iid).then(res => {
          console.log(res);
          const data = res.result;
          this.topImages = data.itemInfo.topImages


          //3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //4.获取店铺信息
          this.shopInfo = new shop(data.shopInfo)

          //5.保存商品的详情数据
          this.detailGoodsInfo = data.detailInfo;
        })
      },
      methods: {
        imageLoad() {
          this.$refs.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  ;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
