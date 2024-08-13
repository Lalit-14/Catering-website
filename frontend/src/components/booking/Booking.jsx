import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './booking.css';
import Navbar from '../navbar/Navbar';

const Booking = () => {
  const [caterers, setCaterers] = useState([]);
  const [selectedCaterer, setSelectedCaterer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8000/caterers")
      .then(response => setCaterers(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleCatererChange = (event) => {
    const caterer = caterers.find(caterer => caterer._id === event.target.value);
    setSelectedCaterer(caterer);
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  const handleBooking = () => {
    if (selectedCaterer && selectedDate && selectedFoodType) {
      // Simulate a successful booking after a short delay
      setTimeout(() => {
        setBookingSuccess(true);
        setError('');
      }, 500); // Simulate network delay

      // Comment out the real API call
      // axios.post("http://localhost:8000/bookSlot", {
      //   catererId: selectedCaterer._id,
      //   date: selectedDate.toISOString().split('T')[0],
      //   foodType: selectedFoodType
      // })
      // .then(response => {
      //   setBookingSuccess(true);
      //   setError('');
      // })
      // .catch(error => {
      //   setBookingSuccess(false);
      //   setError('Error booking slot');
      //   console.log(error);
      // });
    } else {
      setError('Please select a caterer, a date, and a food type');
    }
  };

  return (
    <div className='outer'>
      <div className='nav'>
        <Navbar colored />
      </div>
      <div className='booking_container'>
        <h2>Book a Caterer</h2>
        <div className="booking-form">
          <label>Select Caterer:</label>
          <select onChange={handleCatererChange}>
            <option value="">-- Select Caterer --</option>
            {caterers.map(caterer => (
              <option key={caterer._id} value={caterer._id}>{caterer.name}</option>
            ))}
          </select>
          {selectedCaterer && (
            <>
              <label>Select Date Slot:</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a date"
              />
              <label>Select Food Type:</label>
              <select onChange={handleFoodTypeChange} value={selectedFoodType}>
                <option value="">-- Select Food Type --</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Both">Both</option>
              </select>
              <button onClick={handleBooking} disabled={!selectedDate || !selectedFoodType}>
                Book Slot
              </button>
            </>
          )}
          {bookingSuccess && (
            <div className="confirmation-message">
              <h3>Booking Successful</h3>
              <p>Your caterer has been booked successfully!</p>
            </div>
          )}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
