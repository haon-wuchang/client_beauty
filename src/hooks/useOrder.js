import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cartContext.js";
import { OrderContext } from '../context/orderContext.js';
import { useCart } from "./useCart.js";

export function useOrder() {
    const { setCartCount } = useContext(CartContext);
    const { orderList, setOrderList, setOrderPrice, setMember, SetCompletedOrderList, orderNumber, setOrderNumber } = useContext(OrderContext);
    const { getCartList, clearCart } = useCart();
    
    /********************************************
        장바구니 아이템 총 금액 계산
        사용처 : payment
        작성자 : 김유나
    ********************************************/
    const calculateTotalPrice = (orderList) => {
        const totalPrice = orderList.reduce((sum, item) => sum + item.discount_price * item.qty, 0);
        setOrderPrice(totalPrice);
        return totalPrice;
    }


    /********************************************
        장바구니 목록 전체 조회(전체상품주문)
        사용처 : Payment
        작성자 : 김유나
    ********************************************/
    const getCartAll = async() => {
        const id = localStorage.getItem("user_id");
        const result = await axios.post("http://15.165.205.38:9000/order/all", {"id": id});

        setOrderList(result.data);
        setMember(result.data[0]);
        calculateTotalPrice(result.data);

        return result.data;
    }


    /********************************************
        장바구니 선택 목록 조회(선택상품주문)
        사용처 : Payment
        작성자 : 김유나
    ********************************************/
    const getSelectItems = async() => {
        const cids = localStorage.getItem("cids");
        const id = localStorage.getItem("user_id");

        const formData = {
            "cids": cids,
            "id": id
        };

        const result = await axios.post("http://15.165.205.38:9000/order/select", formData);

        setOrderList(result.data);
        setMember(result.data[0]);
        calculateTotalPrice(result.data);

        return result.data;
    }

    /********************************************
        결제 페이지 배송지 수정
        사용처 : payment
        작성자 : 김유나
    ********************************************/
    const updateDelivery = async(formData) => {
        const result = await axios.post("http://15.165.205.38:9000/order/updateDelivery", formData);
        result.data.result_rows && getCartAll();
        
        return result.data.result_rows;
    }


    /********************************************
        구매 상품 주문 테이블에 저장
        사용처 : Payment
        작성자 : 김유나
    ********************************************/
    const saveToOrder = async() => {
        const orderType = localStorage.getItem("ORDERTYPE");
        const id = localStorage.getItem("user_id");
        let orderList = [];
        let result_rows = 0;

        // 날짜 생성(order_number 랜덤하게 생성하기 위해 사용)
        const dateNumber = () => {
            const date = new Date();
            const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
            const randomNumber = Math.floor(10000 + Math.random() * 90000);
            return `${formattedDate}-${randomNumber}`;
        }
    
        const orderNumber = dateNumber();
        
        if (orderType === "all") {
            orderList = await getCartAll();
        } else {
            orderList = await getSelectItems();
        }

        let formData = {  
            id: id,
            orderList: orderList,
            orderNumber: orderNumber
        };

        try {
            const result = await axios.post("http://15.165.205.38:9000/order/saveOrder", formData);
            if (result.data.result_rows) {
                result_rows = result.data.result_rows;
                setOrderNumber(orderNumber);
                if (orderType === "all") {
                    const saveOrderList = await getCartAll(); 
                    SetCompletedOrderList(saveOrderList);
                    setMember(saveOrderList[0]);
                    clearCart();
                    setCartCount(0);
                } else {
                    const saveOrderList = await getSelectItems(); 
                    SetCompletedOrderList(saveOrderList);
                    deleteItems();
                }
            }
        } catch (error) {
            console.error("주문테이블 저장 실패:", error);
        }
        
        return result_rows;
    }

    
    
    /********************************************
        선택 주문 완료 후 장바구니 테이블에서 삭제
        사용처 : payment
        작성자 : 김유나
    ********************************************/
    const deleteItems = async() => {
        const cids = localStorage.getItem("cids");
        // const cids = orderList.map((item) => item.cid).join(",");
        console.log("주문번호목록 --> ", cids);
        const result = await axios.delete("http://15.165.205.38:9000/order/deleteItems", {data: {"cids": cids}});

        result.data.result_rows && getCartList();
    }

    /********************************************
        카카오페이 결제 요청
        사용처 : payment
        작성자 : 김유나
    ********************************************/
    const paymentKakaoPay = async() => {
        const id = localStorage.getItem("user_id"); 
        const totalPrice = calculateTotalPrice(orderList);
        const pname = orderList > 1 ? orderList[0].pname.concat(" 외") : orderList[0].pname;
        const type = "KAKAO_PAY"; 

        let formData = {  
                            id: id,  
                            type: type,
                            totalPrice:totalPrice, 
                            orderList:orderList
                        };

        const response = await axios.post("http://15.165.205.38:9000/payment/kakaoQr", {
                        id:id,
                        item_name: pname,
                        total_amount: totalPrice, // 결제 금액 (KRW)
                        formData: formData
                    });

        if (response.data.next_redirect_pc_url) {
            response.data.tid && localStorage.setItem("tid", response.data.tid);
            window.location.href = response.data.next_redirect_pc_url;
        }
    }//paymentKakaoPay


    return { getCartAll, calculateTotalPrice, getSelectItems, saveToOrder, deleteItems, paymentKakaoPay, updateDelivery };
}