import React from 'react';
import UserInfo from './UserInfo';
import BookingForm from './BookingForm';

const UserDashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <UserInfo />
      <BookingForm />
    </div>
  );
};

export default UserDashboard;
