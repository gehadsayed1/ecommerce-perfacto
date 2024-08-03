import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { DELETPRO, PROSGET } from "../../Api/Api";
import TableShow from "../../components/dashbord/Table";
import styles from "./dashbourd.module.css";
import { useTranslation } from 'react-i18next'; // استيراد useTranslation

export default function Products() {
  const { t ,i18n} = useTranslation(); // تهيئة useTranslation
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
        console.error(err);
        setisLoading(false);
      });
  }, []);

  const header = [
    {
      key: "Imageproudect",
      name: t("image"), // استخدام الترجمة
    },
    {
      key: i18n.language === 'en'? "ProductName": "ProductName_ar",
      name: t("title"), // استخدام الترجمة
    },
    {
      key: "Datacreate",
      name: t("dateCreate"), // استخدام الترجمة
    },
    {
      key: "QuantityProduct",
      name: t("quantity"), // استخدام الترجمة
    },
    {
      key: "PriceProduct",
      name: t("price"), // استخدام الترجمة
    },
    {
      key: "Pricesale",
      name: t("priceSale"), // استخدام الترجمة
    },
  ];

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/${DELETPRO}?id=${id}`);
      setproducts((prevImages) => prevImages.filter((item) => item.Id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return (
    <div className="container">
      <div className={styles.contain_home}>
        <h1 className="mb-5 fw-bold">{t("productsPage")}</h1>
        
        {isLoading ? (
          <p>{t("loading")}</p> // استخدام الترجمة
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
