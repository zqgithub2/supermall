<template>

</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartListItem",
    props:{
      itemInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components: {
      CheckButton
    }
  }
</script>

<style scoped>
  #shop-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid  #ccc;
  }

  .item-slector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
 .item-title,item-desc{
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
 }
</style>
