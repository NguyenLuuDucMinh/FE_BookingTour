"use client"
import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../../utils/api';

const ManageBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const getBookings = async () => {
      const data = await fetchBookings();
      setBookings(data);
    };

    getBookings();
  }, []);

  const handleCancel = (id: string) => {
    // Xử lý hủy booking (API cancel)
    console.log('Cancel booking with id:', id);
  };

  return (
    <div>
      <h3>Manage Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.tourName} - {booking.status}
            <button onClick={() => handleCancel(booking.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBookings;
