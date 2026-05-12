import React, { useEffect, useState } from "react";
import { baseUrl } from "../Utile/baseUrl.js";
import Product from "../Product/Product.jsx";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    let { data } = await axios.get(`${baseUrl}/products`);
    // console.log(data.data);
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">{<Product product={products} />}</div>
      </div>
    </>
  );
}
