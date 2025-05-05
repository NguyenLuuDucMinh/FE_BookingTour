// utils/api.ts

export const fetchTours = async (page: number, size: number) => {
  // Đảm bảo sử dụng dấu backtick (`) cho template literal
  const apiUrl = `http://localhost:8080/api/tours?page=${page}&size=${size}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    // Sử dụng dấu backtick (`) và ${} để nội suy biến
    console.error(`Lỗi khi fetch tours: ${response.status}`);
    throw new Error(`Không thể tải tours: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchTourDetail = async (tourId: string) => {
  // Đảm bảo sử dụng dấu backtick (`) cho template literal
  const apiUrl = `http://localhost:8080/api/tours/${tourId}`;
  const response = await fetch(apiUrl);
  // Bạn có thể thêm xử lý lỗi tương tự như fetchTours ở đây nếu cần
  if (!response.ok) {
    console.error(`Lỗi khi fetch chi tiết tour (${tourId}): ${response.status}`);
    throw new Error(`Không thể tải chi tiết tour: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:8080/api/users');
  if (!response.ok) {
    console.error(`Lỗi khi fetch users: ${response.status}`);
    throw new Error(`Không thể tải danh sách người dùng: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchBookings = async () => {
  const response = await fetch('http://localhost:8080/api/bookings');
  if (!response.ok) {
    console.error(`Lỗi khi fetch bookings: ${response.status}`);
    throw new Error(`Không thể tải danh sách booking: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchUserInfo = async () => {
  const response = await fetch('http://localhost:8080/api/user');
  if (!response.ok) {
    console.error(`Lỗi khi fetch user info: ${response.status}`);
    throw new Error(`Không thể tải thông tin người dùng: ${response.status}`);
  }
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
  if (!response.ok) {
    console.error(`Lỗi khi cập nhật user info: ${response.status}`);
    // Có thể bạn muốn trả về thông tin lỗi chi tiết hơn từ body của response
    // const errorData = await response.json();
    throw new Error(`Không thể cập nhật thông tin người dùng: ${response.status}`);
  }
  return response.json();
};