import React, { useContext, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { OrderContext } from '../context/orderContext.js';
import { useOrder } from '../hooks/useOrder.js';
import { GoPerson } from "react-icons/go";
import { BiSolidShoppingBags } from "react-icons/bi";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const { orderPrice, completedOrderList, orderNumber, member } = useContext(OrderContext);
    const [searchParams] = useSearchParams();
    const { saveToOrder } = useOrder();
    const hasCheckedLogin = useRef(false);
    const id = localStorage.getItem("user_id");
    const pg_token = searchParams.get("pg_token");
    const tid = localStorage.getItem("tid");

    console.log("주문자 정보 확인 --> ", member);

    useEffect(() => {
        if (hasCheckedLogin.current) return;  // true:로그인 상태 -->  블록 return
        hasCheckedLogin.current = true;
        
        if(id) {
            const approvePayment = async() => {
                if (pg_token && tid) {
                    try {                            
                        const result_rows = await saveToOrder();
                        if(result_rows) {
                            result_rows && console.log("결제 승인 완료:");
                        }                         
                    } catch (error) {
                        console.error("결제 승인 실패:", error);
                    }
                } else {
                    console.log("saveToOrder 실행 실패");
                }
            };        
            approvePayment();
        } else {  
            const select = window.confirm("로그인 서비스가 필요합니다. \n로그인 하시겠습니까?");
            select ?  navigate('/login') :  navigate('/');
        }
    } , [id]);   


    return (
        <div className='payment-success-wrap'>
            <div className='payment-success-top'>
                <div>
                    <span>조선미녀</span>
                    <span><GoPerson /></span>
                </div>
                <div>주문완료</div>
                <div className='payment-success-info'>
                    <div>
                        <div className='payment-success-info-top'>
                            <p><BiSolidShoppingBags /></p>
                            <p>고객님의 주문이</p>
                            <p>정상적으로 완료되었습니다.</p>
                        </div>
                        <div className='payment-success-info-bottom'>
                            <div>
                                <span>주문번호</span>
                                <span>{orderNumber}</span> 
                            </div>
                            <div>
                                <span>결제금액</span>
                                <span>{orderPrice >= 20000 ? `${orderPrice.toLocaleString()}` : `${(orderPrice + 3000).toLocaleString()}`}원</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='payment-success-type-block'>
                <div className='payment-success-block-title'>
                    <span>결제수단</span>
                </div>
                <div className='payment-sucess-type-detail'>
                    <span className='payment-success-detail-label'>결제수단</span>
                    <span className='payment-success-detail-desc'>신용카드</span>
                </div>
            </div>

            <div className='payment-success-delivery-block'>
                <div className='payment-success-block-title'>
                    <span>배송지</span>
                </div>
                <ul className='payment-success-delivery-detail'>
                    <li>
                        <span className='payment-success-detail-label'>결제수단</span>
                        <span className='payment-success-detail-desc'>{member.name}({member.email})</span>
                    </li>
                    <li>
                        <span className='payment-success-detail-label'>주소</span>
                        <span className='payment-success-detail-desc'>{member.address} {member.extra_address}</span>
                    </li>
                    <li>
                        <span className='payment-success-detail-label'>연락처</span>
                        <span className='payment-success-detail-desc'>{member.phone}</span>
                    </li>
                </ul>
            </div>

            <div className='payment-success-orderlist-block'>
                <div className='payment-success-block-title'>
                    <span>주문상품</span>
                </div>
                <ul className='payment-success-orderlist-main'>
                    { completedOrderList&& completedOrderList.map((item) => 
                        <li className='payment-success-orderlist-product'>
                            <div className='payment-success-orderlist-product-img'>
                                <img src={`http://15.165.205.38:9000/${item.main_image}`} alt="" />
                            </div>
                            <div className='payment-success-orderlist-product-detail'>
                                <p>{item.pname}</p>
                                <p>수량: {item.qty}개</p>
                                <p>{Number(item.qty * item.discount_price).toLocaleString()}원</p>
                            </div>
                        </li>
                    ) }
                </ul>
                <div className='payment-success-orderlist-bottom'>
                    <span>배송비</span>
                    <span>{orderPrice > 20000 ? '0' : '3000'}원</span>
                </div>
            </div>

            <div className='payment-success-bill-block'>
                <div className='payment-success-block-title'>
                    <span>결제정보</span>
                </div>
                <div className='payment-success-bill-detail'>
                    <div>
                        <span className='payment-success-detail-label'>주문상품</span>
                        <span className='payment-success-bill-desc'>{orderPrice.toLocaleString()}원</span>
                    </div>
                    <div>
                        <span className='payment-success-detail-label'>배송비</span>
                        <span className='payment-success-bill-desc'>{orderPrice >= 20000 ? '0' : Number(3000).toLocaleString() }원</span>
                    </div>
                </div>
                <div className='payment-success-bill-bottom'>
                    <span>결제 금액</span>
                    <span>{orderPrice >= 20000 ? `${orderPrice.toLocaleString()}` : `${(orderPrice + 3000).toLocaleString()}`}원</span>
                </div>
            </div>

            <div className='payment-success-benefit-block'>
                <div className='payment-success-block-title'>
                    <span>적립 혜택</span>
                </div>
                <div>
                    <span className='payment-success-detail-label'>회원 적립금</span>
                    <span className='payment-success-benefit-desc'>{Math.trunc(Number(orderPrice) * 0.01).toLocaleString()}원</span>
                </div>
                <div className='payment-success-bottom'>
                    <div className='payment-success-bottom-benefit'>
                        <span>적립 예정금액</span>
                        <span>{(orderPrice * 0.01).toLocaleString()}원</span>
                    </div>
                    <div className='payment-success-bottom-btns'>
                        <button><Link to={'/mypage'}>주문확인하기</Link></button>
                        <button><Link to={'/product/list'}>쇼핑계속하기</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}