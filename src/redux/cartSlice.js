import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  reducers: {
    updateCart: (state, action) => {
      const index = state.findIndex(
        (element) => element.masp === action.payload.masp
      );
      if (index >= 0) {
        state[index].quantity = state[index].quantity + action.payload.quantity;
        state[index].totalPrice =
          state[index].totalPrice + action.payload.totalPrice;
      } else {
        state.push(action.payload);
      }
      return;
      //   state.push(action.payload);
    },
    updateArrayCart: (state, action) => {
      // state = [];
      if (state.length < 1) {
        action.payload.forEach((value) => state.push(value));
      }
      // state = action.payload.map((x) => x);
      //   state.push(action.payload);
      return;
    },
    deleteCart: (state, action) => {
      const index = state.findIndex(
        (element) => element.masp === action.payload.masp
      );
      // state = state.filter((element) => element.masp !== action.payload.masp);
      // console.log(index);
      if (index >= 0) {
        state.splice(index, 1);
      }
    },
    deleteAllCartPayed: (state) => {
      let index = [];
      // let item = state.filter((element) => Number(element.quantity) > 0);
      for (let i of state.filter((element) => Number(element.quantity) > 0)) {
        // index.push();
        state.splice(
          state.findIndex((element) => element.masp === i.masp),
          1
        );
      }
      // for (let k of index) {
      //   if (k >= 0) {
      //   }
      // }
      //   const index = state.findIndex(
      //     (element) => Number(element.masp) === Number(action.payload.masp)
      //   );
      //   state[index].price = Number(action.payload.price);
      //   state[index].sale = Number(action.payload.sale);
      //   state[index].totalPrice =
      //     ((Number(action.payload.price) * (100 - Number(action.payload.sale))) /
      //       100) *
      //     Number(action.payload.quantity);
      // },
    },
    fixPriceAndSale: (state, action) => {
      const index = state.findIndex(
        (element) => element.masp === action.payload.masp
      );
      state[index].price = action.payload.price;
      state[index].sale = action.payload.sale;
      state[index].img = action.payload.img;
      state[index].totalPrice =
        ((state[index].price * (100 - state[index].sale)) / 100) *
        state[index].quantity;
      // for (let i of state) {
      //   if (i.masp === action.payload.masp) {
      //     i.price = action.payload.price;
      //     i.sale = action.payload.sale;
      //     i.img = action.payload.img;
      //     i.totalPrice = ((i.price * (100 - i.sale)) / 100) * i.quantity;
      //   }
      // }
    },
  },
});
export const {
  updateCart,
  updateArrayCart,
  deleteCart,
  deleteAllCartPayed,
  fixPriceAndSale,
} = cartSlice.actions;
export default cartSlice.reducer;
