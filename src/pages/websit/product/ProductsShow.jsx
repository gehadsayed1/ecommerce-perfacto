// Products.jsx
import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { PROSGET } from "../../../Api/Api";
import ProductShow from "../../../components/websit/productShow/ProductShow";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {t}= useTranslation()

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
      {products.length === 0 ? (
        <h2 className=" mt-5">{t("There are no products yet")}</h2>
      ) : (
        <ProductShow data={products} loading={loading} />
      )}
    </>
  );
};

export default Products;
