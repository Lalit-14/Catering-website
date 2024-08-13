import React, { useState, useEffect } from 'react';
import './adminlogin.css';
import Admin from '../caterers/Admin.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  useEffect(() => {
    document.body.classList.add('login');
    return () => {
      document.body.classList.remove('login');
    };
  }, []);
  const navigate = useNavigate();
  const [adminemail, setadminemail] = useState('');
  const [adminpassword, setadminpassword] = useState('');
  const [adminerror, setadminerror] = useState(null);

  const handleadminSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/adminlogin', {
        adminemail,
        adminpassword,
      });
      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', true);
        navigate('/admin');
      } else {
        setAdminError('Invalid email or password');
      }
    } catch (error) {
      setAdminError('Error logging in');
    }
  };

  return (
    <div className='container'>
        <div className='left'>
            <div className='logo'>
                <a href='/'><img src='./assets/logo.png' alt='logo' /></a>
            </div>
            <div className='welcome'>
                <p>Namaste</p>
                <p>Catering Co.</p>
            </div>
            <p1 className='tagline'></p1>
        </div>
      <form className='Sign-in' onSubmit={handleadminSignIn}>
        <div className='user'>
          <label htmlFor='adminemail'>Email</label>
          <input
            type="email"
            id="email"
            className='textbox'
            value={adminemail}
            onChange={(e) => setadminemail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type="password"
            id="password"
            className='textbox'
            value={adminpassword}
            onChange={(e) => setadminpassword(e.target.value)}
          />
          {adminerror && <div style={{ color: 'red' }}>{error}</div>}
          <div className='Sign-in'>
            <button id="Sign in" className='button' type='submit'>Login</button>
            <p>Don’t have an account? You can </p>
            <a href='/adminsignup'><p> sign up here</p></a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
