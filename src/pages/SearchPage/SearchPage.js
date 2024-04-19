import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import CardItem from "../../components/cardItem/CardItem";
import productCallApi, { imageDeleteCallApi } from "../../utils/apiCaller";

const SearchPage = () => {
  ///useLocation để lấy giá trị query String đang truy cập
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  // const { name } = useParams();
  //   console.log(name);
  console.log(name);
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastMess = (type, mess) => {
    if (type === "err") {
      toast.error(mess);
    } else {
      toast.success(mess);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      await productCallApi("search/", "post", { name: name })
        .then((res) => {
          //console.log(res.data);
          setProduct(res.data);
          console.log(products);
        })
        .catch((err) => {
          toast.error("Không có sản phẩm tương ứng");
        })
        .finally(() => {
          setLoading(false);
          console.log(products);
        });
    };
    const getSale = async () => {
      await productCallApi("sale", "GET")
        .then((res) => {
          //console.log(res.data);
          setProduct(res.data);
          console.log(products);
        })
        .catch((err) => {
          toast.error("Không có sản phẩm tương ứng");
        })
        .finally(() => {
          setLoading(false);
          console.log(products);
        });
    };
    if (!name || name.replaceAll(" ", "") === "") {
      toast.error("Không có nội dung tìm kiếm");
      setLoading(false);
    } else {
      if (name.toLowerCase() === "sale") {
        getSale();
      } else {
        getProducts();
      }
    }
  }, [name]);
  const onAcceptDelete = (id, img) => {
    var products1 = products;
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
          products1.splice(index, 1);
          setProduct(products1);
          // this.setState({
          //   products: products1,
          // });
        }
      }
    });
  };
  const showCardItem = () => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <CardItem
            key={index}
            product={product}
            onDelete={onAcceptDelete}
            toastMess={toastMess}
          />
        );
      });
    } else {
      toast.error("Không có sản phẩm tương ứng");
    }
    return result;
  };
  return (
    <>
      <div>
        <ToastContainer />
        {loading ? (
          <div className="container mt-10">
            <div className="spinner-border text-primary m-a" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="container mt-10">
              <div className="text-center">
                <div className="row" id="itemContent">
                  {showCardItem()}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
