import React, {useContext} from 'react'; 
import axios from 'axios';
import { SearchContext } from '../context/SearchContext.js';

export function useSearch() {
    const { searchKeyword, searchItems, setSearchItems } = useContext(SearchContext);

    const getSearchItems = async() => {
        // 기존에 있는 상품 전체 목록 호출 주소 재활용
        // const result = await axios.post("http://15.165.205.38:9000/product/list");

        const result = await axios.post("http://15.165.205.38:9000/search");
        setSearchItems(result.data);
    }

    return { getSearchItems };
}