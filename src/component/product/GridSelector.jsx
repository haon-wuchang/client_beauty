import React from 'react';
import { TbLayoutListFilled } from "react-icons/tb";
import { IoGrid } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";

export default function GridSelector({ setGridClass }) {
    return (
        <ul className='grid-icon'>
            <li onClick={() => setGridClass("product-grid-2")}><TbLayoutListFilled style={{ cursor: 'pointer' }} /></li>
            <li onClick={() => setGridClass("product-grid-3")}><IoGrid style={{ cursor: 'pointer' }} /></li>
            <li onClick={() => setGridClass("product-grid-4")}><BsGrid3X3GapFill style={{ cursor: 'pointer' }} /></li>
        </ul>
    );
}
