import React from "react";
import { useSelector } from "react-redux";
const ButtonAddToCart = (props) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(useSelector((state) => state.cart))
  );
  console.log("updateStore");
  const addToCart = () => {
    props.addToCart();
  };
  return (
    <button
      className="btn btn-outline-dark flex-shrink-0"
      type="button"
      onClick={() => addToCart()}
    >
      <i className="bi-cart-fill me-1"></i>
      Thêm vào giỏ hàng
    </button>
  );
};

export default ButtonAddToCart;
