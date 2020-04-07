import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      console.log('监听itemImageLoad');
      refresh()
    }
    //3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('混入中的内容');
  }
}


/**
 * 回到顶部mixin封装
 */
import BackTop from "components/content/backTop/BackTop.vue";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
