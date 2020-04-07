<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <detail-comment :comment="comment" ref="comment"/>
      <!--推荐-->
      <goods-list :goods="recommends" ref="recommend"/>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>

</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailComment from './childComps/DetailComment.vue'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from "./childComps/DetailBottomBar.vue";

  import {itemListenerMixin, backTopMixin} from 'common/mixin';

  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      GoodsList,
      DetailBottomBar
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        comment: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.params.iid
      console.log('iid:' + this.$route.params.iid);

      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        console.log("this.topImages:" + this.topImages.length);
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评论
        if (data.rate.cRate != 0) {
          this.comment = data.rate.list[0];
        }

        //推荐
        getRecommend().then(res => {
          this.recommends = res.data.list
        })

      })
    },
    mounted() {
    },
    destroyed() {
      //取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log('this.themeTopYs:' + this.themeTopYs);
      },
      titleClick(index) {
        console.log('this.themeTopYs[index]:' + this.themeTopYs[index]);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {

        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000


        const positionY = -position.y
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
            || (i == length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
            console.log("position=" + -position.y);
          }
        }
      },
      addToCart() {
        //获取购物车所需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.detailInfo.title
        product.desc = this.detailInfo.desc
        product.price = this.detailInfo.realPrice
        product.iid = this.iid
        //将商品添加到购物车
        this.$store.dispatch('addCart', product)
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
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
