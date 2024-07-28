import React, { useState } from 'react';
import styls from "./Contact.module.css"
import { Form, Button } from 'react-bootstrap';
import { Axios } from '../../../Api/Axios';
import { CONTACTUS } from '../../../Api/Api';

export default function ContactUs(){
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
      console.log('Contact form submitted successfully:', response.data);
      
      setFormData({
        ContectName: '',
        Email: '',
        phone: '',
        About: ''
      });
      
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle errors, show an error message, etc.
    }
  };

  return (
    <div className={styls.backround}>
      <div className={` container ${styls.contanar}`}>
        <Form onSubmit={handleSubmit} className={styls.form} >
          <h1>Contact Us</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="ContectName"
              value={formData.ContectName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAbout">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tell us about your inquiry..."
              name="About"
              value={formData.About}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
