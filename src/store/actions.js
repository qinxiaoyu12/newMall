import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context, payload) {
    let oldProduct = null;
    for (let item of context.state.cartList) {
      if(item.iid === payload.iid) {
        console.log(payload.iid);
        // console.log(item.iid);
        oldProduct = item
      }
    }
    // let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct)
      console.log('===');
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
      console.log('---');
    }
  }
}
