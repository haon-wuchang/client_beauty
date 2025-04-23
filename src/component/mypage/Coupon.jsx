import React from 'react';

export default function Coupon() {
    return (
        <div className='mypage-coupon-all'>
            <div className='mypage-update-info-title mypage-title'>마이쿠폰</div>
            <div className='mypage-coupon-top'>
                <span>마이 쿠폰 목록</span>
                <span>사용가능 쿠폰 : 2장</span>
            </div>
            <div className='mypage-coupon-table'>
                <table>
                    <tr>
                        <td>번호</td>
                        <td>쿠폰명</td>
                        <td>쿠폰적용 상품</td>
                        <td>구매금액</td>
                        <td>결제수단</td>
                        <td>쿠폰혜택</td>
                        <td>사용 가능 기간</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>맑은쌀 선크림 첫구매딜</td>
                        <td>
                            <div>
                                <span>적용상품보기</span>
                            </div>
                        </td>
                        <td>제한없음</td>
                        <td>제한없음</td>
                        <td>9,000원 할인</td>
                        <td>2025-03-10 17:36:37 ~ 2025-03-17 17:36:37</td>
                    </tr>
                </table>
            </div>
            <div className='mypage-money-page'>
                1
            </div>
            <div className='mypage-coupon-middle'>
                <h5>쿠폰인증번호 등록하기</h5>
                <div>
                    <div>
                        <input type="number" placeholder='10~35자 일련번호 /  - 제외하고 입력해주세요'/>
                        <button>쿠폰 번호 인증</button>
                    </div>
                </div>
            </div>
            <div className='mypage-money-desc'>
                <h5>쿠폰 이용 안내</h5>
                <ul>
                    <li>쿠폰인증번호 등록하기에서 쇼핑몰에서 발행한 종이쿠폰/시리얼쿠폰/모바일쿠폰 등의 인증번호를 등록하시면 온라인쿠폰으로 발급되어 사용이 가능합니다.</li>
                    <li>쿠폰은 주문 시 1회에 한해 적용되며, 1회 사용 시 재 사용이 불가능합니다.</li>
                    <li>쿠폰은 적용 가능한 상품이 따로 적용되어 있는 경우 해당 상품 구매 시에만 사용이 가능합니다.</li>
                    <li>특정한 종이쿠폰/시리얼쿠폰/모바일쿠폰의 경우 단 1회만 사용이 가능할 수 있습니다.</li>
                    <li>기본 배송비 할인쿠폰은 배송구분이 '기본배송'인 상품에 부과된 배송비만 할인이 적용됩니다.</li>
                    <li>전체 배송비 할인쿠폰은 배송구분이 '기본배송', '개별배송', '공급사배송'인 상품에 부과된 배송비 할인이 적용됩니다.</li>
                </ul>
            </div>
        </div>
    );
}

