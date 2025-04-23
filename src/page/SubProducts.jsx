/******************************** 
 *     상품 리스트
 *  작성자 : 정서령
 * ******************************/

import React, { useEffect, useState, useContext } from 'react';
import '../style/product.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext.js";
import { ProductContext } from '../context/productContext.js';
import { useProduct } from "../hooks/useProduct.js";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

// 하위 컴포넌트
import ProductListItem from "../component/product/ProductListItem.jsx"; // 상품 아이템
import CategoryTabs from "../component/product/CategoryTabs.jsx"; // 카테고리별 상품 탭
import SortDropdown from "../component/product/SortDropdown.jsx";  // 유형별 정렬
import GridSelector from "../component/product/GridSelector.jsx"; // 2,3,4열 grid

export default function SubProducts() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const { products, selectedSubCate, setSelectedSubCate, subCateList } = useContext(ProductContext);
    const { getWishList, getSubCateItems } = useProduct();

    const [list, setList] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortType, setSortType] = useState("default");
    const [gridClass, setGridClass] = useState("product-grid-3");
    const [itemOffset, setItemOffset] = useState(0);
    const [subCategoryList, setSubCategoryList] = useState([]);

    // 전체 상품 불러오기
    useEffect(() => {
        axios.post('http://15.165.205.38:9000/product/list')
            .then(res => setList(res.data))
            .catch((error) => console.log(error));
    }, []);

    // 카테고리 목록 탭 생성
    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => setSubCategoryList(res.data.subCategory))
            .catch(err => console.log(err));
    }, []);

    // 카테고리 클릭 시 해당 상품만 불러오기
    const handleCategoryClick = (id) => {
        setSelectedSubCate(id);
        getSubCateItems(id);
        setItemOffset(0);
    };

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

    // 정렬 
    const sortProducts = (products, type) => {
        const sorted = [...products];
        switch (type) {
            case "new": return sorted.sort((a, b) => new Date(b.pdate) - new Date(a.pdate));
            case "name": return sorted.sort((a, b) => a.pname.localeCompare(b.pname));
            case "lowPrice": return sorted.sort((a, b) => a.price - b.price);
            case "highPrice": return sorted.sort((a, b) => b.price - a.price);
            default: return products;
        }
    };

    // 페이지네이션
    const itemsPerPage = 20;
    const currentList = subCateList;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = currentList.slice(itemOffset, endOffset);
    const sortedItems = sortProducts(currentItems, sortType);
    const pageCount = Math.ceil(subCateList.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % currentList.length;
        setItemOffset(newOffset);
    };

    console.log(selectedSubCate);

    return (
        <div className='p-common products-content'>
            <div className='product-all-top'>
                <h5 className='f18'>SHOP ALL</h5>
                <ul className='flex list-none w500'>
                    {
                        subCategoryList && subCategoryList.map((list) => 
                            <li onClick={() => handleCategoryClick(list.id)}
                                className={selectedSubCate === list.id ? 'active' : ''}
                            >
                                {list.title}
                            </li>
                            )
                    }
                </ul>
            </div>

            <div className='product-all-bottom space-between'>
                <div>
                    <span className='f12'>{currentList.length}</span>
                    <span className='f12'>Products</span>
                </div>
                <div className='flex'>
                    <GridSelector setGridClass={setGridClass} />
                    <SortDropdown
                        isSortOpen={isSortOpen}
                        setIsSortOpen={setIsSortOpen}
                        setSortType={setSortType}
                    />
                </div>
            </div>

            <div className={`product-list ${gridClass}`}>
                {sortedItems.map((item) => (
                    <ProductListItem
                        key={item.pid}
                        item={item}
                        wishList={wishList}
                        toggleWish={toggleWish}
                    />
                ))}
            </div>

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
    );
}
