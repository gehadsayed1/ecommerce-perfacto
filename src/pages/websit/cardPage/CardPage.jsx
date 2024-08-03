import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import style from './cardapge.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CardPage = ({ onNavigateToInvoice }) => {
  const { t ,i18n } = useTranslation();
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    calculateTotalCartPrice(cartItems);
  }, []);

  const handleRemoveFromCart = (productToRemove) => {
    confirmAlert({
      title: t('confirmDeletionTitle'),
      message: t('confirmDeletionMessage'),
      buttons: [
        {
          label: t('yes'),
          onClick: () => {
            const updatedCart = cart.filter(product => product !== productToRemove);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            calculateTotalCartPrice(updatedCart);
          }
        },
        {
          label: t('no'),
          onClick: () => {}
        }
      ]
    });
  };

  const handleChangeQuantity = (product, quantity) => {
    const updatedCart = cart.map(item => {
      if (item === product) {
        const price = item[0].Pricesale ? item[0].Pricesale : item[0].PriceProduct;
        const total = price * quantity;
        return {
          ...item,
          quantity: quantity,
          Totalprice: total
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalCartPrice(updatedCart);
  };

  const handleClearCart = () => {
    confirmAlert({
      title: t('confirmClearCartTitle'),
      message: t('confirmClearCartMessage'),
      buttons: [
        {
          label: t('yes'),
          onClick: () => {
            setCart([]);
            localStorage.setItem('cart', JSON.stringify([]));
            setTotalCartPrice(0);
          }
        },
        {
          label: t('no'),
          onClick: () => {}
        }
      ]
    });
  };

  const calculateTotalCartPrice = (cartItems) => {
    let total = 0;
    cartItems.forEach(item => {
      if (item[0]) { 
        const price = item[0].Pricesale ? item[0].Pricesale : item[0].PriceProduct;
        const quantity = item.quantity || 1; 
        total += price * quantity;
      }
    });
    setTotalCartPrice(total);
  };

  const handleSendToInvoice = () => {
    localStorage.setItem('cartDataForInvoice', JSON.stringify(cart));
    onNavigateToInvoice(totalCartPrice);
  };

  return (
    <div>
      <div className={style.cartContainer}>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div key={index} className={style.cartItem}>
              <div className={style.cartItem2}>
                {product[0] && (
                  <img src={`https://perfect.somee.com/${product[0].Imageproudect}`} alt={product.ProductNamex} className={style.cartImage} />
                )}
                <div className={style.cartDetails}>
                  {product[0] && (
                    <>
                      <h2 className='text-black-50'>{i18n.language=== 'en'?product[0].ProductName:product[0].ProductName_ar}</h2>
                      {product[0].Pricesale ? (
                        <div className="d-flex align-items-center justify-content-start fs-5">
                          <del>EGP {product[0].PriceProduct}</del>
                          <p className="text-danger m-0">: EGP {product[0].Pricesale}</p>
                        </div>
                      ) : (
                        <p className="fs-5">EGP: {product[0].PriceProduct}</p>
                      )}
                      {/* <h5 className='text-black-50'>{t('size')}: {product[1].size}</h5> */}
                      <h5 className='text-black-50'>{t('total')}: EGP {product.Totalprice || (product[0].Pricesale ? product[0].Pricesale : product[0].PriceProduct)}</h5>
                      <div>
                        <p>{t('color')}:</p>
                        {/* <div className={style.color_span} style={{ backgroundColor: product[1].color }}></div> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-around flex-wrap gap-4 mt-5'>
                <div>
                  <label>{t('quantity')}</label>
                  <select
                    className={`form-select ${style.select_quntity}`}
                    value={product.quantity || 1}
                    onChange={(e) => handleChangeQuantity(product, parseInt(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <FontAwesomeIcon className='text-danger fs-4' icon={faTrash} cursor={'pointer'} onClick={() => handleRemoveFromCart(product)} />
              </div>
            </div>
          ))
        ) : (
          <h3>{t('cartEmpty')}</h3>
        )}
        
        <div className={style.button_tetel}>
          <div className='d-flex justify-content-between align-items-center border p-2 g-3'>
            <h5 className='text-black-50'>{t('orderTotal')}:</h5>
            <h5>EGP {totalCartPrice}</h5>
          </div>
          {cart.length > 0 && (
            <div>
              <button className="btn btn-dark me-2" onClick={handleSendToInvoice}>{t('apply')}</button>
              <button className="btn btn-danger" onClick={handleClearCart}>{t('deleteAll')}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPage;
