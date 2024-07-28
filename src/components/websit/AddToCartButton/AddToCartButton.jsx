import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // استيراد أنماط confirm-alert
import styles from './AddToCareButton.module.css';

const AddToCartButton = ({ product, detProtacut }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!detProtacut.size || !detProtacut.color) {
      confirmAlert({
        title: 'Missing Information',
        message: 'Please select a size and color.',
        buttons: [
          {
            label: 'OK',
            onClick: () => {}
          }
        ]
      });
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
   

    cartItems.push([product, detProtacut]);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/bullits');
  };

  return (
    <button className={`${styles.butt} btn btn-dark`} onClick={handleAddToCart}>
      <FontAwesomeIcon icon={faShoppingCart} className={styles.cardCar} />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
