import React from 'react';
import ManageTours from '../app/admin/ManageTours';
import ManageUsers from '../app/admin//ManageUsers';
import ManageBookings from '../app/admin//ManageBookings';

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
