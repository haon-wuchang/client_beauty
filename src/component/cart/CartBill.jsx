import React, { useEffect, useContext } from 'react';
import { CartContext } from '../../context/cartContext.js';
import { OrderContext } from '../../context/orderContext.js';
import { useCart } from '../../hooks/useCart.js';
import { useNavigate } from 'react-router-dom';

export default function CartBill() {
    const navigate = useNavigate();
    const { totalPrice, cids, selectPrice } = useContext(CartContext);
    const { orderType, setOrderType } = useContext(OrderContext);
    const { getSelectItemPrice, getCartList } = useCart();

    useEffect(() => {
        cids.length > 0 ? getSelectItemPrice(cids) : getCartList();
    }, [cids]);

    // 주문 버튼 클릭 이벤트
    const clickOrder = (type) => {
        localStorage.getItem("cids") && localStorage.removeItem("cids");
        localStorage.getItem("ORDERTYPE") && localStorage.removeItem("ORDERTYPE");
        
        if (type === "all") {
            localStorage.setItem("ORDERTYPE", "all");
            navigate("/payment");
        } else { //선택상품 주문
            if (cids.length > 0) {
                const arr = cids.map(item => item.cid).join();
                localStorage.setItem("cids", arr);
                localStorage.setItem("ORDERTYPE", "select");
                navigate("/payment");
            } else {
                alert("선택된 상품이 없습니다.");
            }
        }
    }

    return (
        <>
            {cids.length > 0
                ? (
                    <div className='cart-bill-block'>
                        <div className='cart-bill-block-left'>
                            <p>
                                <span>총 상품금액</span>
                                <br />
                                <span>{selectPrice.toLocaleString()}원</span>
                            </p>
                            <p>
                                <span>총 배송비</span>
                                <br />
                                <span>+ {selectPrice >= 20000 ? "0" : "3,000"}원</span>
                            </p>
                            <p>
                                <span>결제예정금액</span>
                                <br />
                                <span>= {selectPrice >= 20000 ? `${selectPrice.toLocaleString()}` : `${(selectPrice + 3000).toLocaleString()}`}원</span>
                            </p>
                        </div>
                        <div className='cart-bill-block-right'>
                            <div>
                                <button onClick={() => {clickOrder("all")}}>전체상품주문</button>
                                <button onClick={() => {clickOrder("select")}}>선택상품주문</button>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className='cart-bill-block'>
                        <div className='cart-bill-block-left'>
                            <p>
                                <span>총 상품금액</span>
                                <br />
                                <span>{totalPrice.toLocaleString()}원</span>
                            </p>
                            <p>
                                <span>총 배송비</span>
                                <br />
                                <span>+ {totalPrice >= 20000 ? "0" : "3,000"}원</span>
                            </p>
                            <p>
                                <span>결제예정금액</span>
                                <br />
                                <span>= {totalPrice >= 20000 ? `${totalPrice.toLocaleString()}` : `${(totalPrice + 3000).toLocaleString()}`}원</span>
                            </p>
                        </div>
                        <div className='cart-bill-block-right'>
                            <div>
                                <button onClick={() => {clickOrder("all")}}>전체상품주문</button>
                                <button onClick={() => {clickOrder("select")}}>선택상품주문</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}