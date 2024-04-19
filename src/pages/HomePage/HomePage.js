import React, { Component } from "react";
import CardItem from "../../components/cardItem/CardItem";
import Introdution from "../../components/introdution/introdution";
import "./HomePage.scss";
import productCallApi, {
  brandCallApi,
  imageDeleteCallApi,
} from "../../utils/apiCaller";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Navigator from "../../components/Navigator/Navigator";
class HomePage extends Component {
  state = {
    products: [],
    products1: [],
    producSale: [],
    brands: [],
    // account: null,
  };
  loading = true;

  componentDidMount() {
    // productCallApi("", "get", null).then((res) => {
    //   //console.log(res.data);
    //   this.setState({
    //     products: res.data,
    //   });
    //   this.loading = false;
    // });
    brandCallApi("", "GET").then((resBrand) => {
      if (resBrand.status === 200) {
        this.setState({
          brands: resBrand.data,
        });
        productCallApi("brand/IPHONE", "GET", null).then((res) => {
          if (res.status === 200) {
            const data = res.data;
            // console.log(data);
            this.setState({
              products: data,
            });
            productCallApi("brand/SAMSUNG", "GET")
              .then((res1) => {
                if (res1.status === 200) {
                  // const updatedProduct2 = [...this.state.products, ...res1.data];
                  this.setState({
                    products1: res1.data,
                  });
                  productCallApi("sale", "GET").then((res2) => {
                    if (res2.status === 200) {
                      this.setState({
                        producSale: res2.data,
                      });
                    }
                  });
                }
                this.loading = false;
              })
              .catch((error) => {});
          }
        });
      }
    });
  }
  onAcceptDelete = (id, img) => {
    var { products } = this.state;
    const masp = { masp: id };
    productCallApi("", "delete", masp).then((res) => {
      // console.log(res);
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
  toastMess = (type, mess) => {
    if (type === "err") {
      toast.error(mess);
    } else {
      toast.success(mess);
    }
  };
  // showCardItem = () => {
  //   var result = null;
  //   // console.log(this.state.products.length);

  //   if (this.state.products.length > 0) {
  //     result = this.state.products.map((product, index) => {
  //       return (
  //         <>
  //           {/* <div className="carousel-item active"> */}
  //           <CardItem
  //             key={index}
  //             product={product}
  //             account={this.state.account}
  //             onDelete={this.onDelete}
  //             toastMess={this.toastMess}
  //           />
  //           {/* </div> */}
  //         </>
  //       );
  //     });
  //   }
  //   return result;
  // };
  getCard = (products) => {
    if (!products) {
      return null;
    }
    /// Chia số lượng sản phẩm có trong array products để có đươc số row mà trong đó 1 row gồm 4 item (Lấy số nguyên sau khi chia không làm tròn)
    const getNumberPage = Math.floor(products.length / 4);
    //khai báo danh sách chứa
    var result = [];
    // console.log(getNumberPage);

    for (let i = 0; i < getNumberPage; i++) {
      //Tách ra danh sách gồm 4 sản phẩm với số lượng mà getNumberPage có
      let lst = products.slice(1 * i * 4, 4 * (i + 1));
      //class name có active đầu tương ứng với row đầu tiên được add vào để có thể kích hoạt slider
      result.push(
        <>
          {i === 0 ? (
            <>
              <div className="carousel-item active" key={i}>
                <div
                  className="row"
                  style={{ width: "90%", margin: "0 auto" }}
                  // id="itemContent"
                >
                  {lst.map((product, index) => {
                    return (
                      <>
                        <CardItem
                          key={index}
                          product={product}
                          account={this.state.account}
                          onDelete={this.onAcceptDelete}
                          toastMess={this.toastMess}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="carousel-item" key={i}>
                <div
                  className="row"
                  style={{ width: "90%", margin: "0 auto" }}
                  // id="itemContent"
                >
                  {lst.map((product, index) => {
                    return (
                      <>
                        <CardItem
                          key={index}
                          product={product}
                          account={this.state.account}
                          onDelete={this.onAcceptDelete}
                          toastMess={this.toastMess}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </>
      );
      // console.log(result);
    }
    return result;
  };
  // showCardItemBrand = (lst) => {
  //   var result = null;
  //   if (lst.length > 0) {
  //     result = lst.map((product, index) => {
  //       return (
  //         <>
  //           <CardItem
  //             key={index}
  //             product={product}
  //             account={this.state.account}
  //             onDelete={this.onDelete}
  //             toastMess={this.toastMess}
  //           />
  //         </>
  //       );
  //     });
  //   }
  //   return result;
  // };
  render() {
    return (
      <>
        <div>
          <ToastContainer />
          {this.loading ? (
            <div className="container mt-10">
              <div className="spinner-border text-primary m-a" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <Introdution />
              <Navigator brands={this.state.brands}></Navigator>
              {/* <div className="container mt-10">
                <div className="text-center">
                  <div id="itemContent">{this.showCardItem()}</div>
                </div>
              </div> */}
              {/* sản phẩm Khuyến mãi  */}
              <div
                className="form-control mt-10 mb-3"
                style={{
                  width: "90%",
                  margin: "0 auto",
                  backgroundImage: `url("sale.png")`,
                  backgroundSize: "cover",
                }}
              >
                {/* <div class="col">1 of 3</div>
                <div class="col-5">2 of 3 (wider)</div>
                <div class="col">3 of 3</div> */}
                <div
                  className=""
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <label
                    style={{
                      marginLeft: "5%",
                      float: "left",
                      fontSize: "30px",
                    }}
                  >
                    <strong>Siêu Sale</strong>
                  </label>
                  <NavLink
                    to={"/search?name=sale"}
                    style={{
                      marginRight: "20px",
                      float: "right",
                      marginRight: "5%",
                      marginTop: "0 ",
                      marginBottom: "0 ",
                      fontSize: "20px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <strong>Xem tất cả</strong>
                  </NavLink>
                </div>
                {/* </div> */}
                <div
                  id="SaleItemCards"
                  className="carousel carousel-dark slide w-100 mt-10 mb-3"
                  // data-bs-interval="2000"
                  //autoplay 3s
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner m-l-r"
                    id="carousel-iner"
                    style={{
                      maxHeight: "500px",
                      margin: "auto",
                      width: "100%",
                      display: "flex",
                      // objectFit: "cover",
                    }}
                  >
                    {this.getCard(this.state.producSale)}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#SaleItemCards"
                    data-bs-slide="prev"
                    style={{ width: "5%" }}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#SaleItemCards"
                    data-bs-slide="next"
                    style={{ width: "5%" }}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div
                className="form-control mt-10 mb-3"
                style={{
                  width: "90%",
                  margin: "0 auto",
                  backgroundImage: `url("bgimg.jpg")`,
                  backgroundSize: "cover",
                }}
              >
                {/* <div class="col">1 of 3</div>
                <div class="col-5">2 of 3 (wider)</div>
                <div class="col">3 of 3</div> */}
                <div
                  className=""
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <label
                    style={{
                      marginLeft: "5%",
                      float: "left",
                      fontSize: "30px",
                    }}
                  >
                    <strong>IPHONE</strong>
                  </label>
                  <NavLink
                    to={"/search?name=Iphone"}
                    style={{
                      marginRight: "20px",
                      float: "right",
                      marginRight: "5%",
                      marginTop: "0 ",
                      marginBottom: "0 ",
                      fontSize: "20px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <strong>Xem tất cả</strong>
                  </NavLink>
                </div>
                {/* </div> */}
                <div
                  id="cardItemByBrand"
                  className="carousel carousel-dark slide w-100 mt-10"
                  // data-bs-interval="2000"
                  //autoplay 3s
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner m-l-r"
                    id="carousel-iner"
                    style={{
                      maxHeight: "500px",
                      margin: "auto",
                      width: "100%",
                      display: "flex",
                      // objectFit: "cover",
                    }}
                  >
                    {this.getCard(this.state.products)}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#cardItemByBrand"
                    data-bs-slide="prev"
                    style={{ width: "5%" }}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#cardItemByBrand"
                    data-bs-slide="next"
                    style={{ width: "5%" }}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div
                className="form-control mt-10 mb-3"
                style={{
                  width: "90%",
                  margin: "0 auto",
                  backgroundImage: `url("bgimg.jpg")`,
                  backgroundSize: "cover",
                }}
              >
                {/* <div class="col">1 of 3</div>
                <div class="col-5">2 of 3 (wider)</div>
                <div class="col">3 of 3</div> */}
                <div
                  className=""
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <label
                    style={{
                      marginLeft: "5%",
                      float: "left",
                      fontSize: "30px",
                    }}
                  >
                    <strong>SAMSUNG</strong>
                  </label>
                  <NavLink
                    to={"/search?name=SAMSUNG"}
                    style={{
                      marginRight: "20px",
                      float: "right",
                      marginRight: "5%",
                      marginTop: "0 ",
                      marginBottom: "0 ",
                      fontSize: "20px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <strong>Xem tất cả</strong>
                  </NavLink>
                </div>
                {/* </div> */}
                <div
                  id="SamSungItemByBrand"
                  className="carousel carousel-dark slide w-100 mt-10 mb-3"
                  // data-bs-interval="5000"
                  //autoplay 3s
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner m-l-r"
                    id="carousel-iner"
                    style={{
                      maxHeight: "500px",
                      margin: "auto",
                      width: "100%",
                      display: "flex",
                      // objectFit: "cover",
                    }}
                  >
                    {this.getCard(this.state.products1)}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#SamSungItemByBrand"
                    data-bs-slide="prev"
                    style={{ width: "5%" }}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#SamSungItemByBrand"
                    data-bs-slide="next"
                    style={{ width: "5%" }}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
export default HomePage;
