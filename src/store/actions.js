import { ADD_COUNTER, ADD_TO_CART } from "./mutations_type";


export default {
  addCart(context, payload) {
    //查询之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if(oldProduct){
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
    }

  }
}
