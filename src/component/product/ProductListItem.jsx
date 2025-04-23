// ProductItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function ProductItem({ item, wishList, toggleWish }) {
    return (
        <Link key={item.pid} to={`/product/detail/${item.pid}`}>
            <div className='product-item'>
                <div className='product-img-wrap'>
                    <img src={item.image} alt="" />
                </div>

                <span className="wish-icon" onClick={(e) => {
                    e.preventDefault();
                    toggleWish(item.pid);
                }}>
                    {wishList.includes(item.pid) ? <FaHeart color="red" /> : <FaRegHeart />}
                </span>

                <span className='product-title w600 text-center f15'>{item.pname}</span>
                <p className='product-price pt10 f12'>
                    {item.discount_rate ? `${item.price.toLocaleString()}원` : null}
                </p>

                <div className='gap5 flex'>
                    {item.discount_rate ? (
                        <div className='product-sale'>
                            {`${item.discount_rate.toLocaleString()}%`}
                        </div>
                    ) : null}
                    <div className='product-sale-price'>
                        {`${(item.price * (1 - item.discount_rate / 100)).toLocaleString()}원`}
                    </div>
                </div>
            </div>
        </Link>
    );
}
