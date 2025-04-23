import {createContext, useState, useEffect} from 'react'; 

export const MypageContext = createContext(); 

export const MypageProvider = ({children}) => {  
    const [myinfo, setMyinfo] = useState([]);
    const [year, setYear] = useState([]);
    const [month, setMonth] = useState([]);
    const [date, setDate] = useState([]);
    const [gender,setGender] = useState([]);
    const [zipcode,setZipcode] = useState([]);
    const [address,setAddress] = useState([]);
    const [extra,setExtra] = useState([]);
    const [myOrder , setMyOrder] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [orderType, setOrderType] = useState('전체'); // 셀렉트박스
    const [orderStart, setOrderStart] = useState('');  // 날짜검색 시작
    const [orderEnd, setOrderEnd] = useState('');  // 날짜검색 종료
    const [myReview, setMyReview] = useState([]);  
    const [lastPid, setLastPid] = useState();

    return ( 
        <MypageContext.Provider 
        value ={{myinfo, setMyinfo,year, setYear,month, setMonth,date, setDate,
            gender,setGender,zipcode,setZipcode,address,setAddress,extra,setExtra,
            myOrder , setMyOrder, wishList, setWishList,orderType, setOrderType,
            orderEnd, setOrderEnd,orderStart, setOrderStart, myReview, setMyReview,
            lastPid, setLastPid
        }}> 
            {children}
        </MypageContext.Provider>
    );
}