import React, { useState } from "react";
import "./LoginPage.scss";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { accountsCallApi } from "../../utils/apiCaller";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../redux/accountSlice";

const LoginPage = () => {
  // const login = () => {
  //   toast.success("Đăng nhập thành công");
  // };
  const [showPass, setShowPass] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inLogin, setInLogin] = useState(false);
  const navi = useHistory();
  const logged = useSelector((state) => state.account.logged);

  const dispatch = useDispatch();
  // const logged = useSelector((state) => state.account.logged);
  const loginSubmit = () => {
    setInLogin(true);
    if (username === "") {
      toast.error("Tên tài khoản chưa nhập");
    }
    if (password === "") {
      toast.error("Mật khẩu chưa nhập");
    }
    if (username !== "" && password !== "") {
      accountsCallApi("login/", "post", {
        username: username,
        password: password,
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Đăng nhập thành công");
            const account = {
              username: username,
              logged: true,
              role: res.data.role,
            };
            dispatch(updateAccount(account));
            localStorage.setItem("_token", JSON.stringify(account));
            //
            navi.push("/");
          } else {
          }
        })
        .catch((err) => {
          accountsCallApi("getByUsser/", "post", {
            username: username,
          })
            .then((res) => {
              if (res.status === 200) {
                toast.error("Sai thông tin mật khẩu");
              }
            })
            .catch((err) => {
              toast.error("Không tìm thấy tài khoản đăng nhập");
            });
          // toast.error("Không tìm thấy tài khoản đăng nhập");
        });
    }
    setTimeout(() => {
      setInLogin(false);
    }, 2000);
  };
  if (!logged) {
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
                      Đăng Nhập
                    </h3>
                  </div>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        itemID="floatingInput"
                        placeholder="Tài khoản"
                        id="userName"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Tài khoản</label>
                    </div>
                    <label className="t-l mb-3 f-r checkText"></label>
                    <div className="form-floating mb-3">
                      <input
                        type={showPass ? "text" : "password"}
                        className="form-control"
                        itemID="floatingInput"
                        placeholder="Mật khẩu"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                          id="showPass"
                        />
                        <label
                          className="form-check-label f-l"
                          htmlFor="showPass"
                        >
                          Hiển thị mật khẩu
                        </label>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      {inLogin ? (
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
                          onClick={() => loginSubmit()}
                        >
                          Đăng nhập
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="form-floating mb-3">
                    <NavLink
                      to="/register"
                      // type="button"
                      className="btn btn-primary w-50 f-l"
                      // onClick={() => register()}
                    >
                      Đăng Ký
                    </NavLink>
                  </div>
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
    );
  } else {
    navi.push("/");
  }
};

export default LoginPage;
