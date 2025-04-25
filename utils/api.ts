// utils/api.ts

export const fetchTours = async () => {
  const response = await fetch('http://localhost:8080/api/tours'); // Đổi URL theo backend của bạn
  const data = await response.json();
  return data;
};

export const fetchTourDetail = async (tourId: string) => {
  const response = await fetch(`http://localhost:8080/api/tours/${tourId}`);
  const data = await response.json();
  return data;
};

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:8080/api/users'); // API để lấy danh sách người dùng
  const data = await response.json();
  return data;
};

export const fetchBookings = async () => {
  const response = await fetch('http://localhost:8080/api/bookings'); // API để lấy danh sách booking
  const data = await response.json();
  return data;
};

export const fetchUserInfo = async () => {
  const response = await fetch('http://localhost:8080/api/user'); // API để lấy thông tin người dùng
  const data = await response.json();
  return data;
};

export const updateUserInfo = async (user: any) => {
  const response = await fetch('http://localhost:8080/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
