import {createContext, useState, useEffect} from 'react'; 

export const ProductContext = createContext(); 

export const ProductProvider = ({children}) => {  
    const [wishList, setWishList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]); // 상품 목록 페이지 상품 배열 관리
    const [selectedCategory, setSelectedCategory] = useState('all'); // 제품 목록 페이지 카테고리 선택 관리
    const [selectedSubCate, setSelectedSubCate] = useState('all'); // 제품 목록 페이지 서브 카테고리 선택 관리
    const [subCateList, setSubCateList] = useState([]); // 서브 카테고리 아이템 목록

    return ( 
        <ProductContext.Provider 
        value ={{ wishList, setWishList,
                    reviews, setReviews,
                    products, setProducts,
                    selectedCategory, setSelectedCategory,
                    selectedSubCate, setSelectedSubCate,
                    subCateList, setSubCateList
                }}> 
            {children}
        </ProductContext.Provider>
    );
}