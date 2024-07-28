import React, { useEffect, useState } from 'react';
import style from './invoice.module.css'; 

import { Axios } from '../../../Api/Axios';
import { INVOICEPOST } from '../../../Api/Api';

const Invoice = ({ onNavigateToInvoice, totalCartPrice }) => {
  const [onePro, setonePro] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartDataForInvoice')) || [];
    const newProducts = cartItems.map((product) => {
      const total = product[0].PriceProduct * product.quantity;
      return {
        NameProduct: product[0].ProductName,
        ProductId: product[0].Id,
        Billheader: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        unitPrice: product[0].PriceProduct,
        Quantity: product.quantity,
        Totalprice: isNaN(total) ? product[0].PriceProduct : total,
        color: product[1].color,
        size: product[1].size,
      };
    });
    setonePro(newProducts);
  }, []);

  const currentDate = new Date();
  const currentDateTime = currentDate.toLocaleString();

  const [formData, setFormData] = useState({
    BillId: '3fa85f64-5717-4562-b3fc-2c963f66af99',
    CustomerName: '',
    CustomerPhone: '',
    CustomerEmail: '',
    CustomerAdderes: '',
    stautaBill: 0,
    BillData: currentDateTime,
    totalprice: totalCartPrice,
    BillDetiles: []
  });

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      BillDetiles: onePro
    }));
  }, [onePro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setShowErrorMessage(false); // Hide error message when the user starts typing
  };

  useEffect(() => {
    const isValid =
      formData.CustomerName &&
      formData.CustomerPhone &&
      formData.CustomerEmail &&
      formData.CustomerAdderes;
    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid) {
      setShowErrorMessage(true);
      return;
    }
    
    const form = new FormData();
    form.append('BillId', formData.BillId);
    form.append('CustomerName', formData.CustomerName);
    form.append('CustomerPhone', formData.CustomerPhone);
    form.append('CustomerEmail', formData.CustomerEmail);
    form.append('CustomerAdderes', formData.CustomerAdderes);
    form.append('stautaBill', formData.stautaBill);
    form.append('BillData', formData.BillData);
    form.append('totalprice', formData.totalprice);
    
    // Append each BillDetiles item individually
    formData.BillDetiles.forEach((product, index) => {
      form.append(`BillDetiles[${index}].NameProduct`, product.NameProduct);
      form.append(`BillDetiles[${index}].Totalprice`, product.Totalprice);
      form.append(`BillDetiles[${index}].color`, product.color);
      form.append(`BillDetiles[${index}].size`, product.size);
      form.append(`BillDetiles[${index}].ProductId`, product.ProductId);
      form.append(`BillDetiles[${index}].unitPrice`, product.unitPrice);
      form.append(`BillDetiles[${index}].Quantity`, product.Quantity);
      form.append(`BillDetiles[${index}].Billheader`, product.Billheader);
    });
    
    try {
      const response = await Axios.post(`/${INVOICEPOST}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      handleSendToInvoice(); 
    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  const handleSendToInvoice = () => {
    onNavigateToInvoice();
  };

  return (
    <div className={style.invoice_container}>
      <h1>Enter your data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          your Name:
          <input type="text" placeholder='Enter your Name...' name="CustomerName" value={formData.CustomerName} onChange={handleChange} />
        </label>
        <label>
          Your Phone:
          <input type="text" placeholder='Enter your Phone...' name="CustomerPhone" value={formData.CustomerPhone} onChange={handleChange} />
        </label>
        <label>
        Your Email:
          <input type="email" placeholder='Enter your Email...' name="CustomerEmail" value={formData.CustomerEmail} onChange={handleChange} />
        </label>
        <label>
        Your Adderes:
          <input type="text" placeholder='Governorate / city / district' name="CustomerAdderes" value={formData.CustomerAdderes} onChange={handleChange} />
        </label>
        <h5 className='text-danger'>
        Order Total: {formData.totalprice}
        </h5>
        
        <button type="submit" disabled={!isFormValid}>
    Submit your request
    </button>
    {showErrorMessage && <p>Please fill out all fields.</p>}
  </form>
</div>
  );
};

export default Invoice;
