import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productCallApi, {
  brandCallApi,
  imageDeleteCallApi,
} from "../../../utils/apiCaller";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const EditProductPage = () => {
  // state = {
  //   masp: 4,
  //   name: "",
  //   quantity: 0,
  //   price: 0,
  //   sale: 0,
  //   type: 1,
  //   decribtion: "",
  //   status: "còn hàng",
  //   img: "",
  // };
  // const [name, setName] = useState("");
  // const [quantity, setQuantity] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [sale, setSale] = useState(0);
  // const [type, setType] = useState("");
  // const [decribtion, setDecribtion] = useState("");
  // const [status, setStatus] = useState("còn hàng");
  // const [img, setImg] = useState("");
  const account = useSelector((state) => state.account);
  const navi = useHistory();
  const [oldImg, setOldImg] = useState("");
  const [data, setData] = useState({});
  const changeImg = useRef(false);
  const loading = useRef(true);
  const image = useRef("");
  const [brands, setBrands] = useState([]);

  const { id } = useParams();
  // console.log(id);
  // console.log(loading);
  // const loadProduct = async () => {
  //   await productCallApi("byId/", "put", { _id: id })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         loading.current = false;
  //         setName(res.data.name);
  //         setPrice(res.data.price);
  //         setQuantity(res.data.quantity);
  //         setSale(res.data.sale);
  //         setStatus(res.data.status);
  //         setImg(res.data.img);
  //         setOldImg(res.data.img);
  //         setType(res.data.type);
  //         setDecribtion(res.data.decribtion);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.warning("Không có thông tin sản phẩm tương ứng");
  //       loading.current = false;
  //     });
  //   loading.current = false;
  // };
  useEffect(() => {
    if (loading.current) {
      const _getData = async () => {
        await brandCallApi("", "get", {}).then((res) => {
          if (res.status === 200) {
            setBrands(res.data);
          }
        });
        await productCallApi("byId/", "put", { _id: id })
          .then((res) => {
            if (res.status === 200) {
              setData(res.data);
              setOldImg(res.data.img);
              loading.current = false;
            }
          })
          .catch((err) => {
            toast.warning("Không có thông tin sản phẩm tương ứng");
            loading.current = false;
          });
      };
      if (account.logged && account.role === 0) {
        _getData();
      }
    }
  });

  // if (loading) {
  //   loadProduct();
  // }
  // const { update } = props;
  // const imgExL =
  //   "https://kenh14cdn.com/2020/7/8/sneakerbeatt980786952386496440807699102621998261586840n-15941830338201855570678.jpg";

  const handleChangeStatus = () => {
    //event.preventDefault();
    data.status === "còn hàng"
      ? setData(Object.assign({}, data, { status: "hết hàng" }))
      : setData(Object.assign({}, data, { status: "còn hàng" }));
    // console.log(data);
  };
  const formData = new FormData();
  const handleChangeImgInput = async (event) => {
    if (event.target.files[0]) {
      console.log(event.target.files[0]);
      image.current = event.target.files[0].name;
      console.log(image);
      formData.append("image", event.target.files[0]);
      changeImg.current = true;
    }
    // console.log(formData);
  };
  // const handleChangeImgInput = (event) => {
  //   setImg(event.target.value);
  // };
  // const onChange = (event) => {
  //   var target = event.target;
  //   var name = target.name;
  //   var value = target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  // const [product, setProduct] = useState({});
  const onSave = async () => {
    const product = {
      masp: data.masp,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      sale: data.sale,
      type: data.type,
      decribtion: data.decribtion,
      status: data.status,
    };
    if (data.name !== "" || data.img !== "") {
      if (changeImg.current === true) {
        await productCallApi("uploadImage/", "post", formData)
          .then(async (respo) => {
            if (respo.status === 200) {
              console.log(respo.data.filename);
              console.log(data);
              const imgNew = {
                masp: data.masp,
                img: respo.data.filename,
              };
              await productCallApi("update/", "post", imgNew)
                .then((res) => {
                  console.log(res.data);
                  // if (res.status === 200) {
                  //   // toast.success("Sửa thông tin thành công");
                  // }
                })
                .catch((err) => {
                  toast.error("Lỗi update ");
                });
              // product["img"] = respo.data.filename;
              await imageDeleteCallApi({ fileName: oldImg }, "deleteImg/")
                .then(async (resp) => {
                  if (resp.status === 200) {
                    toast.success("Xóa file thành công");
                  }
                })
                .catch((er) => {
                  toast.error("lỗi xóa file");
                });

              // setData(Object.assign({}, data, { img: respo.data.filename }));
              return respo.data.filename;
            }
          })
          .catch((er) => {
            toast.error("lỗi up file");
          });
      }
      await productCallApi("update/", "post", product)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            toast.success("Sửa thông tin thành công");
          }
        })
        .catch((err) => {
          toast.error("Lỗi update ");
        });
    }
  };
  if (account.role === 0 && account.logged) {
    return (
      <>
        <ToastContainer />
        <div className="container">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-tittle" style={{ textAlign: "center" }}>
                Sửa sản phẩm
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
                  value={data.name}
                  onChange={(e) =>
                    setData(Object.assign({}, data, { name: e.target.value }))
                  }
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
                  value={data.quantity}
                  onChange={(e) =>
                    setData(
                      Object.assign({}, data, { quantity: e.target.value })
                    )
                  }
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
                  value={data.price}
                  onChange={(e) =>
                    setData(Object.assign({}, data, { price: e.target.value }))
                  }
                />
                <label htmlFor="floatingInput">Giá tiền</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Số lượng"
                  name="sale"
                  value={data.sale}
                  onChange={(e) =>
                    setData(Object.assign({}, data, { sale: e.target.value }))
                  }
                />
                <label htmlFor="floatingInput">Giảm giá</label>
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Loại
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  name="type"
                  value={data.type}
                  onChange={(e) =>
                    setData(Object.assign({}, data, { type: e.target.value }))
                  }
                >
                  <option value="">Choose...</option>
                  {brands.length === 0 ? (
                    <></>
                  ) : (
                    brands.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Mô tả sản phẩm"
                  name="sale"
                  value={data.decribtion}
                  onChange={(e) =>
                    setData(
                      Object.assign({}, data, { decribtion: e.target.value })
                    )
                  }
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
                    checked={data.status === "còn hàng" ? true : false}
                    onChange={() => handleChangeStatus()}
                  />
                  <label
                    className="form-check-label lbl"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    {data.status === "còn hàng" ? "Còn hàng" : "Hết hàng"}
                  </label>
                </div>
              </div>
              {/* <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                  value={img}
                  onChange={(event) => handleChangeImgInput(event)}
                />
                <label htmlFor="floatingInput">
                  Hình ảnh (vd: https://xxxx/xxxx.jpg)
                </label>
              </div> */}
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
                  onChange={(e) => handleChangeImgInput(e)}
                />
              </div>
              {/* <div className="form-floating mb-3">
                <img
                  className="imgAddProduct"
                  src={img === "" ? imgExL : img}
                  alt=""
                ></img>
                <br></br>
                <br></br>
              </div> */}
            </div>
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
          <NavLink type="button" className="btn btn-danger" to="/listProduct">
            Hủy
          </NavLink>
        </div>
      </>
    );
  } else {
    navi.push("/");
  }
};

export default EditProductPage;
