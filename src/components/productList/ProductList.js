import React, { Component } from "react";
import ProductItem from "../ProductItem/ProductItem";

class ProductList extends Component {
  showProductItem = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
            index={index}
            onDelete={this.props.onDelete}
          />
        );
      });
    }
    return result;
  };
  render() {
    var { products } = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã</th>
              <th scope="col">Tên</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
              <th scope="col">Giảm giá</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showProductItem(products)}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
