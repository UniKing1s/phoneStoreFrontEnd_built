import React, { Component } from "react";
import "./ProductItem.scss";
import { imgAPI_URL } from "../../constants/Config";
import { NavLink } from "react-router-dom";
class ProductItem extends Component {
  onDelete = (id, img) => {
    if (window.confirm("Bạn chắc chắc muốn xóa không ?")) {
      console.log(id);
      this.props.onDelete(id, img);
    }
  };
  render() {
    var { product, index } = this.props;
    var status = product.status === "còn hàng" ? "Còn hàng" : "Hết hàng";
    var statusClass = product.status === "còn hàng" ? "success" : "danger";
    return (
      <tr className="">
        <td>{index + 1}</td>
        <td>{product.masp}</td>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>
          <strong>
            {new Intl.NumberFormat("vi", {
              currency: "VND",
              style: "currency",
            }).format(product.price)}
          </strong>
        </td>
        <td>{product.sale}</td>
        <td>{product.decribtion}</td>
        <td>
          <span className={"badge text-bg-" + statusClass}>{status}</span>
        </td>
        <td>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <img
              src={imgAPI_URL + product.img}
              loading="lazy"
              className="object-fit-contain border rounded"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                display: "block",
                height: "100px",
                width: "100px",
                margin: "0 auto",
              }}
              object-fit="cover"
              alt="..."
            ></img>
          </div>
          {/* <img
            src={imgAPI_URL + product.img}
            className="img-fluid rounded-top rounded-bottom itemImg"
            alt=""
          /> */}
        </td>
        <td>
          <NavLink
            type="button"
            className="btn btn-success mb-3 mr-10"
            to={"updateProduct/" + product._id}
          >
            Sửa
          </NavLink>
          <button
            type="button"
            className="btn btn-danger mr-10 mb-3"
            onClick={() => this.onDelete(product.masp, product.img)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
