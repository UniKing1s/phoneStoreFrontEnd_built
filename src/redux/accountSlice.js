import { createSlice } from "@reduxjs/toolkit";
export const accountSlice = createSlice({
  name: "account",
  initialState: JSON.parse(localStorage.getItem("_token"))
    ? JSON.parse(localStorage.getItem("_token"))
    : {
        username: "",
        logged: false,
        role: 1,
      },
  reducers: {
    updateAccount: (state, action) => {
      state.username = action.payload.username;
      state.logged = action.payload.logged;
      state.role = action.payload.role;
    },
  },
});
export const { updateAccount } = accountSlice.actions;
export default accountSlice.reducer;
