import React, { useEffect, useState } from 'react';
import { Axios } from "../../../Api/Axios";
import { GETGROUB} from "../../../Api/Api";
import { useParams } from 'react-router-dom';
import ProductShow from '../../../components/websit/productShow/ProductShow';
import { useTranslation } from 'react-i18next';

const GroubCategroy = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const {t} = useTranslation()
  useEffect(() => {
    Axios.get(`/${GETGROUB}?id=${id}`)
     .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
     .catch((err) => {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      });
  }, [id]);

 

  return (
    <div>
      {product.length === 0 ? 
        <h2 className=" mt-5">{t('There are no products yet')}</h2> : <ProductShow data={product} loading={isLoading}/>}
     
    </div>
  );
};

export default GroubCategroy;