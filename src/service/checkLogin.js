import { useSelector } from "react-redux";
// import React from "react";

const CheckLogin = () => {
  return useSelector((state) => state.account.logged);
  // return true if logged false if not
};

export default CheckLogin;
