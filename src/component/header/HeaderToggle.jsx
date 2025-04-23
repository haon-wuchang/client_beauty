import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductContext } from '../../context/productContext.js';
import { useProduct } from '../../hooks/useProduct.js';

export default function HeaderToggle({toggleOpen, setToggleOpen}) {
    const navigate = useNavigate();
    const { products, selectedSubCate, setSelectedSubCate, subCateList } = useContext(ProductContext);
    const { getCategoryItems, getSubCateItems } = useProduct();
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => {
                setCategoryList(res.data.mainCategory);
                setSubCategoryList(res.data.subCategory);
            })
            .catch(err => console.log(err));
    }, []);

    /* 카테고리 선택 이벤트 */
    const clickCategory = (id) => {
        getCategoryItems(id);
        setToggleOpen(false);
        navigate("/product/list");
    }
    
    /* 서브 카테고리 선택 이벤트 */
    const clickSubCategory = (id) => {
        getSubCateItems(id);
        setSelectedSubCate(id);
        setToggleOpen(false);
        navigate("/product/list/sub");
    }

    return (
        <div className={`header-bottom-menu-wrapper ${toggleOpen ? "open" : ""}`}>
            <div className="header-bottom-menu">
                <div className='header-bottom-menu-left'>
                    <div className='header-bottom-menu-category'>
                        <span>Shop All</span>
                        <ul className='header-bottom-menu-category-list'>
                            {
                                categoryList && categoryList.map((list) => 
                                    <li onClick={() => clickCategory(list.id)}>
                                        {list.title}
                                    </li>
                                    )
                            }
                        </ul>
                    </div>
                    <div className='header-bottom-menu-sub-category'>
                        <span>유형별</span>
                        <ul className='header-bottom-menu-sub-category-list'>
                            {
                                subCategoryList && subCategoryList.map((list) => 
                                    <li onClick={() => clickSubCategory(list.id)}>
                                        {list.title}
                                    </li>
                                    )
                            }
                        </ul>
                    </div>
                </div>
                <div className='header-bottom-menu-right'>
                    <img src="/images/header_menu_image.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}

/*
    필요 기능
1. 카테고리 선택 시 useProduct에 있는 getSelectedItems 함수 사용해 값 넘겨주고 /product/list로 페이지 이동
2. 서브 카테고리 선택 시 카테고리 선택했을 때와 동일하게 기능할 수 있도록 로직 추가
*/