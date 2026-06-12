import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import {
  notifySuccess,
  notifyInfo,
  notifyError,
} from "../../Component/Utile/notify";
import "./ProductStyle.css";
export default function Product({ product }) {
  let { changeCart, addWishlist, userToken } = useContext(StoreContext);
  let [loadingId, setLoadinId] = useState(null);
  let [visibleCount, setVisibleCount] = useState(8);

  async function addProduct(productId) {
    if (!userToken) {
      notifyError("You Should To Login To add Product");
    } else {
      try {
        setLoadinId(productId);
        let response = await changeCart(productId);
        console.log("Added to cart:", response);
        notifySuccess("Product Added To Cart");
      } catch (error) {
        console.log(error);
      } finally {
        setLoadinId(null);
      }
    }
  }

  async function addProductToWishList(productId) {
    if (!userToken) {
      notifyError("You Should To Login To add Product");
    } else {
      try {
        setLoadinId(productId);
        let response = await addWishlist(productId);
        console.log("Added to wishlist:", response);
        notifyInfo("Added To Wishlist");
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoadinId(null);
      }
    }
  }
  return (
    <>
      {product.slice(0, visibleCount).map((item) => {
        return (
          <div className="col-md-4 col-lg-3 mb-4" key={item._id}>
            <div className="modern-product-card h-100">
              <Link
                to={"/product-detailes/" + item._id}
                className="text-decoration-none"
              >
                {/* IMAGE */}
                <div className="modern-product-img-wrapper">
                  <img
                    src={item.imageCover}
                    className="modern-product-img"
                    alt=""
                  />
                </div>

                {/* CONTENT */}
                <div className="p-3">
                  <span className="modern-category">{item.category.name}</span>

                  <h6 className="modern-title mt-3">
                    {item.title.split(" ").slice(0, 3).join(" ")}
                  </h6>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="modern-price">{item.price} EGP</span>

                    <div className="modern-rating">
                      <i className="fa-solid fa-star"></i>
                      <span>{item.ratingsAverage}</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* BUTTONS */}
              <div className="p-3 pt-0 d-flex flex-column gap-2">
                <button
                  onClick={() => addProduct(item._id)}
                  className="modern-cart-btn"
                  disabled={loadingId === item._id}
                >
                  {loadingId === item._id ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i>
                      Adding...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping me-2"></i>
                      Add To Cart
                    </>
                  )}
                </button>

                <button
                  onClick={() => addProductToWishList(item._id)}
                  className="modern-wishlist-btn"
                  disabled={loadingId === item._id}
                >
                  <>
                    <i className="fa-regular fa-heart me-2"></i>
                    Wishlist
                  </>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* LOAD MORE */}
      <div className="text-center mt-4 mb-5">
        {visibleCount < product.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="modern-load-btn"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
