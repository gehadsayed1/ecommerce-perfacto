import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // استيراد useTranslation
import css from './dashbourd.module.css';
import { VIWEORDER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

export default function ShowOrder() {
  const { id } = useParams();
  const { t,i18n } = useTranslation(); // تهيئة useTranslation
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await Axios.get(`${VIWEORDER}?id=${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>{t("loading")}</p>;
console.log(order)
  return (
    <div className="container">
      <h1 className="mt-5">{t("orderDetails")}</h1>
      <div className="row d-flex align-items-center justify-content-between mt-5">
        {order && order.length > 0 ? (
          order.map(orderItem => (
            <div key={orderItem.id} className={`${css.order} col-12 col-md-12 col-lg-6`}>
              <p className={css.pra}>{t("productName")}: {i18n.language === 'en'?orderItem.NameProduct:orderItem.NameProduct_AR}</p>
              <p className={css.pra}>{t("size")}: {orderItem.size}</p>
              <p className={css.pra}>{t("unitPrice")}: EGP {orderItem.unitPrice}</p>
              <p className={css.pra}>{t("quantity")}: {orderItem.Quantity}</p>
              <p className={css.pra}>{t("totalPrice")}: EGP {orderItem.Totalprice}</p>
              <div className={`${css.pra} d-flex align-items-center justify-content-center`}>
                {t("color")}
                <div className={css.color} style={{ backgroundColor: orderItem.color }}></div>
              </div>
            </div>
          ))
        ) : (
          <p>{t("noOrdersFound")}</p>
        )}
      </div>
    </div>
  );
}
