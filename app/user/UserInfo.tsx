// app/user/UserInfo.tsx hoặc components/UserInfo.tsx (đặt đúng vị trí)
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { fetchUserInfo, updateUserInfo } from '../../utils/api'; // Đảm bảo đường dẫn đúng
import { Form, Button, Card, Spinner, Alert, Container } from 'react-bootstrap';

// Định nghĩa kiểu dữ liệu người dùng (điều chỉnh nếu cần khớp API)
// Dựa trên DB schema của bạn
interface UserProfile {
  id?: number | string; // Có thể cần hoặc không tùy API update
  username?: string; // Thường không cho sửa username
  password:string;
  full_name: string; // Sử dụng full_name thay vì name
  email: string;
  phone?: string;
  roll:string; // Thêm số điện thoại
  // Thêm các trường khác nếu cần
}

const UserInfo = () => {
  // Sử dụng kiểu UserProfile, khởi tạo là null để biết chưa load
  const [user, setUser] = useState<UserProfile | null>(null);
  const [initialUser, setInitialUser] = useState<UserProfile | null>(null); // Lưu trạng thái ban đầu để reset hoặc so sánh
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải ban đầu
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái đang gửi cập nhật
  const [error, setError] = useState<string | null>(null); // Lưu lỗi fetch hoặc update
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Lưu thông báo thành công

  // Hàm fetch dữ liệu
  const getUserInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null); // Xóa thông báo cũ
    try {
      const data = await fetchUserInfo();
      if (data) {
         // Đảm bảo API trả về đúng cấu trúc UserProfile
         const profileData: UserProfile = {
            id: data.id,
            username: data.username,
            password:data.password,
            full_name: data.full_name || data.name || '', // Ưu tiên full_name, fallback về name nếu có
            email: data.email || '',
            phone: data.phone || '',
            roll:data.roll || '',
         };
         setUser(profileData);
         setInitialUser(profileData); // Lưu lại trạng thái gốc
      } else {
         throw new Error("Không nhận được dữ liệu người dùng.");
      }
    } catch (err: any) {
      setError(`Không thể tải thông tin người dùng: ${err.message || 'Lỗi không xác định'}`);
      console.error("Fetch user info error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Gọi hàm fetch khi component mount
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Cập nhật state, xóa thông báo lỗi/thành công khi người dùng bắt đầu sửa
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
    setError(null);
    setSuccessMessage(null);
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Không có user thì không làm gì

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
       // Gọi API update, đảm bảo gửi đúng cấu trúc API mong đợi
       // Ví dụ: có thể cần loại bỏ username nếu không cho cập nhật
       const { username, ...updateData } = user; // Loại bỏ username nếu không cần gửi
      await updateUserInfo(updateData); // Gửi dữ liệu đã loại bỏ username
      setSuccessMessage('Cập nhật thông tin thành công!');
      setInitialUser(user); // Cập nhật trạng thái gốc sau khi thành công
    } catch (err: any) {
      setError(`Cập nhật thất bại: ${err.message || 'Vui lòng thử lại.'}`);
      console.error("Update user info error:", err);
      // Optional: Khôi phục lại dữ liệu ban đầu nếu cập nhật lỗi
      // setUser(initialUser);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---

  // Trạng thái đang tải dữ liệu ban đầu
  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-2">Đang tải thông tin...</p>
      </Container>
    );
  }

  // Lỗi không tải được dữ liệu ban đầu
  if (error && !user) {
    return (
       <Container className="py-4" style={{ maxWidth: '600px' }}>
           <Alert variant="danger">{error}</Alert>
           <Button variant="secondary" onClick={getUserInfo}>Thử lại</Button>
       </Container>
    );
  }

  // Trường hợp không có user sau khi load xong (ít xảy ra nếu API ổn định)
  if (!user) {
     return (
       <Container className="py-4" style={{ maxWidth: '600px' }}>
           <Alert variant="warning">Không tìm thấy thông tin người dùng.</Alert>
       </Container>
     );
  }

  // Hiển thị form khi đã có dữ liệu
  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm">
        <Card.Header as="h4" className="text-center">Thông tin cá nhân</Card.Header>
        <Card.Body>
          {/* Hiển thị lỗi hoặc thành công của việc submit */}
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Hiển thị Username (thường không cho sửa) */}
            {user.username && (
               <Form.Group className="mb-3" controlId="userInfoUsername">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                     type="text"
                     value={user.username}
                     readOnly // Không cho sửa
                     disabled // Làm mờ đi
                  />
               </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="userInfoFullName">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                name="full_name" // Phải khớp với key trong state user và interface
                value={user.full_name || ''} // Dùng || '' để tránh lỗi controlled/uncontrolled
                onChange={handleChange}
                required // Yêu cầu nhập
                disabled={isSubmitting} // Vô hiệu hóa khi đang gửi
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userInfoEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email || ''}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userInfoPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel" // Kiểu điện thoại
                name="phone"
                value={user.phone || ''}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Nhập số điện thoại (tùy chọn)"
              />
            </Form.Group>

            <div className="d-grid"> {/* Nút chiếm hết chiều rộng */}
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Đang lưu...
                  </>
                ) : (
                  'Cập nhật thông tin'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserInfo;