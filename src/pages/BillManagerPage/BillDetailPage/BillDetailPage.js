import React, { useEffect, useState } from "react";
// import "./LoginPage.scss";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { billCallApi } from "../../../utils/apiCaller";
const BillDetailPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mahoadon = searchParams.get("mahoadon");
  const user = searchParams.get("user");
  const navi = useHistory();
  const [bill, setBill] = useState({});
  const account = useSelector((state) => state.account);
  const [loading, setLoading] = useState(true);
  const showBillBody = () => {
    var result = null;
    // console.log(users);
    if (bill.chiTietHoaDon) {
      if (bill.chiTietHoaDon.length > 0) {
        result = bill.chiTietHoaDon.map((billItem, index) => {
          return (
            <>
              <tr>
                <td>{billItem.name}</td>
                <td>{billItem.price}</td>
                <td>{billItem.sale}</td>
                <td>{billItem.quantity}</td>
                <td>
                  {new Intl.NumberFormat("vi", {
                    currency: "VND",
                    style: "currency",
                  }).format(billItem.totalPrice)}
                </td>
              </tr>
            </>
          );
        });
      }
    }
    return result;
  };
  //   const dispatch = useDispatch();
  const loadBill = () => {
    if (loading) {
      billCallApi(
        `getBillByUserAndMaHD?username=${user}&maHoaDon=${mahoadon}`,
        "GET",
        null
      )
        .then((res) => {
          if (res.status === 200) {
            setBill(res.data);
            setLoading(false);
          } else {
            toast.error("Không có hóa đơn tương ứng");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error("Không có hóa đơn tương ứng");
          setLoading(false);
        });
    }
  };
  loadBill();
  // useEffect(() => {

  // });

  if (
    (user === account.username && account.role !== 0 && account.logged) ||
    (account.role === 0 && account.logged)
  ) {
    return (
      <div>
        <ToastContainer />
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="panel panel-primary">
            <div className="f-c" style={{ width: "60%" }}>
              <div
                className="panel-heading w-100 border-rounded"
                style={{ display: "inline-block", height: "auto" }}
              >
                <div
                  className="w-80 form-control"
                  style={{ display: "inline-block", height: "auto" }}
                >
                  <div className="form-floating mb-3 pt-50">
                    <h3
                      className="panel-tittle"
                      style={{ textAlign: "center" }}
                    >
                      Chi Tiết Hóa Đơn Mã {mahoadon}
                    </h3>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      <strong>Người Dùng:</strong> {bill.username}
                    </label>
                  </div>
                  <div className="form-floating pt-50 ">
                    <label className="form-check-label f-l form-control">
                      <strong>Người Nhận:</strong> {bill.tenNguoiNhan}
                    </label>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      <strong>Số Điện Thoại:</strong> {bill.phoneNumber}
                    </label>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      <strong>Địa chỉ:</strong> {bill.diaChi}
                    </label>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      <strong>Loại thanh toán:</strong> {bill.loaiThanhToan}
                    </label>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      <strong>Ngày tạo hóa đơn:</strong>
                    </label>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      {bill.ngayHoaDon
                        ? bill.ngayHoaDon.toLocaleString()
                        : bill.ngayHoaDon}
                    </label>
                  </div>
                  <div className="form-floating pt-50">
                    <label className="form-check-label f-l form-control">
                      <strong>Tình trạng:</strong>{" "}
                      {bill.tinhtrang ? "Đã thanh toán" : "Chưa thanh toán"}
                    </label>
                  </div>
                  <div className="form-floating pt-50 mb-3">
                    <label className="form-check-label f-l form-control">
                      <strong>Tổng thành tiền: </strong>
                      {new Intl.NumberFormat("vi", {
                        currency: "VND",
                        style: "currency",
                      }).format(bill.tongTien)}
                    </label>
                  </div>
                  {/* <div className="col"> */}
                  {/* <div className="panel panel-primary"> */}
                  {/* <div className="panel-body"> */}
                  <div
                    className="form-floating mb-3 table-responsive form-control"
                    style={{ display: "inline-block", height: "auto" }}
                  >
                    <table
                      className="table table-primary "
                      style={{
                        // display: "inline-block",
                        display: "table-cell",
                        textAlign: "center",
                        height: "auto",
                        width: "100%",
                        margin: "auto",
                      }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col">Giá Gốc</th>
                          <th scope="col">Giảm giá</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>{showBillBody()}</tbody>
                    </table>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navi.push("/");
  }
};

export default BillDetailPage;
