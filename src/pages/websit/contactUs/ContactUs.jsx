import React, { useState } from 'react';
import styls from "./Contact.module.css"
import { Form, Button } from 'react-bootstrap';
import { Axios } from '../../../Api/Axios';
import { CONTACTUS } from '../../../Api/Api';
import { useTranslation } from 'react-i18next';
import withDirection from '../../../components/websit/withDirection/withDirection';

const ContactUs = ({css}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    ContectName: '',
    Email: '',
    phone: '',
    About: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`/${CONTACTUS}`, formData);
      console.error( response.data);

      setFormData({
        ContectName: '',
        Email: '',
        phone: '',
        About: ''
      });

      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error(error);
      // Handle errors, show an error message, etc.
    }
  };

  return (
    <div className={styls.backround}>
      <div className={`container ${styls.contanar}`}>
        <Form onSubmit={handleSubmit} className={styls.form}>
          <h1>{t('title')}</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>{t('nameLabel')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('namePlaceholder')}
              name="ContectName"
              value={formData.ContectName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className={`mb-3`} controlId="formBasicEmail">
            <Form.Label>{t('emailLabel')}</Form.Label>
            <Form.Control
             
              type="email"
              placeholder={t('emailPlaceholder')}
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone" >
      <Form.Label>{t('phoneLabel')}</Form.Label>
      <Form.Control
       className={css.plath}
        type="tel"
        placeholder={t('phonePlaceholder')}
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAbout">
            <Form.Label>{t('aboutLabel')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t('aboutPlaceholder')}
              name="About"
              value={formData.About}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            {t('submitButton')}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default withDirection(ContactUs)