// components/TourDetail.tsx
"use client"; // <-- ĐÁNH DẤU LÀ CLIENT COMPONENT

import Image from 'next/image';
import { Card, ListGroup, Badge, Row, Col } from 'react-bootstrap';

// --- Interface dữ liệu Tour ---
// Đảm bảo khớp với dữ liệu API và interface trong page.tsx
interface TourData {
  id: number | string;
  name: string;
  price: number;
  description: string;
  imageUrl: string | null | undefined;
  startDate: string;
  endDate: string;
  duration: number;
}

// --- Interface Props cho component ---
interface TourDetailProps {
  tour: TourData; // Nhận đối tượng tour
}

// --- Hàm helper (có thể đặt bên ngoài nếu muốn) ---
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  } catch (e) {
    console.error("Lỗi định dạng ngày:", dateString, e);
    return dateString;
  }
};

const formatPrice = (price: number) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return price.toLocaleString('vi-VN') + ' VND';
};

// --- Component TourDetail ---
export default function TourDetail({ tour }: TourDetailProps) {
  // Xử lý đường dẫn ảnh
  const imagePath = tour.imageUrl
    ? `/images/${tour.imageUrl}`
    : '/images/placeholder-image.jpg';

  return (
    // Component này giờ bao gồm cả bố cục Row/Col và các Card
    <div>
      <Row className="g-4 mb-5">
        {/* --- Cột Hình ảnh --- */}
        <Col md={7}>
          <Card className="shadow-sm overflow-hidden">
            <div style={{ position: 'relative', width: '100%', paddingTop: '60%' }}>
              <Image
                src={imagePath}
                alt={`Hình ảnh tour ${tour.name}`}
                layout="fill"
                objectFit="cover"
                priority // Ưu tiên tải ảnh chính
                onError={(e) => { // Hợp lệ vì đây là Client Component
                  const target = e.target as HTMLImageElement;
                  if (target.src !== '/images/placeholder-image.jpg') { // Tránh lặp vô hạn
                     target.onerror = null; // Chỉ đặt lại sau khi đã thử
                     target.srcset = "";
                     target.src = '/images/placeholder-image.jpg';
                     console.warn(`Không thể tải ảnh: ${imagePath}. Sử dụng ảnh dự phòng.`);
                  }
                }}
              />
            </div>
          </Card>
        </Col>

        {/* --- Cột Thông tin chính --- */}
        <Col md={5}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              {/* Không cần Card.Title ở đây nếu tiêu đề chính đã ở page.tsx */}
              {/* <Card.Title as="h2" className="mb-3">{tour.name}</Card.Title> */}
              <ListGroup variant="flush" className="flex-grow-1">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-cash-coin me-2 text-success"></i>Giá từ:</span>
                  <span className="text-primary fw-bold fs-5">{formatPrice(tour.price)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-clock-history me-2 text-info"></i>Thời gian:</span>
                  <Badge bg="info">{tour.duration} ngày</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-calendar-check me-2"></i>Khởi hành:</span>
                  <span>{formatDate(tour.startDate)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-calendar-x me-2"></i>Kết thúc:</span>
                  <span>{formatDate(tour.endDate)}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Phần Mô tả --- */}
      <Card className="shadow-sm">
        <Card.Header as="h3">
          <i className="bi bi-info-circle-fill me-2"></i>Mô tả chi tiết
        </Card.Header>
        <Card.Body>
          <p style={{ whiteSpace: 'pre-line' }}>
            {tour.description || "Hiện chưa có mô tả chi tiết cho tour này."}
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}