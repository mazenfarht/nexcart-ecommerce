import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { notifySuccess, notifyError } from "../../Component/Utile/notify";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./WishlistStyle.css";

export default function WishList() {
  let { getWishlist, deleteWishList, changeCart } = useContext(StoreContext);
  let [wishList, setwishList] = useState([]);
  let [loading, setLoading] = useState(false);

  async function getWishListItems() {
    try {
      setLoading(true);
      let response = await getWishlist();
      console.log(response);
      setwishList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteWishListpro(productId) {
    try {
      await deleteWishList(productId);
      setwishList((prev) => prev.filter((item) => item._id !== productId));
      notifyError("Product Deleted");
    } catch (error) {
      console.log(error);
    }
  }

  async function addProduct(productId) {
    try {
      setLoading(productId);
      let response = await changeCart(productId);
      console.log("Added to cart:", response);
      notifySuccess("Product Added To Cart");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  }

  useEffect(() => {
    getWishListItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!loading && wishList.length === 0) {
    return (
      <div className="container py-5 cart">
        <div
          className="p-4 rounded-4 text-center"
          style={{
            background: "#0f172a",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            color: "#e2e8f0",
          }}
        >
          <h3>WishList</h3>

          <div className="my-5">
            <i
              className="fa-solid fa-heart"
              style={{ fontSize: "60px", color: "#38bdf8" }}
            ></i>

            <h4 className="mt-3">Your WishList is empty </h4>
            <p style={{ color: "#94a3b8" }}>
              Add some products to see them here
            </p>

            <Link to="/products" className="btn bg-main text-white mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container py-5 cart">
        <div
          className="p-4 rounded-4"
          style={{
            background: "#0f172a",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 style={{ color: "#e2e8f0" }}>My Wishlist</h3>

            <span
              style={{
                background: "#1e293b",
                color: "#38bdf8",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "14px",
              }}
            >
              Items: {wishList.length}
            </span>
          </div>

          {/* Items */}
          {wishList.map((item) => {
            return (
              <div
                key={item._id}
                className="cart-item d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 p-3 rounded-4"
              >
                {/* Left */}
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <Link to={"/product-detailes/" + item._id}>
                    <img src={item.imageCover} alt="" className="cart-img" />
                  </Link>

                  <div>
                    <h6>{item.title}</h6>

                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                      {item.price} EGP
                    </span>

                    {/* Delete */}
                    <div className="mt-2">
                      <button
                        className="cart-delete-btn bob-hover"
                        onClick={() => deleteWishListpro(item._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="mt-3 mt-md-0">
                  <button
                    onClick={() => addProduct(item._id)}
                    className="btn bg-main text-white px-4 rounded-3"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
