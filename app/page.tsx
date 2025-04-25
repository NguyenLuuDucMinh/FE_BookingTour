import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TourList from './tour/TourList';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Booking Tour</h1>
      <TourList />
    </div>
  );
};

export default HomePage;
