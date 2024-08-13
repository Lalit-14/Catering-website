import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./catering.css";
import Navbar from '../navbar/Navbar';

const Catering = () => {
  const [caterers, setCaterers] = useState([]);

  useEffect(() => {
    fetchCaterers();
  }, []);

  const fetchCaterers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/caterers');
      setCaterers(response.data);
    } catch (error) {
      console.error('Error fetching caterers:', error);
    }
  };

  return (
    <div className='outer_container'>
      <div className='nav'>
        <Navbar colored />
      </div>
      <div className='caterer_container'>
        {caterers.map((caterer) => (
          <div key={caterer._id} className='caterer_card'>
            <img src={`/assets/$caterer.image`} alt={caterer.name} className='caterer_image'/>
            <h2>{caterer.name}</h2>
            <p>{caterer.area}</p>
            <p>{caterer.address}</p>
            <p>{caterer.contact}</p>
            <img src={caterer.logo} alt={`${caterer.name} logo`} className='caterer_logo'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catering;
