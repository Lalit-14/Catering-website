import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  useEffect(() => {
    document.body.classList.add('login');
    return () => {
      document.body.classList.remove('login');
    };
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', true);
        navigate('/booking');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in');
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
      <form className='Sign-in' onSubmit={handleSignIn}>
        <div className='user'>
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            id="email"
            className='textbox'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type="password"
            id="password"
            className='textbox'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className='Sign-in'>
            <button id="Sign in" className='button' type='submit'>Login</button>
            <p>Don’t have an account? You can </p>
            <a href='/signup'><p> sign up here</p></a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
