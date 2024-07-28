import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from './dashbourd.module.css'

import { VIWEORDER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

export default function ShowOrder() {
  const { id } = useParams();
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

  if (loading) return <p>Loading...</p>;

  return (
        <div className=" container">
      <h1 className=" mt-5">Order Details</h1>
      <div className="row  d-flex align-items-center justify-content-between mt-5 ">
      {order.length > 0 ? (
        order.map(order => (
        

          <div key={order.id} className={`${css.order} col-12 col-md-12 col-lg-6 `}>

            <p className={css.pra}>Product Name: {order.NameProduct}</p>
            <p className={css.pra}>size: {order.size}</p>
            <p className={css.pra}> unitPrice: EGP {order.unitPrice}</p>
            <p className={css.pra}>Quantity: {order.Quantity}</p>
            <p className={css.pra}>Totalprice:EGP  {order.Totalprice}</p>
            <div className={ `${css.pra} d-flex align-items-center justify-content-center`}>Color
            <div className={css.color}  style={{ backgroundColor:order.color}}></div>
            </div>
          </div>
       
        ))
      ) : (
        <p>No orders found</p>
      )}
      </div>
    </div>
  );
}