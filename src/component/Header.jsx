import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext.js';
import { ProductContext } from '../context/productContext.js';
import { MypageContext } from '../context/MypageContext.js';
import { CartContext } from '../context/cartContext.js';
import { useProduct } from '../hooks/useProduct.js';
import { useLogin } from '../hooks/useLogin.js';
import { useMypage } from '../hooks/useMypage.js';
import { useCart } from '../hooks/useCart.js';
import { GoPerson } from "react-icons/go";
import { PiShoppingBag } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { GoLock } from "react-icons/go";
import { GoUnlock } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import Slider from "react-slick";
import HeaderToggle from './header/HeaderToggle.jsx';
import Modal from 'react-modal';
import SearchModal from './header/SearchModal.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCategory } = useContext(ProductContext);
    const { isLoggedIn } = useContext(AuthContext);
    const { myinfo } = useContext(MypageContext);
    const { cartCount } = useContext(CartContext);
    const { getCategoryItems } = useProduct();
    const { getMyinfo } = useMypage();
    const { handleLogin } = useLogin();
    const { getCartList } = useCart();
    const [ toggleOpen, setToggleOpen ] = useState(false); // 메뉴 토글 버튼 클릭시 상태 관리
    const [ searchModalOpen, setSearchModalOpen ] = useState(false);  // 검색 모달창 상태 관리

    useEffect(() => {
        // console.log("Header 컴포넌트에서 isLoggedIn 상태 변경 감지:", isLoggedIn);
        getMyinfo();
        getCartList(); // Header 장바구니 아이콘에 아이템 갯수 표시 위해 실행
    }, [isLoggedIn]); // 🔥 상태 변경될 때마다 실행  

    /* PROUDCT 버튼 클릭 이벤트 */
    const clickProduct = () => {
        getCategoryItems('all');
        // if (location !== 'product/list') {
        //     getCategoryItems('all');
        //     navigate('/product/list');
        // } else {
        //     getCategoryItems(selectedCategory);
        // }
    }

    /* 로그아웃 버튼 클릭 이벤트 */
    const logout = () => {
        handleLogin(false,'logout');
    }

    /* 마이페이지 버튼 클릭 이벤트 */
    const handleMypage = () => {
        const handleLog = window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?");
        (handleLog) ? navigate('/login') : navigate('/');
    }

    /* 장바구니 버튼 클릭 이벤트 */
    const clickCartIcon = () => {
        if (!isLoggedIn) {
            window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?") && navigate('/login');
        }
    }

    /* 슬라이더 세팅 */
    const settings = {
        dots: false,
        infinite: true,
        vertical: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };

    /* 모달 */
    const customModalStyles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "350px",
            height: "100%",
            zIndex: "150",
            position: "fixed",
            top: "0",
            right: "0",
            left: "auto",
            margin: "0",
            backgroundColor: "white",
            justifyContent: "center",
            overflow: "auto",
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        },
    };

    return (
        <div className='header-wrap'>
            <div className='header-top-notice'>
                <Slider {...settings}>
                    <p className='header-top-notice-text'>회원가입시 <b>가입별 혜택 제공</b></p>
                    <p className='header-top-notice-text'>모든 구매고객 <b>샘플 3종 랜덤 증정</b></p>
                    <p className='header-top-notice-text'>조선미녀 카톡 친구추가 시 <b>5,000원 할인쿠폰 증정</b></p>
                </Slider>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-container'>
                    <div className='header-bottom-left'>
                        <Link to="/">
                            <img className='header-bottom-left-main-logo' src="/images/beautyofjoseon_logo.jpg" alt="mainLogo" />
                        </Link>
                    </div>
                    <div className='header-bottom-right'>
                        <nav className='header-bottom-right-nav'>
                            <Link to="/">HOME</Link>
                            <Link to="/product/list"
                                    onClick={clickProduct}
                            >
                                PRODUCT
                            </Link>
                            <Link to="/">BRAND STORY</Link>
                            <Link to="/">MEMBERSHIP</Link>
                            <Link to="/">PRESS</Link>
                            {
                            myinfo.type === 'a' ?
                            <Link to="/admin" style={{color : 'blue'}}>ADMIN</Link> : null 
                            }
                        </nav>
                        <ul className='header-bottom-right-icons'>
                            {isLoggedIn ?
                                (<li onClick={logout}><Link to="/login"><GoUnlock /></Link></li>) :
                                (<li><Link to="/login"><GoLock /></Link></li>)}
                            <li onClick={!isLoggedIn ? handleMypage : getMyinfo} ><Link to="/mypage"><GoPerson /></Link></li>

                            <li onClick={clickCartIcon}>
                                <Link to={isLoggedIn && "/cart"}>
                                    <PiShoppingBag />
                                    { isLoggedIn && cartCount > 0 && 
                                        <div>{cartCount}</div> }
                                </Link>
                            </li>

                            <li onClick={() => setSearchModalOpen(!searchModalOpen)}><Link><IoSearchOutline /></Link></li>
                                {/* 검색 버튼 클릭시 보이는 모달 컴포넌트 */}
                                <Modal
                                    isOpen={searchModalOpen}
                                    onRequestClose={() => setSearchModalOpen(false)}
                                    style={customModalStyles}
                                    ariaHideApp={false}
                                    contentLabel="Search Modal"
                                >
                                    <SearchModal setSearchModalOpen={setSearchModalOpen} />
                                </Modal>

                            {
                                toggleOpen
                                    ? <li><Link onClick={() => setToggleOpen(!toggleOpen)}><IoCloseOutline /></Link></li>
                                    : <li><Link onClick={() => setToggleOpen(!toggleOpen)}><BsList /></Link></li>
                            }
                        </ul>
                    </div>
                </div>

                {/* 헤더 토글 버튼 클릭시 나오는 컴포넌트 */}
                <HeaderToggle toggleOpen={toggleOpen} setToggleOpen={setToggleOpen} /> 
            </div>
        </div>
    );
}