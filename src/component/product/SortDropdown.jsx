import React from 'react';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

export default function SortDropdown({ isSortOpen, setIsSortOpen, setSortType }) {
    return (
        <div className='sort-wrap' style={{ position: "relative" }}>
            <div className='sort-btn' onClick={() => setIsSortOpen(prev => !prev)}>
                <span>sort</span>
                {isSortOpen ? <GoTriangleUp /> : <GoTriangleDown />}
            </div>
            {isSortOpen && (
                <ul className='sort-dropdown'>
                    <li onClick={() => setSortType("new")}>신상품</li>
                    <li onClick={() => setSortType("name")}>상품명</li>
                    <li onClick={() => setSortType("lowPrice")}>낮은가격</li>
                    <li onClick={() => setSortType("highPrice")}>높은가격</li>
                    <li onClick={() => alert("아직 준비중입니다.")}>인기상품</li>
                </ul>
            )}
        </div>
    );
}
