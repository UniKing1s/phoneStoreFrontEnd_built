import React, { useState } from "react";
import "./RegisterPage.scss";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import CheckLogin from "../../service/checkLogin";
import { accountsCallApi } from "../../utils/apiCaller";
const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navi = useHistory();
  const register = async () => {
    if (password.length > 5 && userName.length > 5 && rePassword === password) {
      setLoading(true);
      await accountsCallApi("", "post", {
        username: userName,
        password: password,
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Đăng ký thành công");
            setTimeout(() => {
              navi.push("/login");
            }, 2000);
          }
          // if (res.status === 201) {
          //   toast.warning("Tên đăng nhập đã tồn tại");
          // }
        })
        .catch(async (error) => {
          await accountsCallApi("getByUsser/", "post", {
            username: userName,
          })
            .then((res) => {
              if (res.status === 200) {
                toast.error("Tài khoản đã tồn tại");
              }
              // if (res.status === 201) {
              //   toast.warning("Tên đăng nhập đã tồn tại");
              // }
            })
            .catch((error) => {
              toast.error("Đăng ký thất bại");
            });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Đăng ký không thành công");
    }
  };
  const [checkU, setCheckU] = useState(true);
  const [checkP, setCheckP] = useState(false);
  const [checkRP, setCheckRP] = useState(false);
  const [infoCheckU, setCheckInfU] = useState("");
  const [infoCheckP, setCheckInfP] = useState("");
  const [infoCheckRP, setCheckInfRP] = useState("");

  const checkUserName = (event) => {
    if (event.target.value.replace(/^\s+|\s+$/gm, "").length <= 12) {
      setUserName(event.target.value.replace(/^\s+|\s+$/gm, ""));
    }
    if (event.target.value.replace(/^\s+|\s+$/gm, "").length > 5) {
      setCheckU(true);
      setCheckInfU("* Tài khoản hợp lệ");
    } else {
      setCheckU(false);
      setCheckInfU("* Tài khoản phải có độ dài từ 6 - 12 ký tự");
    }
  };
  const checkPassword = (e) => {
    if (e.target.value.replace(/^\s+|\s+$/gm, "").length <= 12) {
      setPassword(e.target.value.replace(/^\s+|\s+$/gm, ""));
      checkPassAndRepass(rePassword, e.target.value.replace(/^\s+|\s+$/gm, ""));
    }
    if (e.target.value.replace(/^\s+|\s+$/gm, "").length > 5) {
      setCheckP(true);
      setCheckInfP("* Mật khẩu hợp lệ");
    } else {
      setCheckP(false);
      setCheckInfP("* Mật khẩu phải có độ dài từ 6 - 12 ký tự");
    }
  };
  const checkRePassword = (e) => {
    if (e.target.value.replace(/^\s+|\s+$/gm, "").length <= 12) {
      setRePassword(e.target.value.replace(/^\s+|\s+$/gm, ""));
      checkPassAndRepass(e.target.value.replace(/^\s+|\s+$/gm, ""), password);
    }
  };
  const checkPassAndRepass = (repas, pas) => {
    if (repas === pas) {
      setCheckRP(true);
      setCheckInfRP("* Mật khẩu trùng khớp");
    } else {
      setCheckRP(false);
      setCheckInfRP("* Mật khẩu không trùng khớp");
    }
  };
  if (!CheckLogin()) {
    return (
      <div>
        <ToastContainer />
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="panel panel-primary">
            <div className="box f-c">
              <div className="p-5">
                <div className="panel-heading">
                  <div className="mb-3 pad-7">
                    <div className="form-floating mb-3">
                      <h3
                        className="panel-tittle"
                        style={{ textAlign: "center" }}
                      >
                        Đăng Ký
                      </h3>
                    </div>
                    <label htmlFor="userName" className="form-label f-l">
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      id="userName"
                      placeholder="Tài khoản"
                      value={userName}
                      onChange={(e) => checkUserName(e)}
                    />
                  </div>
                  <label
                    className="t-l f-r checkText"
                    style={{
                      color: checkU ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {infoCheckU}
                  </label>
                  <div className="mb-3 pad-7">
                    <label htmlFor="pass" className="form-label f-l">
                      Mật khẩu
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control "
                      id="pass"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => checkPassword(e)}
                    />
                  </div>
                  <label
                    className="t-l f-r checkText"
                    style={{
                      color: checkP ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {infoCheckP}
                  </label>
                  <div className="form-floating mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={showPass ? true : false}
                        onChange={() => setShowPass(!showPass)}
                      />
                      <label
                        className="form-check-label f-l"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Hiển thị mật khẩu
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 pad-7">
                    <label htmlFor="rePass" className="form-label f-l">
                      Nhập lại mật khẩu
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control "
                      id="rePass"
                      placeholder="Mật khẩu"
                      value={rePassword}
                      onChange={(e) => checkRePassword(e)}
                    />
                  </div>
                  <label
                    className="t-l f-r checkText"
                    style={{
                      color: checkRP ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {infoCheckRP}
                  </label>
                  <br></br>
                  <div className="form-floating mb-3">
                    {loading ? (
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        disabled
                        id="register1"
                      >
                        loading
                      </button>
                    ) : rePassword.length > 5 &&
                      userName.length > 5 &&
                      rePassword === password ? (
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={() => register()}
                        id="register2"
                      >
                        Đăng Ký
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        disabled
                        id="register1"
                      >
                        Thông tin chưa hợp lệ
                      </button>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <NavLink
                      to="/login"
                      // type="button"
                      className="btn btn-primary w-50 f-l"
                      // onClick={() => register()}
                    >
                      Đăng Nhập
                    </NavLink>
                  </div>
                  {/*<div className="form-floating mb-3 f-r">
                    <a href="/forgetPass">Quên mật khẩu</a>
                  </div>*/}
                  <br></br>
                </div>
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

export default RegisterPage;
