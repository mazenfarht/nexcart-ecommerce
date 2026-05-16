import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import Loading from "../Loading/Loading";
import { notifyWarning } from "../../Component/Utile/notify";
import { Link } from "react-router-dom";
import "./CartStyle.css";
export default function Cart() {
  let { getCart, deleteProduct, updateQty } = useContext(StoreContext);
  let [cart, setCart] = useState([]);
  let [priceTotal, setPriceTotal] = useState([]);
  let [loading, setLoading] = useState(false);

  async function cartProductDetailes() {
    try {
      setLoading(true);
      let response = await getCart();
      console.log(response);
      setCart(response.data.products);
      setPriceTotal(response.data.totalCartPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProducts(productId) {
    try {
      let response = await deleteProduct(productId);
      setCart(response.data.products);
      setPriceTotal(response.data.totalCartPrice);
      notifyWarning("Product Removed");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductQty(productId, count) {
    try {
      let response = await updateQty(productId, count);
      setCart(response.data.products);
      setPriceTotal(response.data.totalCartPrice);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    cartProductDetailes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!loading && cart.length === 0) {
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
          <h3>Shopping Cart</h3>

          <div className="my-5">
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: "60px", color: "#38bdf8" }}
            ></i>

            <h4 className="mt-3">Your cart is empty </h4>
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
            <h3 style={{ color: "#e2e8f0" }}>Shopping Cart</h3>

            <span
              style={{
                background: "#1e293b",
                color: "#38bdf8",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "14px",
              }}
            >
              Total: {priceTotal} EGP
            </span>
          </div>

          {/* Items */}
          {cart.map((item) => {
            return (
              <div
                key={item._id}
                className="cart-item d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 p-3 rounded-4"
              >
                {/* Left */}
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <img
                    src={item.product.imageCover}
                    alt=""
                    className="cart-img"
                  />

                  <div>
                    <h6>{item.product.title}</h6>

                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                      {item.price} EGP
                    </span>

                    {/* 👇 delete under price */}
                    <div className="mt-2">
                      <button
                        className="cart-delete-btn bob-hover"
                        onClick={() => deleteProducts(item.product._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="cart-qty mt-3 mt-md-0">
                  <button
                    onClick={() =>
                      updateProductQty(item.product._id, item.count + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() =>
                      updateProductQty(item.product._id, item.count - 1)
                    }
                    className="qty-btn"
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
          <Link className="btn bg-main text-white" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
