import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { DELETPRO, PROSGET } from "../../Api/Api";
import TableShow from "../../components/dashbord/Table";
import styles from "./dashbourd.module.css";

export default function Products() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [pages, setPages] = useState(1);
 
  

 



  useEffect(() => {
    Axios.get(`/${PROSGET}`)
      .then((data) => {
        setproducts(data.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []); 
  const header = [
    {
      key: "Imageproudect",
      name: "imags ",
    },
    {
      key: "ProductName",
      name: "Title",
    },
    {
      key: "Datacreate",
      name: "Datacreate",
    },
    {
      key: "QuantityProduct",
      name: "َQuantity ",
    },
    {
      key: "PriceProduct",
      name: "Price",
    },
    {
      key: "Pricesale",
      name: "Price Sale",
    },
  ];

  const handleDelete = async (id) => {
  
    try {
      
      const data = await Axios.delete(`/${DELETPRO}?id=${id}`);
      setproducts((prevImages) => prevImages.filter((item) => item.Id !== id));
    
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return (
    <div className="container">
      <div className={styles.contain_home}>
        <h1 className="mb-5 fw-bold">Produacts Page</h1>
        
        {isLoading ? (
          <p>Loading...</p> // عرض رسالة التحميل أو مؤشر التحميل
        ) : (
          <TableShow
            data={products}
            header={header}
            isLoading={isLoading}
            pages={pages}
            setPages={setPages}
            limet={5} // تغيير العدد إلى العدد المطلوب لكل صفحة
            delete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
