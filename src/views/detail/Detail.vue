<template>
    <div id="detail">
        <detail-nav-bar class="detail-bar" @titleClick="titleClick" ref="nav"/>
        <Scroll class="content" ref="scroll" :probe-type="3" @scroll="ContentScroll">
          <detail-swiper :topImages="topImages"/>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop-info="shopInfo"/>
          <detail-goods-info :DetailGoodsInfo="detailGoodsInfo" @imageLoad="imageLoad"/>
          <detail-params-info ref="params" :item-params="itemParams"/>
          <detail-comment-info ref="comment" :comment-info="commentInfo"/>
          <goods-list ref="recommend" :goods="recommends"></goods-list>
        </Scroll>
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

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, Goods, shop, getRecommends} from "@/network/detail";
  import {itemListenerMixin} from "@/common/mixin";
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
      GoodsList
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailGoodsInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.params.iid

      //2.根据iid请求详细数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages


        //3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //4.获取店铺信息
        this.shopInfo = new shop(data.shopInfo)

        //5.保存商品的详情数据
        this.detailGoodsInfo = data.detailInfo;

        //6.取出参数的信息
        this.itemParams = data.itemParams

        //7.取出评论信息
        if (data.rate.cRate !== 0) {
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
        console.log(this.themeTopYs);
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
      ContentScroll(position) {
        //1.获取Y值
        const positionY = -position.y

        let length = this.themeTopYs.length
        //2.positionY与主题中的值进行比较
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && (positionY >= this.themeTopYs[i])))) {
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      }
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
