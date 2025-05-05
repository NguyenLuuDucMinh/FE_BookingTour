// src/components/TourCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Sử dụng Next Image để tối ưu hóa

interface Tour {
    id: number | string;
    name: string;
    price: number;
    description: string;
    imageUrl: string | null | undefined;
    startDate:string;
    endDate:string;
    duration:number;
    // Thêm các trường khác nếu cần: duration, startDate...
}

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    const shortDescription = tour.description && tour.description.length > 100
        ? tour.description.substring(0, 97) + '...'
        : tour.description || "Không có mô tả."; // Fallback nếu description null

    const tourId = tour.id;

    // Xử lý đường dẫn ảnh (giống bước trước)
    const imagePath = tour.imageUrl
        ? `/images/${tour.imageUrl}`
        : '/images/placeholder-image.jpg'; // Ảnh mặc định trong public/images

    return (
        // Sử dụng Bootstrap card và đảm bảo chiều cao bằng nhau trong một hàng với h-100
        <div className="card h-100 shadow-sm">
            <div style={{ position: 'relative', width: '100%', paddingTop: '66.66%' }}> {/* Tạo tỷ lệ khung hình 3:2 */}
                <Image
                    src={imagePath}
                    alt={`Hình ảnh tour ${tour.name}`}
                    layout="fill" // Hoặc fill nếu dùng div bao ngoài
                    objectFit="cover" // Tương đương object-cover
                    className="card-img-top" // Class của Bootstrap nhưng sẽ bị ghi đè bởi Image component
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/placeholder-image.jpg';
                        console.warn(`Không thể tải ảnh: ${imagePath}. Sử dụng ảnh placeholder.`);
                    }}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Giúp tối ưu tải ảnh
                />
            </div>
            {/* d-flex flex-column để nút có thể dùng mt-auto */}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{tour.name}</h5> {/* text-truncate nếu tên quá dài */}
                <p className="card-text fw-bold text-primary mb-2">
                    {tour.price ? tour.price.toLocaleString('vi-VN') + ' VND' : 'Liên hệ'}
                </p>
                {/* flex-grow-1 để phần mô tả chiếm không gian còn lại, đẩy nút xuống */}
                <p className="card-text text-muted small flex-grow-1">
                    {shortDescription}
                </p>
                <Link
                    href={`/tour/${tourId}`}
                    className="btn btn-primary mt-auto align-self-start" // Chuyển className trực tiếp vào Link
                >
                    Xem Chi Tiết {/* Nội dung nút giờ là con trực tiếp của Link */}
                </Link>
            </div>
        </div>
    );
};

export default TourCard;