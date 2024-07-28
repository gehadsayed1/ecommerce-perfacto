import React, { useState, useEffect } from 'react';
import style from './OrderSentPage.module.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCircleCheck, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import copletOrder from '../imgWed/order_completed_icon_176856 (1).webp'
const OrderSentPage = () => {
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    calculateTotalCartPrice(cartItems);
  }, []);


  const calculateTotalCartPrice = (cartItems) => {
    let total = 0;
    cartItems.forEach(item => {
      const price = item[0].Pricesale ? item[0].Pricesale : item[0].PriceProduct;
      const quantity = item.quantity || 1; // default quantity to 1 if not selected
      total += price * quantity;
    });
    setTotalCartPrice(total);
  };
  return (
    <div>
      
      <div className=" container">
        <div className={style.car}>
        <FontAwesomeIcon icon={faTruckMoving} />
        <p className=' fw-bold fs-5 m-0 ms-1'>Your order is on the way</p>
        
        </div>
        <div className=' row'>
       
        <div className='col-12 col-md-12 col-lg-6 '>
        {cart.length > 0 ? (
          
          cart.map((product, index) => (
            <div key={index} >
              <div className={` ${style.card}`}>
                <div className={style.conImg}>
                <img className=' w-100' src={`https://perfect.somee.com/${product[0].Imageproudect}`} alt={product.ProductName_ar}  />
                </div>
                <div >
                 
                  {product[0].Pricesale ? (
                    <div className="d-flex align-items-center justify-content-start fs-5 ">
                      <del>EGP{product[0].PriceProduct}</del>
                      <p className="text-danger ">: EGP {product[0].Pricesale}</p>
                    </div>
                  ) : (
                    <p className="fs-5 fw-bold m-0">EGP: {product[0].PriceProduct}</p>
                  )}
                  <h5 className='text-black-50'>Size:{product[1].size}</h5>
                  <h5 className='text-black-50'>Total: EGP {product.Totalprice || (product[0].Pricesale ? product[0].Pricesale : product[0].PriceProduct)}</h5>
                  <div className='d-flex align-items-center justify-content-start '>
                    <p>Color:</p>
                    <div className={style.color_span} style={{ backgroundColor: product[1].color }}></div>
                  </div>
                </div>
              </div>
           
            </div>
          ))
        ) : (
          <h3>Your cart is empty.</h3>
        )}
            <div className={style.button_tetel}>
         
         <div className='d-flex justify-content-center align-items-center border  '>
           <h5 className='text-black-50'>Order Total:</h5>
           <h5 className=' text-success'>EGP {totalCartPrice}</h5>
         </div>
       </div>
        </div>

        <div className='col-12 col-md-12 col-lg-6 '>
          <div className='d-flex justify-content-center align-items-center mt-2'>
          <h5 className=' m-0 me-1'>Order is Done</h5>
          <FontAwesomeIcon icon={faCircleCheck} className=' fs-4 text-success' />
          </div>
          <h6 className=' mt-1 text-black-50'>“Your order has been confirmed successfully! We will contact you within 24 hours.”</h6>
          <img src={copletOrder} alt="" />
          <h6 className='text-black-50 mb-2'>We are always striving to improve our services. We would like to hear your opinion about your experience with us here = <a href="/contactus">Here</a></h6>
        
        </div>
        
        
        </div>
      </div>
    </div>
  );
  
};

export default  OrderSentPage
