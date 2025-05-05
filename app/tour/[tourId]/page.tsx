// app/tours/[tourId]/page.tsx
import TourDetail from '@/components/TourDetail'; // Import Client Component TourDetail
import { fetchTourDetail } from '@/utils/api';
import { notFound } from 'next/navigation';
import { Alert, Button } from 'react-bootstrap';
import Link from 'next/link';

// --- Định nghĩa Interfaces ---
// Interface dữ liệu Tour (cần khớp với TourDetail.tsx)
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

// Interface props trang
interface TourDetailPageProps {
  params: { tourId: string; };
}

// --- Hàm định dạng giá (có thể chuyển vào utils) ---
const formatPrice = (price: number) => {
  if (price === null || price === undefined) return 'Liên hệ';
  return price.toLocaleString('vi-VN') + ' VND';
};

// --- Component Trang (Vẫn là Server Component) ---
export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { tourId } = params;
  let tourData: TourData | null = null;
  let fetchError: string | null = null;

  try {
    tourData = await fetchTourDetail(tourId);
    if (!tourData) {
      notFound();
    }
  } catch (error: any) {
    console.error("Lỗi khi tải chi tiết tour:", error);
    fetchError = `Không thể tải thông tin tour. Lỗi: ${error.message || 'Unknown error'}`;
  }

  if (fetchError) {
    return <div className="container py-5"><Alert variant="danger">{fetchError}</Alert></div>;
  }

  if (!tourData) return null; // Đảm bảo tourData tồn tại

  // --- Render Giao diện ---
  return (
    <div className="container py-5">
      {/* Tiêu đề chính của trang */}
      <h1 className="mb-4">{tourData.name}</h1>

      {/* Render component TourDetail (giờ là Client Component) */}
      {/* Component này sẽ tự xử lý bố cục ảnh và text bên trong nó */}
      <TourDetail tour={tourData} />

      {/* Nút Đặt Tour */}
      <div className="text-center mt-5">
        <Link href={`/booking?tourId=${tourData.id}`} passHref>
           <Button variant="success" size="lg">
              Đặt Tour Ngay ({formatPrice(tourData.price)})
           </Button>
        </Link>
      </div>
    </div>
  );
}

// --- Optional: Hàm tạo Metadata ---
export async function generateMetadata({ params }: TourDetailPageProps) {
  try {
    const tourData = await fetchTourDetail(params.tourId);
    if (!tourData) {
      return { title: 'Không tìm thấy tour' };
    }
    return {
      title: `Chi tiết Tour: ${tourData.name}`,
      description: tourData.description?.substring(0, 160) || `Khám phá chi tiết tour ${tourData.name}`,
    };
  } catch (error) {
    return {
      title: 'Lỗi tải Tour',
      description: 'Không thể tải thông tin chi tiết tour.',
    };
  }
}