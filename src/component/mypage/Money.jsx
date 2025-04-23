import React from 'react';
import ReactPaginate from 'react-paginate';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useState } from 'react';

export default function Money({ myOrder }) {

    /* 페이지네이션 */
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    // 페이지네이션 관련 로직
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = myOrder.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(myOrder.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % myOrder.length;
        setItemOffset(newOffset);
    };


    return (
        <div className='mypage-money-all'>
            <div className='mypage-update-info-title mypage-title'>적립금</div>
            <div className='mypage-money-all-top'>
                <div>
                    <ul>
                        <li>
                            <span>총 적립금</span>
                            <span>0원</span>
                        </li>
                        <li>
                            <span>사용된 적립금</span>
                            <span>0원</span>
                        </li>
                        <li>
                            <span>환불예정 적립금</span>
                            <span>0원</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <span>사용가능 적립금</span>
                            <span>0원</span>
                        </li>
                        <li>
                            <span>미가용 적립금</span>
                            <span>0원</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ul className='mypage-money-tab'>
                <li>적립내용보기</li>
                <li>미가용적립내용보기</li>
                <li>미가용쿠폰/회원등급적립내역</li>
            </ul>
            <div className='mypage-money-table'>
                <table>
                    <tr>
                        <td>주문번호</td>
                        <td>적립금</td>
                        <td>주문내역</td>
                    </tr>
                </table>
            </div>
            <div className='mypage-money-page'>
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
            <div className='mypage-money-desc'>
                <h5>적립금 안내</h5>
                <ul>
                    <li>주문으로 발생한 적립금은 배송완료 후 1일 부터 실제 사용 가능한 적립금으로 전환됩니다. 배송완료 시점으로부터 1일 동안은 미가용 적립금으로 분류됩니다.</li>
                    <li>미가용 적립금은 반품, 구매취소 등을 대비한 임시 적립금으로 사용가능 적립금으로 전환되기까지 상품구매에 사용하실 수 없습니다.</li>
                    <li>사용가능 적립금(총적립금 - 사용된적립금 - 미가용적립금)은 상품구매 시 바로 사용가능합니다.</li>
                </ul>
            </div>
        </div>
    );
}

