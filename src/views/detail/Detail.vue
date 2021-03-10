<template>
    <div id="detail">
        <detail-nav-bar class="detail-bar" @titleClick="titleClick"/>
        <Scroll class="content" @scroll="contentScroll" ref="scroll"  :probe-type="3">
          <detail-swiper :topImages="topImages"/>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop-info="shopInfo"/>
          <detail-goods-info :DetailGoodsInfo="detailGoodsInfo2" @imageLoad="imageLoad"/>
          <detail-params-info ref="params" :item-params="itemParams"/>
          <detail-comment-info ref="comment" :comment-info="commentInfo"/>
          <goods-list ref="recommend" :goods="recommends"></goods-list>
        </Scroll>
        <BackTop @click.native="backClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addCart="addCart"/>
    </div>
</template>

<script>
  import DetailSwiper from "@/views/detail/childComponts/DetailSwiper";
  import DetailNavBar from './childComponts/DetailNavBar'
  import DetailBaseInfo from "./childComponts/DetailBaseInfo";
  import DetailShopInfo from "./childComponts/DetailShopInfo";
  import DetailGoodsInfo from "./childComponts/DetailGoodsInfo";
  import DetailParamsInfo from "@/views/detail/childComponts/DetailParamsInfo";
  import DetailCommentInfo from "@/views/detail/childComponts/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComponts/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, Goods, shop, getRecommends} from "@/network/detail";
  import {itemListenerMixin, showBackTop} from "@/common/mixin";
  import {debounce} from "@/common/utils";

  export default {
        name: "Detail",
        components: {
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          Scroll,
          DetailGoodsInfo,
          DetailParamsInfo,
          DetailCommentInfo,
          GoodsList,
          DetailBottomBar,
        },
    mixins: [itemListenerMixin,showBackTop],
      data() {
          return {
            iid: null,
            topImages: [],
            goods: {},
            shopInfo: {},
            detailGoodsInfo1: {},
            detailGoodsInfo2: {},
            itemParams: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopYs: null,
            resData: null
          }
        },
      created() {
          this.iid = this.$route.params.iid

        //2.根据iid请求详细数据
        getDetail(this.iid).then(res => {
          const data = res.result;
          // console.log(data);
          this.topImages = data.itemInfo.topImages


          //3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //4.获取店铺信息
          this.shopInfo = new shop(data.shopInfo)

          //5.保存商品的详情数据
          this.detailGoodsInfo2 = data.detailInfo;
          this.detailGoodsInfo1 = data.itemInfo;
          //6.取出参数的信息
          this.itemParams = data.itemParams

          //7.取出评论信息
          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        })

        //3.请求推荐数据
        getRecommends().then(res => {
          // console.log(res);
          this.recommends = res.data.list
        })

        //4.给getThemeTopYs赋值
        this.getThemeTopYs = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs);
        }, 100)
      },
      methods: {
        imageLoad() {
          this.newRefresh()
          this.getThemeTopYs()
        },
        titleClick(index) {
          // console.log(index);
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
        },
        contentScroll(position) {
          this.showBackTop(position)
          //2.决定tabControl是否吸顶(position: fixed)
          this.isFixed = (-position.y) > this.offsetTop
        },
        addCart() {
          //1.购物车所需要展示的信息
          const product = {}
          product.image = this.topImages[0];
          product.title = this.detailGoodsInfo1.title;
          product.desc = this.detailGoodsInfo1.desc;
          product.price = this.detailGoodsInfo1.oldPrice;
          product.iid = this.iid;

          //2.将商品添加到购物车里面
          // this.$store.commit('addCart', product)
          this.$store.dispatch('addCart', product)
        }
      },
      mounted() {
      },
      updated() {
      },
    destroyed() {
          this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
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
