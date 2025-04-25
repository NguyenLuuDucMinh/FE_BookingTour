import React, { useState, useEffect } from 'react';
import { fetchUserInfo, updateUserInfo } from '../utils/api';

const UserInfo = () => {
  const [user, setUser] = useState<any>({ name: '', email: '' });

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUserInfo();
      setUser(data);
    };

    getUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserInfo(user);
    console.log('User info updated:', user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Info</button>
    </form>
  );
};

export default UserInfo;
