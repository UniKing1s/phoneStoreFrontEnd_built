import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import CartItem from "../../components/cartItem/cartItem";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { deleteCart, fixPriceAndSale, updateCart } from "../../redux/cartSlice";
import { useHistory } from "react-router-dom";
import productCallApi from "../../utils/apiCaller";

const CartPage = () => {
  const carts = useSelector((state) => state.cart);
  const accountLoged = useSelector((state) => state.account.logged);
  const totalBill = useRef(0);
  const navi = useHistory();
  const dispatch = useDispatch();
  for (let i of carts) {
    productCallApi(`byMaSp/${i.masp}`, "GET", null)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data;
          // console.log(item);
          // console.log(res.data.sale);
          // console.log(res.data.price);
          if (
            Number(i.price) !== Number(res.data.price) ||
            Number(i.sale) !== Number(res.data.sale)
          ) {
            // console.log(res.data);
            dispatch(fixPriceAndSale(item));
            localStorage.setItem("cart", JSON.stringify(carts));
          }
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }
  localStorage.setItem("cart", JSON.stringify(carts));
  carts.forEach(
    (e) =>
      (totalBill.current = Number(totalBill.current) + Number(e.totalPrice))
  );
  // useEffect(() => {
  //   return () => {

  //     // i.masp
  //   };
  //   // totalBill.current = 0;
  // });
  if (carts.length > 0) {
    totalBill.current = 0;
    carts.forEach(
      (e) =>
        (totalBill.current = Number(totalBill.current) + Number(e.totalPrice))
    );
  }
  // console.log(carts);
  localStorage.setItem(
    "cart",
    JSON.stringify(useSelector((state) => state.cart))
  );
  const submitDatHang = () => {
    if (totalBill.current > 0) {
      if (accountLoged) {
        navi.push("/thanhToan");
      } else {
        navi.push("/login");
      }
    } else {
      toast.warning("Bạn hiện tại không có sản phẩm để thanh toán");
    }
  };
  const ditpatch = useDispatch();
  const onDelete = (cart) => {
    ditpatch(deleteCart(cart));
    // setLocalItem();
  };
  const increaseQuantity = (carts) => {
    ditpatch(updateCart(carts));
  };
  const decreaseQuantity = (carts) => {
    ditpatch(updateCart(carts));
  };

  const showProductItem = () => {
    var result = null;
    if (carts.length > 0) {
      result = carts.map((cartItem, index) => {
        return (
          <CartItem
            key={index}
            cartItem={cartItem}
            index={index}
            onDelete={onDelete}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            // updateQuantity={updateQuantity}
          />
        );
      });
    }
    return result;
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center align-items-center g-2">
        <div className="col">
          <NavLink
            to="/"
            className="btn btn-primary mt-10 m-a"
            //type="button"
            //value="Thêm sản phẩm"
          >
            Thêm sản phẩm
          </NavLink>
          <div className="panel panel-primary li-box">
            <div className="panel-heading">
              <h3 className="panel-tittle">Giỏ hàng</h3>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">Tên</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Giảm giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tổng giá</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{showProductItem()}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <button
              className="btn btn-primary mt-10 m-a"
              style={{ textAlign: "center", width: "100%" }}
              onClick={() => submitDatHang()}
            >
              <strong>
                Đặt hàng{" "}
                {new Intl.NumberFormat("vi", {
                  currency: "VND",
                  style: "currency",
                }).format(totalBill.current)}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
