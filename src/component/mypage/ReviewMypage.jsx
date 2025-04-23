import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import axios from 'axios';
import { useMypage } from '../../hooks/useMypage.js';
import { useContext } from 'react';
import { MypageContext } from '../../context/MypageContext.js';

export default function Review() {
    const { myOrder, myReview } = useContext(MypageContext);
    const { getMyOrder, getReview } = useMypage();
    const navigate = useNavigate();
    const selectRef = useRef(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [reviewedPids, setReviewedPids] = useState(() => {
        const saved = localStorage.getItem('reviewedPids');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const completed = myOrder
            .filter(item => item.delivery_status === '배송완료')
            .filter(item => !reviewedPids.includes(item.pid));
        setFilteredOrders(completed);
    }, [myOrder, reviewedPids]);

    const handleReview = (pid) => {
        navigate(`/product/detail/${pid}`);
    }

    // 클릭한 데이터만 제외하고 새로운 배열 생성
    const deleteWriteReview = (pid) => {
        const updatedPids = [...reviewedPids, pid];
        setReviewedPids(updatedPids);
        localStorage.setItem('reviewedPids', JSON.stringify(updatedPids));
        const updated = filteredOrders.filter((item) => item.pid !== pid);
        setFilteredOrders(updated);
    };

    /* 리뷰작성 전 페이지네이션 */
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    // 페이지네이션 관련 로직
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = filteredOrders.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredOrders.length;
        setItemOffset(newOffset);
    }
    /* 작성한 리뷰 페이지네이션 */
    const [itemOffset2, setItemOffset2] = useState(0);
    const itemsPerPage2 = 5;

    // 페이지네이션 관련 로직
    const endOffset2 = itemOffset2 + itemsPerPage2;

    const currentItems2 = myReview.slice(itemOffset2, endOffset2);
    const pageCount2 = Math.ceil(myReview.length / itemsPerPage2);

    const handlePageClick2 = (event) => {
        const newOffset2 = (event.selected * itemsPerPage2) % myReview.length;
        setItemOffset2(newOffset2);
    };

    console.log('reviewedPids', reviewedPids);
    console.log('filteredOrders', filteredOrders);


    const handleSelectOrder = (e) => {
        if (selectRef.current.value === 'date') {
            getReview('rdate');
        } else {
            getReview('view_count');
        }
        getReview();
    }

    return (
        <div className='mypage-review-all'>
            <div className='mypage-update-info-title mypage-title'>작성가능 리뷰</div>
            <div className='mypage-review-write'>
                <table>
                    <tr>
                        <td>주문번호</td>
                        <td>상품정보</td>
                        <td>수량</td>
                        <td>총금액</td>
                        <td></td>
                    </tr>
                    {
                        currentItems && currentItems.map((item) =>
                            <tr key={item.pid} className='mypage-review-write-2nd'>
                                <td>{item.order_number}</td>
                                <td>
                                    <img src={item.main_image} alt="리뷰이미지" />
                                    <span>{item.pname}</span>
                                </td>
                                <td>{item.qty}개</td>
                                <td>{item.total_price.toLocaleString().concat('원')}</td>
                                <td onClick={() => {
                                    handleReview(item.pid);
                                    deleteWriteReview(item.pid);
                                }}>리뷰작성하기</td>
                            </tr>
                        )
                    }

                </table>
            </div>
            <div className='mypage-review-write-page'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<MdNavigateNext />}
                    previousLabel={<MdNavigateBefore />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    containerClassName="pagination"
                    activeClassName="active"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="prev"
                    nextClassName="next"
                    disabledClassName="disabled"
                />
            </div>
            <div className='mypage-update-info-title mypage-title'>작성한 리뷰 관리</div>
            <div className='mypage-review-writed-select'>
                <select ref={selectRef} name="" onChange={(e) => { handleSelectOrder(e) }}>
                    <option value="default">선택</option>
                    <option value="date">작성일자별</option>
                    <option value="view">조회수별</option>
                </select>
            </div>
            <div className='mypage-review-writed'>
                <table>
                    <tr>
                        <td>상품정보</td>
                        <td>제목</td>
                        <td>내용</td>
                        <td>작성일</td>
                        <td>조회</td>
                    </tr>
                    {currentItems2 && currentItems2.map((item) =>
                        <tr>
                            <td>{item.pname}</td>
                            <td>{item.subject}</td>
                            <td>{item.text}</td>
                            <td>{item.rdate.slice(0, 10)}</td>
                            <td>{item.view_count}</td>
                        </tr>
                    )
                    }
                </table>
            </div>
            <div className='mypage-review-writed-page'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<MdNavigateNext />}
                    previousLabel={<MdNavigateBefore />}
                    onPageChange={handlePageClick2}
                    pageRangeDisplayed={5}
                    pageCount={pageCount2}
                    containerClassName="pagination"
                    activeClassName="active"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="prev"
                    nextClassName="next"
                    disabledClassName="disabled"
                />
            </div>
        </div>
    );
}