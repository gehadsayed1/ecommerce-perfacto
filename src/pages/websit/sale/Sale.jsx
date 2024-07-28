import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios"
import { SALE } from "../../../Api/Api"
import ProductShow from "../../../components/websit/productShow/ProductShow"
import imgSale from '../imgWed/sale-on-broken-ice-photo.jpg'

export default function Sale() {
const [sale ,setSale] = useState([]);
const [isLoading, setisLoading] = useState(true);


console.log(sale)
    useEffect(() => {
        Axios.get(`/${SALE}`)
          .then((data) => {
            setSale(data.data);
            setisLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setisLoading(false);
          });
      }, []);

      
  return (
    <>
       <img src={imgSale} alt="" className=" w-100" />
    <div className=" container">
 
      <ProductShow data={sale} loading={isLoading}/>
    </div>
  
    </>

  )
}
