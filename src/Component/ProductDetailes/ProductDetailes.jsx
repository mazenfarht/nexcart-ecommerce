import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../Utile/baseUrl";
import { useParams } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { nostify } from "../Utile/notify";

export default function ProductDetailes() {
  let { changeCart, addWishlist } = useContext(StoreContext);

  const [product, setProduct] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  let [loading, setLoadin] = useState(null);

  let { id } = useParams();

  const getProduct = async () => {
    let { data } = await axios.get(`${baseUrl}/products/${id}`);
    setProduct(data.data);
    setMainImage(data.data.imageCover);
  };

  async function addProduct(productId) {
    try {
      setLoadin(productId);
      let response = await changeCart(productId);
      console.log("Added to cart:", response);
      nostify("Product added to Cart", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadin(null);
    }
  }

  async function addProductToWishList(productId) {
    try {
      setLoadin(productId);
      let response = await addWishlist(productId);
      console.log("Added to wishlist:", response);
      nostify("Product added to WishList", "success");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoadin(null);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  // if (!product) return <p>Loading...</p>;

  return (
    <div className="container productDet">
      <div className="row my-3">
        {/* THUMBNAILS */}
        <div className="col-12 col-md-2 order-2 order-md-1">
          <div className="d-flex flex-row flex-md-column gap-2 overflow-auto">
            {product.images?.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
                className="img-thumbnail"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* MAIN IMAGE */}
        <div className="col-12 col-md-4 order-1 order-md-2 mb-3 mb-md-0">
          <img className="w-100" src={mainImage} alt="" />
        </div>

        {/* DETAILS */}
        <div className="col-12 col-md-6 order-3">
          <h3 className="my-3">{product.title}</h3>
          <p>{product.description}</p>

          <div className="d-flex justify-content-between align-items-center my-3 flex-wrap gap-2">
            {/* LEFT */}
            <div>
              <span className="badge bg-secondary">
                {product.subcategory?.[0]?.name}
              </span>

              <span className="d-block my-2">{product.price} EGP</span>
            </div>

            {/* RIGHT */}
            <div className="text-end">
              <i className="fa-solid fa-star rating-color"></i>
              <span className="ms-1">{product.ratingsAverage}</span>
            </div>
          </div>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            {/* Add To Cart */}
            <button
              onClick={() => addProduct(product._id)}
              className="custom-cart-btn"
              disabled={loading === product._id}
            >
              {loading === product._id ? (
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
              onClick={() => addProductToWishList(product._id)}
              className="custom-wishlist-btn"
              disabled={loading === product._id}
            >
              {loading === product._id ? (
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
    </div>
  );
}
