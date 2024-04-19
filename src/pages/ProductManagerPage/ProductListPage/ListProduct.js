import "./ListProduct.scss";
import ProductList from "../../../components/productList/ProductList";
import React, { Component } from "react";
// import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productCallApi, { imageDeleteCallApi } from "../../../utils/apiCaller";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
// import GetAccountRole from "../../../service/getAccountRole";
// import SendToLink from "../../../service/sendToLink";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      // hidden: false,
      // id: null,
    };
  }

  loading = true;
  componentDidMount() {
    // console.log(Number(GetAccountRole()));
    // if (Number(GetAccountRole()) === 0) {
    productCallApi("", "get", null).then((res) => {
      //console.log(res.data);
      this.setState({
        products: res.data,
      });
      this.loading = false;
    });
    // } else {
    //   SendToLink("/");
    // }
  }
  onDelete = (id, img) => {
    // this.setState({
    //   id: id,
    //   hidden: !this.state.hidden,
    // });
    this.onAcceptDelete(id, img);
  };
  onAcceptDelete = (id, img) => {
    var { products } = this.state;
    const masp = { masp: id };
    productCallApi("", "delete", masp).then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("Xóa sản phẩm mã " + id + " thành công");
        var index = products.findIndex((obj) => obj.masp === id);
        imageDeleteCallApi({ fileName: img }, "deleteImg/")
          .then(async (resp) => {
            if (resp.status === 200) {
              toast.success("Xóa file ảnh thành công");
            }
          })
          .catch((er) => {});
        if (index !== -1) {
          products.splice(index, 1);
          this.setState({
            products: products,
          });
        }
      }
    });
  };
  findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
      if (product.id === id) {
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
      var products = this.state.products;
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
                  <NavLink
                    to="/addProduct"
                    className="btn btn-primary mt-10 m-a"
                    //type="button"
                    //value="Thêm sản phẩm"
                  >
                    Thêm sản phẩm
                  </NavLink>
                  <div className="panel panel-primary li-box">
                    <div className="panel-heading">
                      <h3 className="panel-tittle">Danh sách sản phẩm</h3>
                    </div>
                    <div className="panel-body">
                      <ProductList
                        products={products}
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
// connect(accountSlice.reducer)(ListProduct);
export default connect(mapStateToProps)(withRouter(ListProduct));
