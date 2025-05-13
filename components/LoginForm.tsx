// components/LoginForm.tsx
"use client";

import React, { useState, useContext } from 'react'; // Thêm useContext nếu dùng Context
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; // Để điều hướng sau khi đăng nhập
import { loginUser } from '../utils/api'; // Hàm gọi API đăng nhập (sẽ tạo ở bước 3)

// (Optional) Import AuthContext nếu bạn dùng để quản lý state đăng nhập
// import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState(''); // Hoặc dùng email tùy backend
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // (Optional) Lấy hàm login từ context
  // const authContext = useContext(AuthContext);
  // if (!authContext) {
  //   throw new Error("LoginForm must be used within an AuthProvider");
  // }
  // const { login } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Gọi API đăng nhập
      const response = await loginUser(username, password);

      // Kiểm tra xem API có trả về token không
      if (response && response.token) {
        console.log('Login successful, token:', response.token);

        // --- QUAN TRỌNG: Lưu token ---
        // Cách phổ biến là dùng localStorage (chỉ an toàn nếu không lưu thông tin quá nhạy cảm)
        localStorage.setItem('authToken', response.token);
        // Bạn cũng có thể lưu thông tin user cơ bản nếu API trả về
        // localStorage.setItem('userData', JSON.stringify(response.user));

        // (Optional) Cập nhật trạng thái đăng nhập toàn cục qua Context
        // login(response.user, response.token); // Truyền dữ liệu user và token vào context

        // Điều hướng đến trang chủ hoặc dashboard sau khi đăng nhập thành công
        router.push('/'); // Hoặc '/admin/dashboard' tùy vai trò
        router.refresh(); // Refresh để cập nhật layout/header có thể hiển thị thông tin user

      } else {
        // Xử lý trường hợp API thành công nhưng không trả về token đúng định dạng
        setError('Phản hồi đăng nhập không hợp lệ.');
      }

    } catch (err: any) {
      console.error('Login error:', err);
      // Hiển thị lỗi cụ thể hơn nếu có thể
      if (err.message && err.message.includes('401')) { // Giả sử API trả về lỗi 401 Unauthorized
        setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      } else if (err.message && err.message.includes('400')) {
         setError('Dữ liệu nhập không hợp lệ.');
      }
      else {
        setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label>Tên đăng nhập (hoặc Email)</Form.Label>
            <Form.Control
              type="text" // Hoặc "email" nếu backend yêu cầu email
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </div>
        </Form>
        {/* Bạn có thể thêm link Quên mật khẩu hoặc Đăng ký ở đây */}
        {/* <div className="mt-3 text-center">
          <Link href="/register">Chưa có tài khoản? Đăng ký</Link>
        </div> */}
      </Card.Body>
    </Card>
  );
};

export default LoginForm;