import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        name,
        phone,
        username,
        password,
        email
      });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Error registering user:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className='Box'>
      <h1>Namaste Catering Co.</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <div className="form-item">
            <input
              type="text"
              id="name"
              name="name"
              className="textbox"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="textbox"
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              id="username"
              name="username"
              className="textbox"
              placeholder='Enter User ID'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              id="password"
              name="password"
              className="textbox"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-item">
            <input
              type="email"
              id="email"
              name="email"
              className="textbox"
              placeholder='Email ID'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default Signup;
