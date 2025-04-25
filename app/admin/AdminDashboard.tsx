import React from 'react';
import ManageTours from './ManageTours';
import ManageUsers from './ManageUsers';
import ManageBookings from './ManageBookings';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ManageTours />
      <ManageUsers />
      <ManageBookings />
    </div>
  );
};

export default AdminDashboard;
