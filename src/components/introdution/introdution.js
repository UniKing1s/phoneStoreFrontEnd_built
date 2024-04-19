import React, { Component } from "react";
import "./introdution.scss";
class Introdution extends Component {
  render() {
    return (
      <div
        id="banner2"
        className="carousel w-100 slide mb-3"
        data-bs-ride="carousel"
        // data-bs-interval="5000"
        style={{
          width: "600px",
          maxHeight: "400px",
        }}
      >
        <div
          className="carousel-inner m-l-r"
          id="carousel-iner"
          style={{
            // maxHeight: "500px",
            // width: "700px",
            width: "100%",
            maxHeight: "400px",
            margin: "auto",
            // width: "100%",
            objectFit: "cover",
          }}
        >
          <div className="carousel-item active">
            <img
              src="banner1.png"
              // loading="lazy"
              className="d-block w-100"
              alt="..."
              style={{
                objectFit: "cover",
                margin: "auto",
                width: "600px",
                maxHeight: "400px",
                // width: "100%",
                // maxHeight: "500px",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="banner2.png"
              // loading="lazy"
              className="d-block w-100"
              alt="..."
              style={{
                objectFit: "cover",
                margin: "auto",
                width: "600px",
                maxHeight: "400px",
                // width: "100%",
                // maxHeight: "500px",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="banner3.png"
              // loading="lazy"
              className="d-block w-100"
              alt="..."
              style={{
                objectFit: "cover",
                margin: "auto",
                width: "600px",
                maxHeight: "400px",
                // width: "100%",
                // maxHeight: "500px",
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#banner2"
          data-bs-slide="prev"
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
          data-bs-target="#banner2"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      // <div className="w-100 mb-3" style={{ height: "300px", display: "flex" }}>
      //   <div
      //     id="carouselExampleIndicators"
      //     className="carousel carousel-dark slide mb-3"
      //     data-bs-ride="carousel"
      //     data-bs-interval="5000"
      //     style={{ width: "600px", height: "300px", marginLeft: "5%" }}
      //   >
      //     <div
      //       className="carousel-inner m-l-r"
      //       id="carousel-iner"
      //       style={{
      //         // maxHeight: "500px",
      //         // width: "700px",
      //         width: "600px",
      //         height: "300px",
      //         margin: "auto",
      //         // width: "100%",
      //         objectFit: "cover",
      //       }}
      //     >
      //       <div className="carousel-item active">
      //         <img
      //           src="banner1.png"
      //           loading="lazy"
      //           className="d-block w-100"
      //           alt="..."
      //           style={{
      //             objectFit: "cover",
      //             margin: "auto",
      //             width: "600px",
      //             height: "300px",
      //             // width: "100%",
      //             // maxHeight: "500px",
      //           }}
      //         />
      //       </div>
      //       <div className="carousel-item">
      //         <img
      //           src="banner2.png"
      //           loading="lazy"
      //           className="d-block w-100"
      //           alt="..."
      //           style={{
      //             objectFit: "cover",
      //             margin: "auto",
      //             width: "600px",
      //             height: "300px",
      //             // width: "100%",
      //             // maxHeight: "500px",
      //           }}
      //         />
      //       </div>
      //       <div className="carousel-item">
      //         <img
      //           src="banner3.png"
      //           loading="lazy"
      //           className="d-block w-100"
      //           alt="..."
      //           style={{
      //             objectFit: "cover",
      //             margin: "auto",
      //             width: "600px",
      //             height: "300px",
      //             // width: "100%",
      //             // maxHeight: "500px",
      //           }}
      //         />
      //       </div>
      //     </div>
      //     <button
      //       className="carousel-control-prev"
      //       type="button"
      //       data-bs-target="#carouselExampleIndicators"
      //       data-bs-slide="prev"
      //     >
      //       <span
      //         className="carousel-control-prev-icon"
      //         aria-hidden="true"
      //       ></span>
      //       <span className="visually-hidden">Previous</span>
      //     </button>
      //     <button
      //       className="carousel-control-next"
      //       type="button"
      //       data-bs-target="#carouselExampleIndicators"
      //       data-bs-slide="next"
      //     >
      //       <span
      //         className="carousel-control-next-icon"
      //         aria-hidden="true"
      //       ></span>
      //       <span className="visually-hidden">Next</span>
      //     </button>
      //   </div>
      //   <div
      //     id="banner2"
      //     className="carousel carousel-dark slide mb-3"
      //     data-bs-ride="carousel"
      //     data-bs-interval="5000"
      //     style={{
      //       width: "600px",
      //       height: "300px",
      //       marginRight: "5%",
      //       marginLeft: "5%",
      //     }}
      //   >
      //     <div
      //       className="carousel-inner m-l-r"
      //       id="carousel-iner"
      //       style={{
      //         // maxHeight: "500px",
      //         // width: "700px",
      //         width: "600px",
      //         height: "300px",
      //         margin: "auto",
      //         // width: "100%",
      //         objectFit: "cover",
      //       }}
      //     >
      //       <div className="carousel-item active">
      //         <img
      //           src="banner1.png"
      //           loading="lazy"
      //           className="d-block w-100"
      //           alt="..."
      //           style={{
      //             objectFit: "cover",
      //             margin: "auto",
      //             width: "600px",
      //             height: "300px",
      //             // width: "100%",
      //             // maxHeight: "500px",
      //           }}
      //         />
      //       </div>
      //       <div className="carousel-item">
      //         <img
      //           src="banner2.png"
      //           loading="lazy"
      //           className="d-block w-100"
      //           alt="..."
      //           style={{
      //             objectFit: "cover",
      //             margin: "auto",
      //             width: "600px",
      //             height: "300px",
      //             // width: "100%",
      //             // maxHeight: "500px",
      //           }}
      //         />
      //       </div>
      //       <div className="carousel-item">
      //         <img
      //           src="banner3.png"
      //           loading="lazy"
      //           className="d-block w-100"
      //           alt="..."
      //           style={{
      //             objectFit: "cover",
      //             margin: "auto",
      //             width: "600px",
      //             height: "300px",
      //             // width: "100%",
      //             // maxHeight: "500px",
      //           }}
      //         />
      //       </div>
      //     </div>
      //     <button
      //       className="carousel-control-prev"
      //       type="button"
      //       data-bs-target="#banner2"
      //       data-bs-slide="prev"
      //     >
      //       <span
      //         className="carousel-control-prev-icon"
      //         aria-hidden="true"
      //       ></span>
      //       <span className="visually-hidden">Previous</span>
      //     </button>
      //     <button
      //       className="carousel-control-next"
      //       type="button"
      //       data-bs-target="#banner2"
      //       data-bs-slide="next"
      //     >
      //       <span
      //         className="carousel-control-next-icon"
      //         aria-hidden="true"
      //       ></span>
      //       <span className="visually-hidden">Next</span>
      //     </button>
      //   </div>
      // </div>
    );
  }
}

export default Introdution;
