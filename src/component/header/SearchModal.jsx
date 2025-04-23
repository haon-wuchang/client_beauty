import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { SearchContext } from '../../context/SearchContext.js';

export default function SearchModal({setSearchModalOpen}) {
    const navigate = useNavigate();
    const { setSearchKeyword } = useContext(SearchContext); 
    const [ search, setSearch ] = useState(""); 

    const clickSearch = () => {
        setSearchKeyword(search);
        setSearchModalOpen(false);
        navigate("/search");
    }

    return (
        <div className='search-modal-wrap'>
            <p className='search-modal-close-btn' onClick={() => setSearchModalOpen(false)}><IoCloseOutline /></p>
            <p className='search-modal-title'>Search</p>
            <div className='search-modal-input'>
                <input 
                    type="text" 
                    placeholder='검색어를 입력해주세요.'
                    onChange={(event) => setSearch(event.target.value)}
                />
                <span onClick={clickSearch}><IoSearchOutline/></span>
            </div>
            <p className='search-modal-desc'>Trend Search</p>
            <ul className='search-modal-trend-list'>
                <li># 광채프로폴리스세럼</li>
                <li># 선크림</li>
                <li># 맑은쌀선크림</li>
                <li># 선스틱</li>
                <li># 프로폴리스</li>
                <li># 선세럼</li>
            </ul>
        </div>
    );
}