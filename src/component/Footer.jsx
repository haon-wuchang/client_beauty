import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer-box'>
            <div className='footer-top-box'>
                <div className='footer-top-left'>
                    <Link to="/">
                    <img  className='footer-top-left-img'
                        src="https://beautyofjoseon.co.kr/web/upload/category/editor/2023/10/06/eb41d532709809ce6016bed1b1d649ca.png" alt="" />
                    </Link>
                </div>
                <div className='footer-top-right'>
                    <div className='footer-top-right-boxs'>
                        <ul>
                            <li>SHOPPING</li>
                            <li>마이쇼핑</li>
                            <li>주문배송조회</li>
                            <li>교환 및 환불안내</li>
                            <li>장바구니</li>
                            <li>관심상품</li>
                        </ul>
                    </div>
                    <div className='footer-top-right-boxs'>
                        <ul>
                            <li>COMMUNITY</li>
                            <li>이벤트</li>
                            <li>상품사용후기</li>
                            <li>자주묻는질문</li>
                            <li>멤버십</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer-middle-line1'>
                <ul>
                    <li><a href="">HOME</a></li>
                    <li><a href="">COMPANY</a></li>
                    <li><a href="">AGREEMENT</a></li>
                    <li><a href="">PRIVACY POLICY</a></li>
                    <li><a href="">GUIDE</a></li>
                </ul>            
            </div>
            <div className='footer-middle-line2'>
                <ul>
                    <li>
                        <span>주식회사구다이글로벌</span>                        
                        </li>
                    <li>
                        <span>대표자</span>
                        <span>천주혁</span>
                    </li>
                    <li>
                        <span>사업자등록번호</span>
                        <span>151-87-00589</span>
                    </li>
                    <li>
                        <span>통신판매업신고</span>
                        <span>2023-서울구로-0367</span>
                    </li>
                    <li>
                        <span>대표전화</span>
                        <span>070-4213-7412</span>
                    </li>
                    <li>
                        <span>이메일</span>
                        <span>support_kr@beautyofjoseon.com</span>
                    </li>
                    <li>
                        <span>주소</span>
                        <span>서울특별시 구로구 디지털로26길 5 에이스하이엔드타워1차 502호</span>
                    </li>
                    <li>
                        <span>개인정보보호책임자</span>
                        <span>천주혁</span>
                    </li>
                </ul>
            </div>
            <div className='footer-bottom-logo'>
                <span><FaInstagram /></span>
                <span><FaYoutube /></span>
                <span><RiKakaoTalkFill /></span>
                <span><FaTiktok /></span>
            </div>
            <div className='footer-bottom-last'>
            Copyright © 조선미녀 . All rights reserved.
            </div>
        </div>
    );
}

