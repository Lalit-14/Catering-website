import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';
import Navbar from '../navbar/Navbar';

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/submit-review', {
        name,
        email,
        rating,
        review,
      });
      console.log(response.data.message);
      alert("Review submitted successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert("There was an error submitting your review. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      <div className='nav'>
        <Navbar colored />
      </div>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Address:</strong></p>
        <p>Srinagar Colony, Hyderabad, 50302</p>
        <p><strong>Phone:</strong></p>
        <p>040 10023563</p>
        <p><strong>Email:</strong></p>
        <p><a href="mailto:info@example.com">Namastecateringco@gmail.com</a></p>
      </div>
      <div className="review-form">
        <h1>Leave a Review</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name:"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <input
            type="email address"
            placeholder="Email address:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <select
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="" selected>Select your rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <textarea
            name="review"
            placeholder="Your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
