import React, { Component } from "react";
import BillItem from "../BillItem/BillItem";

class BillListComponent extends Component {
  showBillItem = (bills) => {
    var result = null;
    console.log(bills);
    if (bills.length > 0) {
      result = bills.map((bill, index) => {
        return (
          <BillItem
            key={index}
            bill={bill}
            index={index}
            onDelete={this.props.onDelete}
            updateThanhToan={this.props.updateThanhToan}
          />
        );
      });
    }
    return result;
  };
  render() {
    var { bills } = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Số thứ tự</th>
              <th scope="col">Mã hóa đơn</th>
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Ngày tạo hóa đơn</th>
              <th scope="col">Trạng thái hóa đơn</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showBillItem(bills)}</tbody>
        </table>
      </div>
    );
  }
}

export default BillListComponent;
