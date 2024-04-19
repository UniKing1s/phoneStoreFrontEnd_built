import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateAccount } from "../../redux/accountSlice";
// import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

// username = connect((state) => state.user.account.username);
// handleRegisterButton = () => {
//   return (window.location.href = "/register");
// };
const Header = () => {
  const searchText = useRef();
  const navi = useHistory();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const cart = useSelector((state) => state.cart);
  const logoutSubmit = () => {
    const account = { username: "", logged: false, role: 1 };
    localStorage.removeItem("_token");
    dispatch(updateAccount(account));
    navi.push("/");
  };
  const chekKeyDown = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      e.preventDefault();
      searchSubmit();
    }
  };
  const checkSpacing = (input) => {
    const inputArray = Array.from(input);
    const InputLength = inputArray.length;
    let i = 0;
    inputArray.forEach((e) => {
      if (e === " ") {
        i = Number(i) + 1;
      }
    });
    if (i >= InputLength) {
      return true;
    } else {
      return false;
    }
  };
  const searchSubmit = () => {
    if (searchText.current) {
      if (!checkSpacing(searchText.current)) {
        navi.push("/search?name=" + searchText.current);
      }
    }
  };
  const setSearchText = (e) => {
    searchText.current = e.target.value;
    // console.log(e.target.value);
  };
  // console.log(account);
  return (
    <div>
      <>
        <nav
          className="navbar navbar-expand-sm navbar-light bg-primary"
          style={{ color: "white" }}
        >
          <div className="container">
            {/* <a className="navbar-brand" href="/">
              Rest API
            </a> */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to="/"
                    aria-current="page"
                    style={{ color: "white" }}
                  >
                    Trang chủ <span className="visually-hidden">(current)</span>
                  </NavLink>
                </li>
                {account.role === 0 && account.logged ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="/"
                        role="button"
                        aria-expanded="false"
                        style={{ color: "white" }}
                      >
                        Quản lý sản phẩm
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink className="dropdown-item" to="/listProduct">
                            Danh sách sản phẩm
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="/addProduct">
                            Thêm sản phẩm
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="/"
                        role="button"
                        aria-expanded="false"
                        style={{ color: "white" }}
                      >
                        Quản lý tài khoản
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink className="dropdown-item" to="/userManager">
                            Danh sách tài khoản
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="/"
                        role="button"
                        aria-expanded="false"
                        style={{ color: "white" }}
                      >
                        Quản lý hóa đơn
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink className="dropdown-item" to="/billManager">
                            Danh sách hóa đơn
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>

              <div className="d-flex my-2 my-lg-0">
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                  value={searchText.current}
                  onChange={(e) => setSearchText(e)}
                  onKeyUp={(e) => chekKeyDown(e)}
                />
                <button
                  className="btn btn-success my-2 my-sm-0 mr-10"
                  onClick={() => searchSubmit()}
                >
                  Search
                </button>
              </div>
              <NavLink
                type="button"
                className="btn btn-info position-relative mr-10"
                // onclick={() => goToCart()}
                to="/cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length >= 1 ? " " + cart.length : "0"}
                  {/* <span className="visually-hidden">unread messages</span> */}
                </span>
              </NavLink>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="dropdown"
                >
                  {account.logged
                    ? "Welcome: " + account.username
                    : "Tài Khoản"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  {!account.logged ? (
                    <>
                      <li>
                        <NavLink
                          to="/register"
                          style={{ width: "100%", height: "100%" }}
                          className="btn btn-primary my-2 my-sm-0"
                          // type="button"
                          // onClick={() => this.handleRegisterButton()}
                        >
                          Đăng Ký
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          style={{ width: "100%" }}
                          className="btn btn-success my-2 my-sm-0"
                          // type="submit"
                        >
                          Đăng nhập
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink
                          to="/billManager"
                          style={{ width: "100%" }}
                          className="btn btn-success my-2 my-sm-0"
                          // type="submit"
                        >
                          Hóa đơn mua bán
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          style={{ width: "100%", height: "100%" }}
                          className="btn btn-secondary my-2 my-sm-0"
                          // type="submit"
                          onClick={() => logoutSubmit()}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default Header;
