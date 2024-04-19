import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountsCallApi } from "../../../utils/apiCaller";
import { NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
const EditUserPage = () => {
  const location = useLocation();
  const account = useSelector((state) => state.account);
  const navi = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({});
  const loading = useRef(true);

  useEffect(() => {
    if (loading.current) {
      const getData = async () => {
        await accountsCallApi(`/getByUsser/${user}`, "GET", null)
          .then((res) => {
            if (res.status === 200) {
              setData(res.data.account);
              loading.current = false;
            }
          })
          .catch((err) => {
            toast.warning("Không có thông tin người dùng tương ứng");
            loading.current = false;
          });
      };
      getData();
    }
  });
  const onSave = async () => {
    const thisUser = {
      username: data.username,
      password: data.password,
    };
    if (data.username !== "" || data.username.replaceAll(" ", "") !== "") {
      if (data.username.length > 5) {
        if (data.password !== "" || data.password.replaceAll(" ", "") !== "") {
          if (data.password.length > 5) {
            accountsCallApi("update/", "post", {
              username: data.username,
              password: data.password,
            })
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Thay đổi mật khẩu thành công");
                } else {
                  toast.error("Thay đổi mật khẩu thất bại");
                }
              })
              .catch((err) => {
                toast.error("Thay đổi mật khẩu thất bại");
              });
          } else {
            toast.warning("Mật khẩu phải nhiều hơn 5 ký tự!");
          }
        } else {
          toast.error("Mật khẩu chưa nhập");
        }
      } else {
        toast.warning("Tên người phải nhiều hơn 5 ký tự!");
      }
    } else {
      toast.warning("Tên người dùng trống!");
    }
  };
  if (account.logged && account.role === 0) {
    return (
      <>
        <ToastContainer />
        <div className="container">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-tittle" style={{ textAlign: "center" }}>
                Sửa thông tin tài khoản
              </h3>
            </div>
            <div className="panel-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  itemID="floatingInput"
                  placeholder="Tên người dùng"
                  name="name"
                  value={data.username}
                  onChange={(e) =>
                    setData(
                      Object.assign({}, data, { username: e.target.value })
                    )
                  }
                />
                <label htmlFor="floatingInput">Tên người dùng</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  itemID="floatingInput"
                  placeholder="Mật khẩu"
                  name="password"
                  value={data.password}
                  onChange={(e) =>
                    setData(
                      Object.assign({}, data, { password: e.target.value })
                    )
                  }
                />
                <label htmlFor="floatingInput">Mật khẩu</label>
              </div>
              <div className="form-floating mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={showPass}
                    onChange={() => setShowPass(!showPass)}
                    itemID="showPass"
                  />
                  <label className="form-check-label f-l" htmlFor="showPass">
                    Hiển thị mật khẩu
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-floating mb-3">
          <button
            type="button"
            className="btn btn-success mr-10"
            onClick={() => onSave()}
          >
            Lưu
          </button>
          <NavLink type="button" className="btn btn-danger" to="/userManager">
            Hủy
          </NavLink>
        </div>
      </>
    );
  } else {
    navi.push("/");
  }
};

export default EditUserPage;
