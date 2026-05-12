import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <>
      {product.map((item) => {
        return (
          <div className="col-md-4 col-lg-3" key={item._id}>
            <div className="product">
              <Link to={"/product-detailes/" + item._id}>
                <img src={item.imageCover} className=" product-img" alt="" />
                <h6 className="my-2 text-center">{item.category.name}</h6>
                <p className="fw-bolder text-center">
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </p>
              </Link>
              <div className="d-flex justify-content-center  align-items-center my-3">
                <span className="me-5">{item.price} EGP</span>
                <div>
                  <i class="fa-solid fa-star rating-color"></i>
                  <span>{item.ratingsAverage}</span>
                </div>
              </div>
              <button className="btn bg-main  text-white w-50 my-3  ">
                Add To Cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
