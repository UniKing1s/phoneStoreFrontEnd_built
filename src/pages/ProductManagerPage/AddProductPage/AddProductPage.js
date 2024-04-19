import React, { Component, useEffect, useState } from "react";
import "./AddProductPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productCallApi, { brandCallApi } from "../../../utils/apiCaller";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import Select from "react-select";
// import FileSaver from "file-saver";
const AddProductPage = () => {
  const _account = useSelector((state) => state.account);
  const navi = useHistory();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [decribtion, setDecribtion] = useState("");
  const [status, setStatus] = useState("còn hàng");
  const [brand, setBrand] = useState([]);
  const [brandchoose, setBrandChoose] = useState("");
  let image = null;
  let imgExL =
    "https://kenh14cdn.com/2020/7/8/sneakerbeatt980786952386496440807699102621998261586840n-15941830338201855570678.jpg";

  const handleChangeStatus = () => {
    status === "còn hàng" ? setStatus("hết hàng") : setStatus("còn hàng");
  };
  let formData = new FormData();
  useEffect(() => {
    if (brand.length === 0 && _account.role === 0 && _account.logged) {
      // let brands;
      const getBrand = () => {
        brandCallApi("/", "get", null)
          .then((res) => {
            if (res.status === 200) {
              setBrand(res.data);
            }
          })
          .catch((err) => {
            toast.warning("Không có thông tin về hãng tương ứng");
          });
      };
      getBrand();
    }
  });

  const handleChangeImgInput = (event) => {
    image = event.target.files[0];
    formData.append("image", event.target.files[0]);
    // this.setState({
    //   img: "1",
    // });
    ///đưa sang dạng base64 và lưu vào db
    // const img = await this.imageBase64(event.target.files[0]);
    // this.setState({
    //   img: img,
    // });
    // console.log(this.state.img);
  };

  // const onChange = (event) => {
  //   var target = event.target;
  //   var name = target.name;
  //   var value = target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  const onSave = async () => {
    // const formData = new FormData();
    // console.log(formData);
    if (brandchoose === "") {
      toast.error("Chưa chọn hãng cho sản phẩm!!");
      return;
    }
    let namecheck = name;
    namecheck = namecheck.replace(" ", "");
    if (namecheck !== "") {
      await productCallApi("uploadImage/", "post", formData)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.filename !== "" || res.data.filename != null) {
              productCallApi("", "post", {
                name: name,
                quantity: quantity,
                price: price,
                sale: sale,
                type: brandchoose,
                decribtion: decribtion,
                status: status,
                img: res.data.filename,
              })
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    toast.success("Thêm sản phẩm thành công");
                    window.location.href = "listProduct";
                  }
                })
                .catch((err) => {
                  toast.error("Upload Lỗi");
                });
            } else {
              toast.error("Chưa upfile hình ảnh sản phẩm");
            }
            // setImg(res.data.filename);
          } else {
            toast.error("Chưa upfile hình ảnh sản phẩm");
          }
        })
        .catch((err) => {
          //run this toast
          toast.error("Chưa upfile hình ảnh sản phẩm");
        });
    } else {
      toast.error("Tên sản phẩm rỗng!");
    }
  };
  // imageBase64 = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   const data = new Promise((resolve, reject) => {
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (err) => reject(err);
  //   });
  //   return data;
  // };
  // render() {
  //   // const [masp, setMaSp] = useState("");
  //   const { update } = this.props;
  //   let brand = this.getBrand();
  //   let chose = [];
  //   if (brand) {
  //     for (let i of brand) {
  //       chose.push({ value: i.id, label: i.name });
  //     }
  //   }

  if (_account.role === 0 && _account.logged) {
    return (
      <>
        <ToastContainer />
        <div className="container">
          <div className="panel panel-primary w-50 magin-a box">
            <div
              className="container"
              style={{ width: "95%", marginTop: "20px" }}
            >
              <div className="panel-heading">
                <h3 className="panel-tittle" style={{ textAlign: "center" }}>
                  Thêm sản phẩm
                </h3>
              </div>
              <div className="panel-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Tên sản phẩm"
                    name="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Tên sản phẩm</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Số lượng"
                    name="quantity"
                    value={quantity}
                    onChange={(event) => {
                      setQuantity(event.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Số lượng</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Giá trị"
                    name="price"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Giá tiền</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Giảm giá"
                    name="sale"
                    min={0}
                    max={100}
                    value={sale}
                    onChange={(event) => {
                      setSale(event.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Giảm giá</label>
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Hãng
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    name="type"
                    value={brandchoose}
                    onChange={(event) => {
                      setBrandChoose(event.target.value);
                    }}
                  >
                    <option value={""}>Choose...</option>
                    {brand.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    type="text"
                    className="form-control"
                    id="decribtion"
                    placeholder="Mô tả sản phẩm"
                    name="decribtion"
                    value={decribtion}
                    onChange={(event) => {
                      setDecribtion(event.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Mô tả</label>
                </div>

                <div className="form-floating mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={status === "còn hàng" ? true : false}
                      onChange={() => handleChangeStatus()}
                    />
                    <label
                      className="form-check-label lbl"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      {status === "còn hàng" ? "Còn hàng" : "Hết hàng"}
                    </label>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="img">
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={(event) => handleChangeImgInput(event)}
                  />
                </div>
                {/*<div className="form-floating mb-3">
                    <img
                      className="imgAddProduct"
                      src={this.state.img === "" ? this.imgExL : this.img}
                      alt=""
                    ></img>
                    <br></br>
                    <br></br>
                  </div>*/}
              </div>
            </div>
            <div className="form-floating mb-3">
              <button
                type="button"
                className="btn btn-success mr-10"
                onClick={() => onSave()}
              >
                Lưu
              </button>
              <NavLink
                type="button"
                className="btn btn-danger"
                to="/listProduct"
              >
                Hủy
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navi.push("/");
  }
};
// }

export default AddProductPage;
