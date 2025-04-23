import React, { useEffect, useState } from 'react';
import Delivery from '../component/mypage/Delivery.jsx';
import ReviewMypage from '../component/mypage/ReviewMypage.jsx';
import Wish from '../component/mypage/Wish.jsx';
import Order from '../component/mypage/Order.jsx';
import UpdateMypage from '../component/mypage/UpdateMypage.jsx';
import Money from '../component/mypage/Money.jsx';
import Coupon from '../component/mypage/Coupon.jsx';
import { AuthContext } from '../auth/AuthContext.js';
import { useContext } from 'react';
import { MypageContext } from '../context/MypageContext.js';
import { useMypage } from '../hooks/useMypage.js';
import {useLogin} from '../hooks/useLogin.js';

export default function Mypage() {
    const { isLoggedIn } = useContext(AuthContext);
    const { myinfo, year, month, date, gender ,myOrder,wishList, myReview} = useContext(MypageContext);
    const {handleLogin} = useLogin();
    const [tab, setTab] = useState('main');
    const { getMyinfo, getMyOrder ,getWishNumber,getReview} = useMypage();
    const [isChecked1, setIsChecked1] = useState(false); 
    const [isChecked2, setIsChecked2] = useState(false); 
    useEffect(() => {
        getMyinfo();
        getMyOrder();
        getWishNumber();
        getReview();
        if (gender === 'M') {
            setIsChecked1(true);
            setIsChecked2(false);
        } else if (gender === 'F') {
            setIsChecked2(true);
            setIsChecked1(false);
        } else {
            setIsChecked1(false);
            setIsChecked2(false);
        }
    }, [isLoggedIn]);

    const logout = () => {
        handleLogin(false,'logout');
    }

    return (
        <div className='mypage-box'>
            <div className='mypage-top'>
                <div onClick={() => { setTab('main') }}>
                    My Shop
                </div>
                <div>
                    <button onClick={() => { setTab('my') }}>나의 정보</button>
                    <button onClick={logout}>로그아웃</button>
                </div>
            </div>
            {tab === 'main' &&
                <div className='mypage-top2'>
                    <ul>
                        <li>
                            <h4 onClick={() => { setTab('my') }}>{myinfo.name}님</h4>
                            <h5>반가워요 :)</h5>
                            <span>{myinfo.membership}</span>
                        </li>
                        <li onClick={() => { setTab('order') }} >
                            <p>주문</p>
                            <span>{myOrder.length}개</span>
                        </li>
                        <li onClick={() => { setTab('money') }}>
                            <p>적립금</p>
                            <span>0원</span>
                        </li>
                        <li onClick={() => { setTab('coupon') }}> 
                            <p>쿠폰</p>
                            <span>2개</span>
                        </li>
                    </ul>
                </div>}
            <div className='mypage-cate'>
                <ul>
                    <li onClick={() => { setTab('order') }}>주문내역</li>
                    <li onClick={() => { setTab('wish') }}>관심상품</li>
                    <li onClick={() => { setTab('money') }}>적립금</li>
                    <li onClick={() => { setTab('coupon') }}>쿠폰</li>
                    <li onClick={() => { setTab('review') }}>리뷰 관리</li>
                    <li onClick={() => { setTab('delivery') }}>배송지 관리</li>
                </ul>
            </div>
            {tab === 'order' && myOrder && <Order/>}
            {tab === 'wish' && wishList && <Wish wishList ={wishList}/>}
            {tab === 'money' && <Money myOrder = {myOrder}/>}
            {tab === 'coupon' && <Coupon />}
            {tab === 'review' && <ReviewMypage myOrder = {myOrder} myReview = {myReview}/>}
            {tab === 'delivery' && myinfo && <Delivery myinfo={myinfo} births={{ year, month, date }} />}
            {tab === 'my' && <UpdateMypage Checked={{ isChecked1, isChecked2, setIsChecked1, setIsChecked2 }} myinfo={myinfo} births={{ year, month, date, gender }} />}
            {tab === 'main' &&
                <>
                    <div className='mypage-desc'>
                        <p>	저희 쇼핑몰을 이용해 주셔서 감사합니다.
                            <span> {myinfo.name} 님</span>은
                            <span> [{myinfo.membership}]</span> 회원이십니다.</p>
                        <p><span>10,000원 이상 </span>구매시
                            <span> 1%</span>를 추가적립 받으실 수 있습니다.</p>
                    </div>
                    <div className='mypage-middle-box'>
                        <div>
                            <ul>
                                <li>
                                    <span>가용적립금</span>
                                    <span>0원</span>
                                    <button>조회</button>
                                </li>
                                <li>
                                    <span>사용적립금</span>
                                    <span>0원</span>
                                </li>
                                <li>
                                    <span>쿠폰</span>
                                    <span>2개</span>
                                    <button>조회</button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span>총적립금</span>
                                    <span>0원</span>
                                </li>
                                <li>
                                    <span>총주문</span>
                                    <span>{myOrder.length} 회</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mypage-bottom-box'>
                        <div>
                            <span>나의 주문처리 현황</span>
                            <span>(최근 3개월 기준)</span>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <p>입금전</p>
                                    <span>{myOrder.filter((item)=> item.delivery_status === '입금전').length}</span>
                                </li>
                                <li>
                                    <p>배송준비중</p>
                                    <span>{myOrder.filter((item)=> item.delivery_status === '배송준비중').length}</span>
                                </li>
                                <li>
                                    <p>배송중</p>
                                    <span>{myOrder.filter((item)=> item.delivery_status === '배송중').length}</span>
                                </li>
                                <li>
                                    <p>배송완료</p>
                                    <span>{myOrder.filter((item)=> item.delivery_status === '배송완료').length}</span>
                                </li>
                                <li>
                                    <li>· 취소 : <span>0</span></li>
                                    <li>· 교환 : <span>0</span></li>
                                    <li>· 반품 : <span>0</span></li>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

