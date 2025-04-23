import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { SearchContext } from '../context/SearchContext.js';
import { AuthContext } from '../auth/AuthContext.js';
import { useSearch } from '../hooks/useSearch.js';
import { useProduct } from '../hooks/useProduct.js';
import axios from 'axios';

export default function Search() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const { getWishList } = useProduct();
    const [ wishList, setWishList ] = useState([]);
    const { searchKeyword, setSearchKeyword, searchItems } = useContext(SearchContext); // 전역에서 관리하는 검색 키워드
    const { getSearchItems } = useSearch();
    const [ search, setSearch ] = useState(""); // 로컬에서 관리하는 검색 키워드

    useEffect(() => {
        getSearchItems();
    }, []);

    // 위시리스트 불러오기
    useEffect(() => {
        const fetchWishList = async () => {
            const id = localStorage.getItem("user_id");
            if (!id) return;

            try {
                const wish = await getWishList();
                setWishList(wish);
            } catch (err) {
                console.error("위시리스트 불러오기 실패", err);
                setWishList([]);
            }
        };
        fetchWishList();
    }, []);

    // 위시리스트 토글
    const toggleWish = async (pid) => {
        if (!isLoggedIn) {
            alert("로그인 후에 사용할 수 있는 서비스입니다.");
            return navigate("/login");
        }

        const id = localStorage.getItem("user_id");
        const isWished = wishList.includes(pid);
        const newWish = isWished
            ? wishList.filter(item => item !== pid)
            : [...wishList, pid];

        try {
            await axios.post("http://15.165.205.38:9000/mypage/updateWishList", {
                id,
                newWishList: newWish,
            });
            setWishList(newWish);
            if (!isWished) alert("위시리스트에 추가되었습니다.");
        } catch (err) {
            console.error("위시리스트 업데이트 실패", err);
        }
    };
    
    /* 검색창 검색 버튼 클릭 이벤트 */
    const clickSearch = () => {
        setSearchKeyword(search);
    }
    
    /* 검색어와 일치하는 상품 필터링(기준점) */
    const pnameFilter = searchItems.filter((item) => item.pname.toLowerCase().includes(searchKeyword.toLowerCase()));
    const SubCateFilter = searchItems.filter((item) => item.sub_category_name.toLowerCase().includes(searchKeyword.toLowerCase()));

    return (
        <div className='search-page-wrap'>
            <p className='search-page-title'>Search</p>
            <div className='search-page-input'>
                <input 
                    type="text"
                    placeholder="검색어를 입력해주세요." 
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <span onClick={clickSearch}><IoSearchOutline/></span>
            </div>
            <p className='search-page-desc'>
                총 <span>{pnameFilter.length > 0 ? pnameFilter.length : SubCateFilter.length}개</span>의 상품이 검색되었습니다.
            </p>
            <div>
                {
                    pnameFilter.length !== 0
                    ? (
                        pnameFilter.length > 0
                        ? (
                            <ul className='search-page-products'>
                                { pnameFilter.map((item) => 
                                    <Link to={`/product/detail/${item.pid}`} className="search-page-product-block">
                                        <li className="search-page-product-list">
                                            <div className="search-page-product-image-container">
                                                <img className="search-page-product-image"
                                                    src={`http://15.165.205.38:9000/${item.main_image}`}
                                                    alt={`${item.pid}번 상품 이미지`} />
                                                {/* <div className="search-page-product-like">
                                                    <GoHeart />
                                                </div> */}
                                                <div className="search-page-product-like"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleWish(item.pid);
                                                    }}
                                                >
                                                    {wishList.includes(item.pid) ? <FaHeart color="red" /> : <FaRegHeart />}
                                                </div>
                                            </div>
                                            <div className="search-page-product-detail">
                                                <p className="search-page-product-detail-title">{item.pname}</p>
                                                {
                                                    item.discount_rate === 0
                                                        ? <p className="search-page-product-detail-price">{item.price}원</p>
                                                        : <>
                                                            <p className="search-page-product-detail-oprice">{item.price}</p>
                                                            <p className="search-page-product-detail-dprice"><span>{item.discount_rate}%</span><span>{item.discount_price}원</span></p>
                                                        </>
                                                }
                                            </div>
                                        </li>
                                    </Link>
                                ) }
                            </ul>
                        )
                        : (
                            <p className="search-page-result-nothing">검색 결과가 없습니다.</p>
                        )
                    )
                    : (
                        SubCateFilter.length > 0
                        ? (
                            <ul className='search-page-products'>
                                {SubCateFilter.map((item) => 
                                    <Link to={`/product/detail/${item.pid}`} className="search-page-product-block">
                                        <li className="search-page-product-list">
                                            <div className="search-page-product-image-container">
                                                <img className="search-page-product-image"
                                                    src={`http://15.165.205.38:9000/${item.main_image}`}
                                                    alt={`${item.pid}번 상품 이미지`} />
                                                <div className="search-page-product-like"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleWish(item.pid);
                                                    }}
                                                >
                                                    {wishList.includes(item.pid) ? <FaHeart color="red" /> : <FaRegHeart />}
                                                </div>
                                            </div>
                                            <div className="search-page-product-detail">
                                                <p className="search-page-product-detail-title">{item.pname}</p>
                                                {
                                                    item.discount_rate === 0
                                                        ? <p className="search-page-product-detail-price">{item.price}원</p>
                                                        : <>
                                                            <p className="search-page-product-detail-oprice">{item.price}</p>
                                                            <p className="search-page-product-detail-dprice"><span>{item.discount_rate}%</span><span>{item.discount_price}원</span></p>
                                                        </>
                                                }
                                            </div>
                                        </li>
                                    </Link>
                                )}
                            </ul>
                        )
                        : (
                            <p className="search-page-result-nothing">검색 결과가 없습니다.</p>
                        )
                    )
                }
            </div>
        </div>
    );
}