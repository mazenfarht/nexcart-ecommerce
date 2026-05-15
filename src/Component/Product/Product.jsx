import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { nostify } from "../Utile/notify";

export default function Product({ product }) {
  let { changeCart, addWishlist } = useContext(StoreContext);
  let [loadingId, setLoadinId] = useState(null);

  async function addProduct(productId) {
    try {
      setLoadinId(productId);
      let response = await changeCart(productId);
      console.log("Added to cart:", response);
      nostify("Product added to Cart", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadinId(null);
    }
  }

  async function addProductToWishList(productId) {
    try {
      setLoadinId(productId);
      let response = await addWishlist(productId);
      console.log("Added to wishlist:", response);
      nostify("Product added to WishList", "success");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoadinId(null);
    }
  }
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

              <button
                onClick={() => addProduct(item._id)}
                className="btn bg-main  text-white w-50 my-3  "
                disabled={loadingId === item._id}
              >
                {loadingId === item._id ? (
                  <>
                    <i className="fa fa-spinner fa-spin me-2"></i>
                    Adding...
                  </>
                ) : (
                  "Add To Cart"
                )}
              </button>
              <button
                onClick={() => addProductToWishList(item._id)}
                className="btn bg-main  text-white w-50 my-3  "
                disabled={loadingId === item._id}
              >
                {loadingId === item._id ? (
                  <>
                    <i className="fa fa-spinner fa-spin me-2"></i>
                    Adding...
                  </>
                ) : (
                  "Add To WishList"
                )}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
