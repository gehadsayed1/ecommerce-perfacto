// Products.jsx
import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { PROSGET } from "../../../Api/Api";
import ProductShow from "../../../components/websit/productShow/ProductShow";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`/${PROSGET}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

 


  return (
   <>
<ProductShow data={products} loading={loading}/>
   </>
  );
};

export default Products;
