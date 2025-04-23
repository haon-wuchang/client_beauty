import { createContext, useState } from "react";

export const OrderContext = createContext(); 

export const OrderProvider = ({children}) => { 

    const [orderList, setOrderList] = useState([]); // 주문 목록
    const [orderType, setOrderType] = useState("");
    const [orderPrice, setOrderPrice] = useState(0);
    const [member, setMember] = useState({});
    const [completedOrderList, SetCompletedOrderList] = useState([]); // 주문완료 목록(orders 테이블 목록)
    const [orderNumber, setOrderNumber] = useState(""); // 주문완료시 생성되는 주문번호 저장

    return(
        <OrderContext.Provider value={{orderList, setOrderList,
                                        orderType, setOrderType,
                                        orderPrice, setOrderPrice,
                                        member, setMember,
                                        completedOrderList, SetCompletedOrderList,
                                        orderNumber, setOrderNumber}}> 
            {children}
        </OrderContext.Provider>
    );

}