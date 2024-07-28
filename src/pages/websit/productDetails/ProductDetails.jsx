import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { PROGETID, GETIMGFORPRO } from "../../../Api/Api";
import Sekelcton from "../../../components/websit/sekelton/Sekelcton";
import style from "./productDetails.module.css";
import AddToCartButton from '../../../components/websit/AddToCartButton/AddToCartButton'; // استيراد المكون

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [productImg, setProductImg] = useState([]);
  const [detProtacut, setDetProtacut] = useState({
    size: '',
    color: '',
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const mainImageRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(null); // حالة لتخزين اللون المحدد

  function handelColor(e) {
    const colorId = e.target.id;
    setDetProtacut(prev => ({
      ...prev,
      color: colorId
    }));
    setSelectedColor(colorId); // تحديث اللون المحدد
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(`/${PROGETID}?id=${id}`);
        setProduct(response.data);
        setCurrentImage(response.data.Imageproudect);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching product details:", error);
      }
    };

    const fetchImgProduct = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(`/${GETIMGFORPRO}?id=${id}`);
        setProductImg(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
    fetchImgProduct();
  }, [id]);

  const handleImageClick = (imgName) => {
    setCurrentImage(imgName);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    mainImageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  // const handleChange = (e) => {
  //   setDetProtacut({ ...detProtacut, [e.target.name]: e.target.value });
  // };

  if (loading) return <Sekelcton />;

  const sizes = product?.SizeProduct?.split(",").map((size) => size.trim()) || [];

  return (
    <div className={style.contan}>
      {product ? (
        <div className="container">
          <div className={`${style.contaner} row`}>
            <div
              className={`${style.main_image_container} col-12 col-lg-6 col-md-12`}
              onMouseMove={handleMouseMove}
              onMouseLeave={() =>
                (mainImageRef.current.style.transformOrigin = "center center")
              }
            >
              <img
                src={`https://perfect.somee.com/${currentImage}`}
                alt={product.ProductName_ar}
                className={style.main_image}
                ref={mainImageRef}
              />
            </div>
            <div className={`col-12 col-lg-6 col-md-12 ${style.info}`}>
             
              <h3 className="mb-4">{product.ProductName}</h3>
              <h4 className="mb-2">
                {product.Pricesale ? (
                  <div className="d-flex align-items-center justify-content-start fs-5">
                    <del>EGP {product.PriceProduct}</del>
                    <p className="text-danger m-0">: EGP {product.Pricesale}</p>
                  </div>
                ) : (
                  <p className="fs-5">EGP: {product.PriceProduct}</p>
                )}
              </h4>
              <h5 className="mb-2">
                <div className=" mt-5">
                <strong >Product Description:<br /></strong>
                <div className={style.descr}>
                  {product.DescriptionProduct}
                </div>
                </div>
                
                <div className={style.color_size}>
                <div>
                  <label htmlFor="size-select">Choose Size</label>
                  <select
                    className={`form-select ${style.form_select}`}
                    name="SizeProduct"
                    value={detProtacut.size}  
                    onChange={(e) => setDetProtacut(prev => ({ ...prev, size: e.target.value }))}
                  >
                   
                    {sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                <label htmlFor="quantity-input">Choose Color</label>
                <div className={style.colorSpan}>
                  {productImg?.map((img, key) => (
                    <div key={key}>
                      <div
                        id={img.colorId}
                        onClick={handelColor}
                        style={{ backgroundColor: img.colorId }}
                        className={`${style.color} ${img.colorId === selectedColor ? style.active : ''}`}
                      ></div>
                    </div>
                  ))}
                </div>
                </div>
               
                </div>
               
              
              </h5>
            </div>
            <AddToCartButton product={product} detProtacut={detProtacut} />

          </div>
          <div className={style.imgdown}>
            {productImg?.map((img, key) => (
              <div key={key}>
                <div
                  className={`${style.thumbnail_wrapper} ${
                    currentImage === img.ImageName ? style.active : ""
                  }`}
                  onClick={() => handleImageClick(img.ImageName)}
                >
                  <img
                    src={`https://perfect.somee.com/${img.ImageName}`}
                    alt="proimg"
                    className={style.thumbnail}
                  />
                </div>
                <div
                  style={{ backgroundColor: img.colorId }}
                  className={style.color}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
