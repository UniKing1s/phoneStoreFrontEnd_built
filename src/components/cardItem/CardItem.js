import React, { useState } from "react";
import "./CardItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/cartSlice";
import { NavLink } from "react-router-dom";
import { imgAPI_URL } from "../../constants/Config";

const CardItem = (props) => {
  // console.log(props);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { product } = props;
  // const { account } = props;
  // const [follow, setFollow] = useState(false);
  localStorage.setItem(
    "cart",
    JSON.stringify(useSelector((state) => state.cart))
  );
  const onDelete = (id, img) => {
    if (window.confirm("Bạn chắc chắc muốn xóa không ?")) {
      console.log(id);
      props.onDelete(id, img);
    }
  };
  const addToCart = () => {
    const cart = {
      masp: product.masp,
      name: product.name,
      price: product.price,
      sale: product.sale,
      img: product.img,
      quantity: 1,
      totalPrice: Number(product.price) * (1 - product.sale / 100),
    };
    dispatch(updateCart(cart));
    props.toastMess(
      "success",
      "Đã thêm sản phẩm " + product.name + " vào giỏ hàng"
    );
  };

  // const changeFollow = () => {
  //   setFollow(!follow);
  // };

  if (product.status === "còn hàng" && product.quantity > 0) {
    return (
      // <div
      //   className="col-lg-3 col-md-6 col-sm-6 "
      //   id="CardDiv"
      //   style={{ height: "50%" }}
      // >
      //   <div className="card my-2 shadow-0" style={{ height: "100%" }}>
      //     <NavLink
      //       to={"/product/" + product._id}
      //       style={{ height: "175px", with: "350px" }}
      //       className=""
      //     >
      //       <div className="mask" style={{ height: "25px" }}>
      //         {/* <div className="d-flex justify-content-start align-items-start h-100 m-2">
      //           <h6>
      //             <span className="badge bg-danger pt-1">New</span>
      //           </h6>
      //         </div> */}
      //         {product.sale > 0 ? (
      //           <>
      //             <div className="d-flex justify-content-start align-items-start h-100 m-2">
      //               <h6>
      //                 <span className="badge bg-danger pt-1">
      //                   Sale {product.sale}%
      //                 </span>
      //               </h6>
      //             </div>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //       </div>

      //       <img
      //         src={imgAPI_URL + product.img}
      //         className="card-img-top rounded-2 img-card"
      //         style={{
      //           width: "50%",
      //           maxHeight: "175px",
      //           // height: "100%",
      //           maxWidth: "350px",
      //           // maxWidth: "100vw",
      //           margin: "0 auto",
      //           objectFit: "cover",
      //         }}
      //         //style="aspect-ratio: 1 / 1"
      //         alt=""
      //       />
      //     </NavLink>

      //     <div className="card-body p-0 pt-3" style={{ height: "250px" }}>
      //       <h5 className="card-title" style={{ height: "50px" }}>
      //         {product.name}
      //       </h5>
      //       {/* <p className="card-text mb-0">Python cơ bản</p> */}
      //       <p
      //         className="text-muted"
      //         style={{
      //           height: "60px",
      //         }}
      //       >
      //         {product.sale > 0 ? (
      //           <>
      //             <strong style={{ color: "red" }}>
      //               <del>
      //                 {new Intl.NumberFormat("vi", {
      //                   currency: "VND",
      //                   style: "currency",
      //                 }).format(product.price)}
      //               </del>
      //             </strong>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //         <br></br>
      //         {product.sale > 0 ? (
      //           <>
      //             <strong>
      //               {new Intl.NumberFormat("vi", {
      //                 currency: "VND",
      //                 style: "currency",
      //               }).format(product.price * (1 - product.sale / 100))}
      //             </strong>
      //           </>
      //         ) : (
      //           <>
      //             <strong>
      //               {new Intl.NumberFormat("vi", {
      //                 currency: "VND",
      //                 style: "currency",
      //               }).format(product.price)}
      //             </strong>
      //           </>
      //         )}
      //       </p>

      //       <button
      //         type="button"
      //         className="btn btn-primary mb-3 mr-10 "
      //         onClick={() => addToCart()}
      //       >
      //         Thêm vào giỏ hàng
      //       </button>
      //       {account.role === 0 ? (
      //         <>
      //           <NavLink
      //             type="button"
      //             className="btn btn-success mb-3 mr-10"
      //             to={"updateProduct/" + product._id}
      //           >
      //             Sửa
      //           </NavLink>
      //           <button
      //             type="button"
      //             className="btn btn-danger mb-3"
      //             onClick={() => onDelete(product.masp, product.img)}
      //           >
      //             Xóa
      //           </button>
      //         </>
      //       ) : (
      //         <></>
      //       )}
      //     </div>
      //   </div>
      // </div>

      <div
        className="col-lg-3 col-md-6 col-sm-6"
        // className={
        //   key === 0
        //     ? "col-lg-3 col-md-6 col-sm-6 carousel-item active"
        //     : "col-lg-3 col-md-6 col-sm-6 carousel-item"
        // }
        // carousel-item active
        // id="CardDiv"
        style={{ height: "50%" }}
      >
        <div className="card my-2 shadow-0" style={{ height: "100%" }}>
          <NavLink
            to={"/product/" + product._id}
            style={{ height: "250px", with: "350px" }}
            className=""
          >
            <div className="mask" style={{ height: "25px" }}>
              {/* <div className="d-flex justify-content-start align-items-start h-100 m-2">
                <h6>
                  <span className="badge bg-danger pt-1">New</span>
                </h6>
              </div> */}
              {product.sale > 0 ? (
                <>
                  <div className="d-flex justify-content-start align-items-start h-100 m-2">
                    <h6>
                      <span className="badge bg-danger pt-1">
                        Sale {product.sale}%
                      </span>
                    </h6>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <img
              src={imgAPI_URL + product.img}
              loading="lazy"
              className="card-img-top rounded-2 img-card"
              style={{
                width: "50%",
                maxHeight: "225px",
                // height: "100%",
                maxWidth: "350px",
                // maxWidth: "100vw",
                margin: "0 auto",
                objectFit: "cover",
              }}
              //style="aspect-ratio: 1 / 1"
              alt=""
            />
          </NavLink>

          <div className="card-body p-0 pt-3" style={{ height: "250px" }}>
            <h5 className="card-title" style={{ height: "50px" }}>
              {product.name}
            </h5>
            {/* <p className="card-text mb-0">Python cơ bản</p> */}
            <p
              className="text-muted"
              style={{
                height: "60px",
              }}
            >
              {product.sale > 0 ? (
                <>
                  <strong style={{ color: "red" }}>
                    <del>
                      {new Intl.NumberFormat("vi", {
                        currency: "VND",
                        style: "currency",
                      }).format(product.price)}
                    </del>
                  </strong>
                </>
              ) : (
                <></>
              )}
              <br></br>
              {product.sale > 0 ? (
                <>
                  <strong>
                    {new Intl.NumberFormat("vi", {
                      currency: "VND",
                      style: "currency",
                    }).format(product.price * (1 - product.sale / 100))}
                  </strong>
                </>
              ) : (
                <>
                  <strong>
                    {new Intl.NumberFormat("vi", {
                      currency: "VND",
                      style: "currency",
                    }).format(product.price)}
                  </strong>
                </>
              )}
            </p>

            <button
              type="button"
              className="btn btn-primary mb-3 mr-10 "
              onClick={() => addToCart()}
            >
              Thêm vào giỏ hàng
            </button>
            {account.role === 0 ? (
              <>
                <NavLink
                  type="button"
                  className="btn btn-success mb-3 mr-10"
                  to={"updateProduct/" + product._id}
                >
                  Sửa
                </NavLink>
                <button
                  type="button"
                  className="btn btn-danger mb-3"
                  onClick={() => onDelete(product.masp, product.img)}
                >
                  Xóa
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default CardItem;
