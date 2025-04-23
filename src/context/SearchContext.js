import {createContext, useState} from 'react'; 

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 관리
    const [searchItems, setSearchItems] = useState([]); // 검색 키워드로 필터링한 상품 목록 배열 관리

    return (
        <SearchContext.Provider value={{searchKeyword, setSearchKeyword, searchItems, setSearchItems}}>
            {children}
        </SearchContext.Provider>
    );
}