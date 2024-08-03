import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // استيراد أنماط confirm-alert
import styles from './AddToCareButton.module.css';
import { useTranslation } from 'react-i18next';
import WithDirection from '../withDirection/withDirection';
const AddToCartButton = ({ product, detProtacut ,css }) => {
  const navigate = useNavigate();
  const { t} = useTranslation();
  const handleAddToCart = () => {
    // if (!detProtacut.size || !detProtacut.color) {
    //   confirmAlert({
    //     title: t('Missing Information'),
    //     message: t('Please select a size and color.'),
    //     buttons: [
    //       {
    //         label:t('OK'),
    //         onClick: () => {}
    //       }
    //     ]
    //   });
    //   return;
    // }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
   

    cartItems.push([product, detProtacut]);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/bullits');
  };

  return (
    <button className={`${styles.butt} btn btn-dark`} onClick={handleAddToCart}>
         {t('Add to Cart')}
      <FontAwesomeIcon icon={faShoppingCart} className={`${styles.cardCar} ${css.card}`} />
  
    </button>
  );
};

export default  WithDirection(AddToCartButton);
