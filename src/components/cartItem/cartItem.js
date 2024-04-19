import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { imgAPI_URL } from "../../constants/Config";
// import { NavLink } from "react-router-dom";
const CartItem = (props) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(useSelector((state) => state.cart))
  );
  // const carts = useSelector((state) => state.cart);
  const { cartItem } = props;
  // const ditpatch = useDispatch();
  const deleteItem = () => {
    if (window.confirm("Bạn chắc chắc muốn xóa không ?")) {
      const cart = {
        masp: cartItem.masp,
      };
      props.onDelete(cart);
    }
  };
  // useEffect(() => {

  // });
  const increaseQuantity = () => {
    const cart = {
      masp: cartItem.masp,
      quantity: 1,
      totalPrice: Number(cartItem.price * (1 - cartItem.sale / 100)),
    };
    props.increaseQuantity(cart);
    // cartItem.quantity = Number(cartItem.quantity) + 1;
  };
  const decreaseQuantity = () => {
    if (cartItem.quantity >= 1) {
      const cart = {
        masp: cartItem.masp,
        quantity: -1,
        totalPrice: -Number(cartItem.price * (1 - cartItem.sale / 100)),
      };
      props.decreaseQuantity(cart);
    } else {
      deleteItem();
    }

    // cartItem.quantity = Number(cartItem.quantity) - 1;
  };
  return (
    <>
      <ToastContainer />
      <tr>
        <td>{cartItem.name}</td>
        <td>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <img
              src={imgAPI_URL + cartItem.img}
              className="object-fit-contain border rounded"
              loading="lazy"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                display: "block",
                height: "100px",
                width: "100px",
                margin: "0 auto",
                borderRadius: "10px",
              }}
              object-fit="cover"
              alt="..."
            ></img>
          </div>
        </td>
        <td>
          <strong>
            {new Intl.NumberFormat("vi", {
              currency: "VND",
              style: "currency",
            }).format(cartItem.price)}
          </strong>
        </td>
        <td>{cartItem.sale}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary position-relative mr-10"
            onClick={() => decreaseQuantity()}
          >
            -
          </button>
          <button
            type="button"
            className="btn btn-primary position-relative mr-10"
          >
            {cartItem.quantity}
          </button>
          <button
            type="button"
            className="btn btn-primary position-relative mr-10"
            onClick={() => increaseQuantity()}
          >
            +
          </button>
        </td>
        <td>
          <strong>
            {new Intl.NumberFormat("vi", {
              currency: "VND",
              style: "currency",
            }).format(cartItem.totalPrice)}
          </strong>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger mr-10"
            onClick={() => deleteItem()}
          >
            X
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
