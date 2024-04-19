import React, { useState } from "react";
import { useSelector } from "react-redux";
const SaveCartItem = () => {
  const [load, setLoad] = useState(true);
  const carts = useSelector((state) => state.cart);
  if (load) {
    setLoad(false);
  } else {
    localStorage.setItem("cart", JSON.stringify(carts));
  }
  return <></>;
};

export default SaveCartItem;
