import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import cartReducer from "./cartSlice";
export default configureStore({
  reducer: {
    account: accountReducer,
    cart: cartReducer,
  },
});
