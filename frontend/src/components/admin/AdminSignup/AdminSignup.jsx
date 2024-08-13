import React, { useState } from 'react';
import './adminsignup.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import axios from 'axios';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [adminname, setadminName] = useState('');
  const [adminphone, setadminPhone] = useState('');
  const [adminusername, setadminUsername] = useState('');
  const [adminpassword, setadminPassword] = useState('');
  const [adminemail, setadminEmail] = useState('');

  const handleadminSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/adminsignup', {
        adminname,
        adminphone,
        adminusername,
        adminpassword,
        adminemail
      });
      if (response.status === 200) {
        navigate('/adminlogin');
      } else {
        console.error('Error registering user:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className='nav'>
        <Navbar colored/>
      </div>
      <div className='Box'>
      <h1>Namaste Catering Co.</h1>
      <form onSubmit={handleadminSignUp}>
        <div className="form-group">
          <div className="form-item">
            <input
              type="text"
              id="name"
              name="name"
              className="textbox"
              placeholder='Name'
              value={adminname}
              onChange={(e) => setadminName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="textbox"
              placeholder='Phone Number'
              value={adminphone}
              onChange={(e) => setadminPhone(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              id="username"
              name="username"
              className="textbox"
              placeholder='Enter User ID'
              value={adminusername}
              onChange={(e) => setadminUsername(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              id="password"
              name="password"
              className="textbox"
              placeholder='Password'
              value={adminpassword}
              onChange={(e) => setadminPassword(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="email"
              id="email"
              name="email"
              className="textbox"
              placeholder='Email ID'
              value={adminemail}
              onChange={(e) => setadminEmail(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="submit">
          Sign-Up
        </button>
      </form>
      </div>
    </div>
  );
};

export default AdminSignup;
