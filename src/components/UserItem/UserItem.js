import React, { Component } from "react";
import "./UserItem.scss";
import { NavLink } from "react-router-dom";
class UserItem extends Component {
  onDelete = (username, pwd) => {
    if (window.confirm("Bạn chắc chắc muốn xóa không ?")) {
      console.log(username);
      this.props.onDelete(username, pwd);
    }
  };
  state = {
    showPass: false,
  };
  setShowPass = (bool) => {
    this.setState({
      showPass: bool,
    });
  };
  changePass = (user) => {
    let string = "";
    for (let i = 0; i < user.password.length; i++) {
      string += "*";
    }
    return string;
  };
  render() {
    var { user, index } = this.props;
    return (
      <tr className="">
        <td>{index + 1}</td>
        <td>{user.username}</td>
        <td>
          {/* {this.state.showPass ? user.password : this.changePass(user)} */}
          <div className="form-floating mb-3">
            <div className="form-floating mb-3">
              {this.state.showPass ? user.password : this.changePass(user)}
            </div>
          </div>
        </td>
        <td>
          <div
            className="form-check form-switch"
            style={{ alignItems: "center" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={this.state.showPass}
              style={{ margin: "auto" }}
              onChange={() => this.setShowPass(!this.state.showPass)}
              id="showPass"
            />
            {/* <label className="form-check-label f-l" htmlFor="showPass">
              Hiển thị mật khẩu
            </label> */}
          </div>
        </td>
        <td>
          <NavLink
            type="button"
            className="btn btn-success mr-10"
            to={"updateUser?user=" + user.username}
          >
            Sửa
          </NavLink>
          <button
            type="button"
            className="btn btn-danger mr-10"
            onClick={() => this.onDelete(user.username, user.password)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default UserItem;
