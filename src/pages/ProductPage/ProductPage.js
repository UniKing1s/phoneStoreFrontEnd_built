import React, { useEffect, useRef, useState } from "react";
import productCallApi from "../../utils/apiCaller";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import AddProductToCart from "../../service/addProductToCart";
import { updateCart } from "../../redux/cartSlice";
import SaveCartItem from "../../service/SaveCartItem";
import { imgAPI_URL } from "../../constants/Config";
import "./ProductPage.scss";
// import ButtonAddToCart from "../../components/buttonAddToCart/buttonAddToCart";

const ProductPage = (props) => {
  const param = useParams();
  const product = useRef({});
  const loaded = useRef(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const getProductById = (id) => {
    console.log(loading);
    const productId = { _id: id };
    productCallApi("byId/", "put", productId)
      .then((res) => {
        product.current = res.data;
        loaded.current = true;
        console.log(product);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Không có sản phẩm tương ứng");
      });
  };
  const addToCart = () => {
    if (Number(quantity) > 0 && Number(quantity) <= product.current.quantity) {
      const cart = {
        masp: product.current.masp,
        name: product.current.name,
        price: product.current.price,
        sale: product.current.sale,
        img: product.current.img,
        quantity: Number(quantity),
        totalPrice:
          Number(quantity) *
          Number(product.current.price) *
          (1 - product.current.sale / 100),
      };
      dispatch(updateCart(cart));
      toast.success("Thêm vào giỏ hàng thành công");
    } else if (Number(quantity) > Number(product.current.quantity)) {
      toast.warning("Số lượng tồn kho hiện không đủ!");
    } else {
      toast.warning("Số lượng sản phẩm cần thêm phải lớn hơn 0!");
    }
  };
  useEffect(() => {
    getProductById(param.id);
  });
  const handleDecribtion = () => {
    const lst = product.current.decribtion.split("\n");
    var result = [];
    for (let line of lst) {
      const lineLst = line.split(":");
      result.push(handleLabel(lineLst));
    }
    // console.log(result);
    return result;
  };
  const handleLabel = (lineLst) => {
    return (
      <>
        <label style={{ fontSize: "15px" }}>
          <strong style={{ fontWeight: "bold" }}>{lineLst[0]}</strong>:{" "}
          {lineLst[1]}
        </label>
        <br></br>
      </>
    );
  };
  return (
    <div key={props.index}>
      <ToastContainer />
      <SaveCartItem />
      {loaded.current ? (
        <>
          <div>
            <section className="py-5">
              <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                  <div
                    className="col-md-6"
                    // style={{ border: "solid", borderRadius: "10px" }}
                  >
                    <img
                      className="card-img-top mb-5 mb-md-0"
                      src={imgAPI_URL + product.current.img}
                      style={{ margin: "0 auto" }}
                      // src={product.current.img}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    {/* <div className="small mb-1">SKU: BST-498</div> */}
                    <h1 className="display-5 fw-bolder">
                      {product.current.name}
                    </h1>
                    <div className="fs-5 mb-5">
                      {/* <span className="text-decoration-line-through">$45.00</span> */}
                      <span>
                        Giá:{" "}
                        {product.current.sale > 0 ? (
                          <>
                            <strong style={{ color: "red" }}>
                              <del>
                                {new Intl.NumberFormat("vi", {
                                  currency: "VND",
                                  style: "currency",
                                }).format(product.current.price)}
                              </del>
                            </strong>
                          </>
                        ) : (
                          <></>
                        )}
                        <br></br>
                        {product.current.sale > 0 ? (
                          <>
                            <strong>
                              {new Intl.NumberFormat("vi", {
                                currency: "VND",
                                style: "currency",
                              }).format(
                                product.current.price *
                                  (1 - product.current.sale / 100)
                              )}
                            </strong>
                          </>
                        ) : (
                          <>
                            <strong>
                              {new Intl.NumberFormat("vi", {
                                currency: "VND",
                                style: "currency",
                              }).format(product.current.price)}
                            </strong>
                          </>
                        )}
                      </span>
                    </div>
                    <div
                      className="fs-6 mr-5"
                      style={{ fontWeight: "bold", float: "left" }}
                    >
                      Tồn kho: {product.current.quantity}
                    </div>
                    <br></br>
                    <div
                      className="fs-5"
                      style={{ fontWeight: "bold", float: "left" }}
                    >
                      Mô tả:
                    </div>
                    <br></br>
                    <br></br>
                    <label
                      className="lead form-control mb-3"
                      style={{ textAlign: "left", backgroundColor: "#C0C0C0" }}
                    >
                      {/* {product.current.decribtion} */}
                      {handleDecribtion()}
                      {/* {decribtion.current} */}
                    </label>
                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <input
                        className="form-control text-center me-3"
                        id="inputQuantity"
                        type="number"
                        value={quantity}
                        min={1}
                        style={{ width: "5rem" }}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button
                        className="btn btn-primary flex-shrink-0"
                        type="button"
                        onClick={() => addToCart()}
                      >
                        <i className="bi-cart-fill me-1"></i>
                        Thêm vào giỏ hàng
                      </button>
                      {/* <ButtonAddToCart addToCart={addToCart} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>No Product matching</>
      )}
    </div>
  );
};

export default ProductPage;
