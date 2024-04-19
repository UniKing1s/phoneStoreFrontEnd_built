import React, { useState } from "react";
// import { brandCallApi } from "../../utils/apiCaller";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Navigator.scss";
const Navigator = (props) => {
  //   const [loading, setLoading] = useState(true);
  const { brands } = props;
  const showBrand = () => {
    var result = null;
    result = brands.map((brand, index) => {
      return (
        <>
          <NavLink
            className="navbar-brand navi-brand"
            to={`/search?name=${brand.id}`}
            style={{
              // fontSize: "15px",
              fontWeight: "bold",
              textDecoration: "none",
              color: "black",
              // backgroundColor: "red",
              margin: "0 auto",
            }}
          >
            {brand.name}
          </NavLink>
        </>
      );
    });
    return result;
  };
  return (
    <nav
      className="navbar navbar-light bg-light form-control mb-3"
      style={{
        width: "90%",
        margin: "0 auto",
        backgroundImage: "url(nav.png)",
      }}
    >
      <div className="container-fluid">{showBrand()}</div>
    </nav>
  );
};

export default Navigator;
