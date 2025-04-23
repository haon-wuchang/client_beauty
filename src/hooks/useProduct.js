import React, { useContext } from "react";
import axios from "axios";
import { ProductContext } from "../context/productContext.js";



export function useProduct() {
    const { setWishList, reviews, setReviews, setProducts, setSelectedCategory, setSubCateList } = useContext(ProductContext);

     /********************************************
            리뷰 불러오기
            (리뷰 작성은 별도의 컴포넌트 생성)
            작성자 : 정서령
    ********************************************/

    
            const getReview = async (pid) => {
                const result = await axios.post("http://15.165.205.38:9000/product/getReview", { pid });
              
            
                setReviews(result.data);
              };
              

    /********************************************
            위시리스트 불러오기 
            - 로그인한 유저의 위시리스트 
            작성자 : 정서령
    ********************************************/
    /* 로그인한 유저의 위시리스트 불러오기 */

    const getWishList = async () => {
        const { data } = await axios.post("http://15.165.205.38:9000/product/getWishList", {
            id: localStorage.getItem("user_id"),
        });
    
        // 파싱
        return Array.isArray(data) ? data : JSON.parse(data);
    };
    
    /********************************************
            위시리스트 추가
            - pid 중복 거름
            작성자 : 정서령
    ********************************************/

    const addWishList = async (pid) => {
        const id = localStorage.getItem("user_id");
        if (!id) return;
    
        const wishList = await getWishList();
    
        if (!wishList.includes(pid)) {
            wishList.push(pid);
            await axios.post("http://15.165.205.38:9000/product/addWishList", {
                id,
                wishList,
            });
            setWishList(wishList);
        }
    };

    /********************************************
            상품 대분류 카테고리 선택
            - 선택한 카테고리의 상품 호출
            작성자 : 정서령, 김유나
    ********************************************/
    const getCategoryItems = async(category) => {
        setSelectedCategory(category);

        try {
            const res = await axios.post('http://15.165.205.38:9000/product/list', {
                category_id: category === 'all' ? null : category
            });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    /********************************************
            상품 소분류 카테고리 선택
            - 선택한 카테고리의 상품 호출
            작성자 : 정서령, 김유나
    ********************************************/
    const getSubCateItems = async(category) => {
        setSelectedCategory(category);

        try {
            const res = await axios.post('http://15.165.205.38:9000/product/subList', {"category": category});
            setSubCateList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return { addWishList, getReview, getWishList, getCategoryItems, getSubCateItems };
}