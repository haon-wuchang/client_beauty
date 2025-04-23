import { createContext, useState } from "react";

export const CartContext = createContext(); 

export const CartProvider = ({children}) => { 
    const [cartList, setCartList] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectPrice, setSelectPrice] = useState(0);
    const [cids, setCids] = useState([]); // 장바구니 아이템 개별 선택시 cid 배열 생성, 저장
    const [selectItems, setSelectItems] = useState([]);

    return(
        <CartContext.Provider value={{cartList, setCartList, 
                                    cartCount, setCartCount,
                                    totalPrice, setTotalPrice,
                                    cids, setCids,
                                    selectItems, setSelectItems,
                                    selectPrice, setSelectPrice }}> 
            {children}
        </CartContext.Provider>
    );

}