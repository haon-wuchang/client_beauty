import React, { useContext, useEffect, useState } from 'react';
import CartTable from '../component/cart/CartTable.jsx';
import CartBill from '../component/cart/CartBill.jsx';
import { CartContext } from '../context/cartContext.js';
import { useCart } from '../hooks/useCart.js';

export default function Cart() {
    const { getCartList } = useCart();
    const { cartList } = useContext(CartContext);
    const [selectStatus, setSelectStatus] = useState("domestic");

    useEffect(() => {
        getCartList();
    }, [cartList]);

    return (
        <div className='cart-page-wrap'>
            <p className='cart-page-title'>Cart</p>
            <div className='cart-item-status'>
                <span onClick={() => setSelectStatus("domestic")}
                    className={selectStatus === 'domestic' ? 'cart-item-select-tab' : 'cart-item-status-tab'}
                >
                    국내배송상품 ({cartList.length})
                </span>
                <span onClick={() => setSelectStatus("oversea")}
                    className={selectStatus === 'oversea' ? 'cart-item-select-tab' : 'cart-item-status-tab'}
                >
                    해외배송상품 (0)
                </span>
            </div>

            { cartList.length > 0
                ? (
                    <>
                        <CartTable /> {/* 카트 상품 목록 */}
                        <CartBill /> {/* 카트 영수증 */}
                    </>
                )
                : (
                    <p className='cart-page-status-msg'>장바구니가 비어 있습니다.</p>
                )
            }

            <div className='cart-page-bottom-notice'>
                <p>이용안내</p>
                <div>
                    <p>장바구니 이용안내</p>
                    <ul>
                        <li>선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
                        <li>[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
                        <li>장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
                        <li>파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
                        <li>해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
                        <li>해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
                    </ul>
                </div>
                <div>
                    <p>무이자할부 이용안내</p>
                    <ul>
                        <li>상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
                        <li>[전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
                        <li>단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
                        <li>무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에 표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다. <br /> 실제 배송비는 함께 주문하는 상품에 따라 적용되오니 주문서 하단의 배송비 정보를 참고해주시기 바랍니다.</li>
                        <li>해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
                        <li>해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}