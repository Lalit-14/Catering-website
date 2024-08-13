import React, {useEffect } from 'react';
import './landing.css'
import Navbar from '../navbar/Navbar'
const Landing = () => {
  useEffect(() => {
    document.body.classList.add('landing');
    return () => {
      document.body.classList.remove('landing');
    };
  }, []);
  return (
    <div className='landing_container'>
        <div className='nav'>
            <Navbar transparent/>
        </div>
    <div className='image'>
    <div className='text'>
    <p className='left'>Namaste</p>
    <img src="./assets/logo.png" alt="logo" />
    <p className='right'>Catering Co.</p>
    </div>
    </div>
</div>
  )
}

export default Landing