"use client"
import React, { useEffect, useState } from 'react';
import { fetchTours } from '../../utils/api';

const ManageTours = () => {
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    const getTours = async () => {
      const data = await fetchTours();
      setTours(data);
    };

    getTours();
  }, []);

  const handleDelete = (id: string) => {
    // Xử lý xóa tour (API delete)
    console.log('Delete tour with id:', id);
  };

  return (
    <div>
      <h3>Manage Tours</h3>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            {tour.name} - {tour.price}
            <button onClick={() => handleDelete(tour.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTours;
