"use client"
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/api';

const ManageUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    getUsers();
  }, []);

  const handleDelete = (id: string) => {
    // Xử lý xóa người dùng (API delete)
    console.log('Delete user with id:', id);
  };

  return (
    <div>
      <h3>Manage Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
