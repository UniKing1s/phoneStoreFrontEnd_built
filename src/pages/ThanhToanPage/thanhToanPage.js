import React, { useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import productCallApi, { billCallApi } from "../../utils/apiCaller";
import { deleteAllCartPayed } from "../../redux/cartSlice";
// import { delete } from "../../redux/cartSlice";

const ThanhToanPage = () => {
  const accountLoged = useSelector((state) => state.account.logged);
  const accountUserName = useSelector((state) => state.account.username);
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navi = useHistory();
  const totalBill = useRef(0);
  // const [totalBill, setTotalBill] = useState(0);
  const [check, setCheck] = useState(false);
  const [tenNguoiNhan, setName] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //   const [diaChi, setDiaChi] = useState("")
  const [loaiThanhToan, setLoaiThanhTien] = useState("Tiền mặt");
  // const [chiTietHoaDon, setChiTietHoaDon] = useState(carts);
  // useEffect(() => {
  //   return () => {
  //     carts.forEach(
  //       (e) =>
  //         (totalBill.current = Number(totalBill.current) + Number(e.totalPrice))
  //       // setTotalBill(Number(totalBill.current) + Number(e.totalPrice))
  //     );
  //   };
  // });
  if (carts.length > 0) {
    totalBill.current = 0;
    // setTotalBill(0);
    carts.forEach(
      (e) =>
        (totalBill.current = Number(totalBill.current) + Number(e.totalPrice))
      // setTotalBill(Number(totalBill.current) + Number(e.totalPrice))
    );
  }
  const hoanTatThanhToan = async () => {
    if (tenNguoiNhan === "" || tenNguoiNhan === " ") {
      toast.error("Tên người nhận không hợp lệ");
    } else {
      if (diaChi === "" || diaChi === " ") {
        toast.error("Địa chỉ nhận trống");
      } else {
        if (phoneNumber === "" || phoneNumber === " ") {
          toast.error("Số điện thoại không hợp lệ");
        } else {
          setCheck(true);
          const thongTin = {
            username: accountUserName,
            tenNguoiNhan: tenNguoiNhan,
            diaChi: diaChi,
            phoneNumber: phoneNumber,
            tongTien: Number(totalBill.current),
            loaiThanhToan: loaiThanhToan,
            chiTietHoaDon: carts,
          };
          await billCallApi("", "POST", thongTin)
            .then((res) => {
              if (res.status === 200) {
                productCallApi("updatePayed/", "PATCH", { products: carts })
                  .then((res1) => {
                    if (res1.status === 200) {
                      dispatch(deleteAllCartPayed(carts));
                      localStorage.setItem("cart", JSON.stringify(carts));
                      toast.success("Thanh toán thành công");
                      setTimeout(() => {
                        navi.push("/");
                      }, 2000);
                    } else {
                      toast.error("Lỗi thanh toán");
                    }
                  })
                  .catch((err) => {
                    toast.error(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Lỗi không thể thanh toán");
            });
          // console.log(carts);
          // productCallApi("updatePayed/", "PATCH", { products: carts })
          //   .then((res) => {
          //     if (res.status === 200) {
          //       dispatch(deleteAllCartPayed(carts));
          //       localStorage.setItem("cart", JSON.stringify(carts));
          //       toast.success("Thanh toán thành công");
          //       setTimeout(() => {
          //         navi.push("/");
          //       }, 2000);
          //     } else {
          //       toast.error("Lỗi thanh toán");
          //     }
          //   })
          //   .catch((err) => {
          //     toast.error(err);
          //   });
        }
      }
    }
  };
  if (accountLoged && totalBill.current > 0) {
    return (
      <div>
        <ToastContainer />
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="panel panel-primary">
            <div className="box f-c">
              <div className="panel-heading w-100 border-rounded">
                <div className="w-80 f-c ">
                  <div className="form-floating mb-3 pt-50">
                    <h3
                      className="panel-tittle"
                      style={{ textAlign: "center" }}
                    >
                      Thông tin thanh toán
                    </h3>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      itemID="floatingInput"
                      placeholder="Tên người nhận"
                      id="name"
                      value={tenNguoiNhan}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Tên người nhận</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      itemID="floatingInput"
                      placeholder="Số điện thoại"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Số điện thoại</label>
                  </div>
                  <label className="t-l mb-3 f-r checkText"></label>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      itemID="floatingInput"
                      placeholder="Địa chỉ"
                      id="address"
                      value={diaChi}
                      onChange={(e) => setDiaChi(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Địa chỉ</label>
                  </div>
                  <div className="form-floating mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        // onClick={() => setLoaiThanhTien("Tiền mặt")}
                        checked
                      />
                      <label
                        className="form-check-label f-l"
                        htmlFor="flexRadioDefault1"
                      >
                        Trả tiền mặt khi nhận hàng
                      </label>
                    </div>
                  </div>
                  {/* <div className="form-floating mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onClick={() => setLoaiThanhTien("Qua thẻ")}
                      />
                      <label
                        className="form-check-label f-l"
                        htmlFor="flexRadioDefault2"
                      >
                        Thanh toán qua thẻ
                      </label>
                    </div>
                  </div> */}
                  <div className="form-floating mb-3">
                    {check ? (
                      <button
                        type="button"
                        className="btn btn-secondary
                         w-100"
                        id="login"
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        id="login"
                        onClick={() => hoanTatThanhToan()}
                      >
                        <strong>
                          Hoàn tất thanh toán{" "}
                          {new Intl.NumberFormat("vi", {
                            currency: "VND",
                            style: "currency",
                          }).format(totalBill.current)}
                        </strong>
                      </button>
                    )}
                    {/*<div className="form-floating mb-3 f-r">
                    <a href="/forgetPass">Quên mật khẩu</a>
                  </div>*/}
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navi.push("/login");
  }
};

export default ThanhToanPage;
