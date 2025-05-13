// app/login/page.tsx
import LoginForm from '@components/LoginForm'; // Hoặc đường dẫn '../../components/LoginForm'
import { Container } from 'react-bootstrap';

export default function LoginPage() {
  return (
    <Container className="py-5 d-flex justify-content-center">
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Đăng Nhập</h1>
        <LoginForm />
      </div>
    </Container>
  );
}