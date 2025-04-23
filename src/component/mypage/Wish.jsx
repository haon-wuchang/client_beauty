import React, { useContext } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import axios from 'axios';
import { CartContext } from '../../context/cartContext';
import { useMypage } from '../../hooks/useMypage';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

export default function Wish({ wishList }) {
    const navigate = useNavigate();
    const { getWishNumber } = useMypage();
    const { cartList } = useContext(CartContext);
    const { updateCartList, saveToCartList } = useCart();
    const id = localStorage.getItem('user_id');

    /* 페이지네이션 */
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    // 페이지네이션 관련 로직
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = wishList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(wishList.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % wishList.length;
        setItemOffset(newOffset);
    };

    const deleteWish = (pid) => {
        const deleteCheck = window.confirm("관심상품을 삭제하시겠습니까?");
        if (deleteCheck) {
            const filterWishList = wishList.filter((item) => item.pid !== pid);
            const newWishList = filterWishList.map(item => item.pid);
            axios.post('http://15.165.205.38:9000/mypage/updateWishList', { 'newWishList': newWishList, 'id': id })
                .then(res => {
                    getWishNumber();
                })
                .catch(error => console.log(error));
        } else {
            navigate('/mypage');
        }
    }

    const deleteAllWish = () => {
        const deleteCheck = window.confirm("관심상품 전체 삭제를 하시겠습니까?");
        if (deleteCheck) {
            axios.post('http://15.165.205.38:9000/mypage/deleteAllWishList', { 'id': id })
                .then(res => {
                    getWishNumber();
                })
                .catch(error => console.log(error));
        } else {
            navigate('/mypage');
        }
    }

    const addCart = (pid) => {
        const cartItem = { pid: pid, qty: 1 };

        const findItem = cartList && cartList.find(item => item.pid === pid);
        if (findItem) {
            const result = updateCartList(findItem.cid, "increase", 1);
            if (result) {
                alert("장바구니에 추가되었습니다.");
                deleteWish(pid);
                getWishNumber();
            }
        } else {
            const id = localStorage.getItem("user_id");
            const formData = { id: id, cartList: [cartItem] }
            const result = saveToCartList(formData);
            if(result){
                alert("장바구니에 추가되었습니다.");
                deleteWish(pid);
                getWishNumber();
            } 
        }
        getWishNumber();
    }

    const addAllCart = () => {
        let result = '';
        wishList.map((ww) => {
            const cartItem = { pid: ww.pid, qty: 1 };

            const findItem = cartList && cartList.find(item => item.pid === ww.pid);
            if (findItem) {
                const result = updateCartList(findItem.cid, "increase", 1);
                if (result) {
                    alert("장바구니에 추가되었습니다.");
                    deleteWish(ww.pid);
                    getWishNumber();
                }
            } else {
                const id = localStorage.getItem("user_id");
                const formData = { id: id, cartList: [cartItem] }
                result = saveToCartList(formData);
                if (result) {
                    alert("장바구니에 추가되었습니다.");
                    deleteWish(ww.pid);
                    getWishNumber();
                }
            }
            getWishNumber();
        })
        result && alert("모든 상품이 장바구니에 추가되었습니다.")
    }
    return (
        <div className='mypage-wish-all'>
            <div className='mypage-update-info-title mypage-title'>관심상품
                <span>장바구니에 상품이 담기면 관심상품목록에서 상품이 삭제됩니다.</span>
            </div>
            <div className='mypage-wish-table'>
                <table>
                    <tr>
                        <td>상품정보</td>
                        <td>판매가</td>
                        <td></td>
                    </tr>
                    {currentItems && currentItems.map((item) => (
                        <tr className='mypage-wish-table-info'>
                            <td>
                                <img src={item.main_image} alt="" />
                                <span>{item.pname}</span>
                            </td>
                            <td>{item.price.toLocaleString().concat('원')}</td>
                            <td>
                                <button>주문하기</button>
                                <button onClick={() => { addCart(item.pid) }}>장바구니 담기</button>
                                <button onClick={() => { deleteWish(item.pid) }}>관심상품 삭제</button>
                            </td>
                        </tr>

                    ))}
                </table>
            </div>
            <div className='mypage-wish-btns'>
                <button onClick={addAllCart}>전체상품주문</button>
                <button onClick={deleteAllWish}>관심상품 전체 삭제</button>
            </div>
            <div className='mypage-wish-page'>
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
        </div>
    );
}

