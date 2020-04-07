<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">

    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components:{
      Scroll
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>

</style>
