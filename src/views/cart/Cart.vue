<template>
  <div id="cart">
    <nav-bar class="cart_nav_bar">

        <div slot="center">购物车({{cartLength}})</div>

    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar.vue";
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart_nav_bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>
