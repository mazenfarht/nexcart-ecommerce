import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../Utile/baseUrl";
import { StoreContext } from "../Context/StoreContext";
import { notifySuccess, notifyError } from "../../Component/Utile/notify";
export default function CategoriePage() {
  let { id } = useParams();
  let [products, setProducts] = useState([]);
  let [loadingId, setLoadingId] = useState(null);
  let { changeCart, addWishlist, userToken } = useContext(StoreContext);

  async function addProduct(productId) {
    if (!userToken) {
      notifyError("You Should To Login To add Product");
    } else {
      try {
        setLoadingId(productId);
        let response = await changeCart(productId);
        console.log("Added to cart:", response);
        notifySuccess("Product added successfully");
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingId(null);
      }
    }
  }

  const getProductsByCategory = async () => {
    try {
      let { data } = await axios.get(`${baseUrl}/products?category[in]=${id}`);

      setProducts(data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  async function addProductToWishList(productId) {
    if (!userToken) {
      notifyError("You Should To Login To add Product");
    } else {
      try {
        setLoadingId(productId);
        let response = await addWishlist(productId);
        console.log("Added to wishlist:", response);
        notifySuccess("Product added to WishList");
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoadingId(null);
      }
    }
  }

  useEffect(() => {
    if (id) getProductsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <h2 className="fw-bold text-light text-capitalize">
          {products?.[0]?.category?.name || "Category Products"}
        </h2>

        <span className="modern-category-badge">
          {products.length} Products
        </span>
      </div>

      <div className="row">
        {products.length === 0 ? (
          <div className="text-center mt-5">
            <div className="empty-category-box">
              <i className="fa-solid fa-box-open mb-3"></i>
              <h4>No products in this category</h4>
            </div>
          </div>
        ) : (
          products.map((item) => (
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
                      alt={item.title}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-3">
                    <span className="modern-category">
                      {item.category?.name}
                    </span>

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

                {/* BUTTON */}
                {/* BUTTONS */}
                <div className="p-3 pt-0 d-flex flex-column gap-2">
                  {/* Add To Cart */}
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

                  {/* Wishlist */}
                  <button
                    onClick={() => addProductToWishList(item._id)}
                    className="modern-wishlist-btn"
                    disabled={loadingId === item._id}
                  >
                    {loadingId === item._id ? (
                      <>
                        <i className="fa fa-spinner fa-spin me-2"></i>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-heart me-2"></i>
                        Wishlist
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
