import React, { Component } from "react";
import UserItem from "../UserItem/UserItem";

class UserList extends Component {
  showUserItem = (users) => {
    var result = null;
    console.log(users);
    if (users.length > 0) {
      result = users.map((user, index) => {
        return (
          <UserItem
            key={index}
            user={user}
            index={index}
            onDelete={this.props.onDelete}
          />
        );
      });
    }
    return result;
  };
  render() {
    var { users } = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Số thứ tự</th>
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Mật khẩu</th>
              <th scope="col">Hiển thị</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showUserItem(users)}</tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
