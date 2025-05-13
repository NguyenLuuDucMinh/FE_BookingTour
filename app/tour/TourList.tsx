// src/app/tours/page.tsx (hoặc nơi đặt component TourList)
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import TourCard from '../../components/TourCard';
import { fetchTours } from '../../utils/api'; // Hàm fetch API của bạn
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner cho trạng thái loading
import Alert from 'react-bootstrap/Alert'; // Import Alert để hiển thị lỗi

interface Tour {
    id: number | string;
    name: string;
    price: number;
    description: string;
    imageUrl: string | null | undefined;
    startDate:string;
    endDate:string;
    duration:number;
    // duration?: number;
    // startDate?: string;
}

// Cấu trúc dữ liệu trả về từ API Spring Boot Pageable
interface TourApiResponse {
    content: Tour[];
    totalPages: number;
    totalElements: number;
    number: number; // Số trang hiện tại (0-indexed)
    size: number;
    // Các thuộc tính khác của Page nếu có
}

const TOURS_PER_PAGE = 9; // 3 cột x 3 hàng

const TourList = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại (1-indexed)
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    // Sử dụng useCallback để tránh tạo lại hàm fetch mỗi lần render
    const getTours = useCallback(async (page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            // Gọi API với tham số trang (0-indexed) và kích thước trang
            const data: TourApiResponse = await fetchTours(page - 1, TOURS_PER_PAGE);
            console.log('API Response Data:', data);

            if (data && data.content && Array.isArray(data.content)) {
                setTours(data.content);
                setTotalPages(data.totalPages);
                // Optional: Cập nhật lại currentPage nếu API trả về trang khác yêu cầu
                // setCurrentPage(data.number + 1);
                } else {
                console.error("Dữ liệu API không hợp lệ:", data);
                setError("Định dạng dữ liệu tour không hợp lệ.");
                setTours([]);
                setTotalPages(0);
                }
        } catch (err: any) {
            console.error("Lỗi khi fetch tours:", err);
            setError(`Không thể tải danh sách tour: ${err.message || 'Lỗi không xác định'}`);
            setTours([]);
            setTotalPages(0);
        } finally {
            setIsLoading(false);
        }
    }, []); // Không có dependency vì fetchTours được giả định là ổn định

    // Gọi API khi component mount hoặc khi currentPage thay đổi
    useEffect(() => {
        getTours(currentPage);
    }, [currentPage, getTours]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            // Optional: Cuộn lên đầu trang khi chuyển trang
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // --- Render UI ---

    const renderPaginationItems = () => {
        if (totalPages <= 1) return null; // Không hiển thị nếu chỉ có 1 trang

        let items = [];
        const maxPagesToShow = 5; // Số lượng nút trang tối đa hiển thị (không tính Prev, Next, First, Last)
        let startPage: number, endPage: number;

        if (totalPages <= maxPagesToShow + 2) { // Hiển thị tất cả nếu ít trang
            startPage = 1;
            endPage = totalPages;
        } else {
            // Logic hiển thị rút gọn với dấu "..."
            if (currentPage <= maxPagesToShow - 2) {
                startPage = 1;
                endPage = maxPagesToShow -1;
                items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
                items.push(<Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>);
            } else if (currentPage >= totalPages - (maxPagesToShow - 3) ) {
                startPage = totalPages - (maxPagesToShow - 2);
                endPage = totalPages;
                items.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>{1}</Pagination.Item>);
                items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            } else {
                startPage = currentPage - Math.floor((maxPagesToShow - 3) / 2);
                endPage = currentPage + Math.ceil((maxPagesToShow - 3) / 2);
                 items.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>{1}</Pagination.Item>);
                 items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
                 items.push(<Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>);
            }
        }

        // Tạo các nút số trang
        let pageItems = [];
        for (let number = startPage; number <= endPage; number++) {
            pageItems.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
         // Chèn các nút số trang vào giữa first/prev và last/next/ellipsis
        if (currentPage > totalPages - (maxPagesToShow - 3) && totalPages > maxPagesToShow + 2) {
            items.splice(2, 0, ...pageItems); // Chèn sau first và ellipsis start
        } else if(currentPage <= maxPagesToShow - 2 && totalPages > maxPagesToShow + 2){
             items.splice(0, 0, ...pageItems); // Chèn trước ellipsis end và last
        }
         else if (totalPages > maxPagesToShow + 2) {
             items.splice(2, 0, ...pageItems); // Chèn giữa các ellipsis
         }
        else {
            items = pageItems; // Nếu không có ellipsis
        }


        return (
            <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {items}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        );
    };


    return (
        <div className="container mt-4 mb-5"> {/* Thêm margin bottom */}
            <h1 className="text-center mb-4">Khám phá các Tour Du Lịch</h1>

            {isLoading && (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                    <p className="mt-2">Đang tải danh sách tour...</p>
                </div>
            )}

            {error && !isLoading && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}

            {!isLoading && !error && tours.length === 0 && (
                <Alert variant="info" className="text-center">
                    Không tìm thấy tour nào phù hợp.
                </Alert>
            )}

            {!isLoading && !error && tours.length > 0 && (
                <>
                    {/* Sử dụng grid của Bootstrap */}
                    {/* row-cols-1: 1 cột trên màn hình nhỏ nhất */}
                    {/* row-cols-md-2: 2 cột trên màn hình vừa */}
                    {/* row-cols-lg-3: 3 cột trên màn hình lớn */}
                    {/* g-4: Khoảng cách giữa các card */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {tours.map((tour) => (
                            // Mỗi TourCard là một cột trong grid
                            <div key={tour.id} className="col">
                                <TourCard tour={tour} />
                            </div>
                        ))}
                    </div>

                    {/* Hiển thị phân trang */}
                    {renderPaginationItems()}
                </>
            )}
        </div>
    );
};

export default TourList;