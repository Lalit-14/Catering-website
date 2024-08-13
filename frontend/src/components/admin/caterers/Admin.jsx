import React, { useState } from 'react';
import axios from 'axios';
import "./admin.css";
import Navbar from '../../navbar/Navbar';

const Admin = () => {
  const [formData, setFormData] = useState({
    area: '',
    name: '',
    address: '',
    contact: '',
    image: '',
    logo: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8000/caterers', formData);
      setFormData({
        area: '',
        name: '',
        address: '',
        contact: '',
        image: '',
        logo: ''
      });
      setSuccessMessage('Caterer Successfully Added');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating caterer:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='outer_container'>
      <div className='nav'>
        <Navbar colored />
      </div>
      <div className='admin_container'>
        <h1>Add Caterer</h1>
        <form onSubmit={handleFormSubmit} className='form_container'>
          <input type='text' name='area' placeholder='Area' value={formData.area} onChange={handleInputChange} required />
          <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleInputChange} required />
          <input type='text' name='address' placeholder='Address' value={formData.address} onChange={handleInputChange} required />
          <input type='text' name='contact' placeholder='Contact' value={formData.contact} onChange={handleInputChange} required />
          <input type='text' name='image' placeholder='Image URL' value={formData.image} onChange={handleInputChange} required />
          <input type='text' name='logo' placeholder='Logo URL' value={formData.logo} onChange={handleInputChange} required />
          <button type='submit'>Add Caterer</button>
        </form>
        {successMessage && <p className='success_message'>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Admin;
