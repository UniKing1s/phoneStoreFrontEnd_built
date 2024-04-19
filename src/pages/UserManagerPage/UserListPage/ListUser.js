import "./ListUser.scss";
import UserList from "../../../components/userList/UserList";
import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountsCallApi } from "../../../utils/apiCaller";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
// import GetAccountRole from "../../../service/getAccountRole";
// import SendToLink from "../../../service/sendToLink";

class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  loading = true;
  componentDidMount() {
    // console.log(Number(GetAccountRole()));
    // if (Number(GetAccountRole()) === 0) {
    accountsCallApi("", "GET", null).then((res) => {
      //console.log(res.data);
      this.setState({
        users: res.data,
      });
      this.loading = false;
    });
    // } else {
    //   SendToLink("/");
    // }
  }
  onDelete = (username, pwd) => {
    // this.setState({
    //   id: id,
    //   hidden: !this.state.hidden,
    // });
    this.onAcceptDelete(username, pwd);
  };
  onAcceptDelete = (username, pwd) => {
    var { users } = this.state;
    accountsCallApi("", "DELETE", { username: username, password: pwd })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Xóa thông tin người dùng thành công");
          var index = users.findIndex((obj) => obj.username === username);
          if (index !== -1) {
            users.splice(index, 1);
            this.setState({
              users: users,
            });
          }
        } else {
          toast.error("Xóa người dùng thất bại");
        }
      })
      .catch((err) => {
        toast.error("Xóa người dùng thất bại");
      });
  };
  findIndex = (users, username) => {
    var result = -1;
    users.forEach((user, index) => {
      if (user.username === username) {
        result = index;
      }
    });
    return result;
  };
  render() {
    const { account, history } = this.props;

    // const acc = accountSlice.reducer((state) => state.account);
    // console.log(acc);
    if (account.role === 0 && account.logged) {
      return (
        <div>
          <ToastContainer />
          {this.loading ? (
            <div className="container mt-10">
              <div className="spinner-border text-primary m-a" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row justify-content-center align-items-center g-2">
                <div className="col">
                  <div className="panel panel-primary li-box mt-10">
                    <div className="panel-heading">
                      <h3 className="panel-tittle">Danh sách người dùng</h3>
                    </div>
                    <div className="panel-body">
                      <UserList
                        users={this.state.users}
                        onDelete={this.onDelete}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      history.push("/");
    }
  }
}
const mapStateToProps = (state) => ({
  account: state.account, // Replace with your slice/property
});
export default connect(mapStateToProps)(withRouter(ListUser));
