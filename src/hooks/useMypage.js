import  { useContext } from 'react';
import axios from 'axios';
import { MypageContext } from '../context/MypageContext.js';
import {AuthContext} from '../auth/AuthContext.js';


export function useMypage() {
    const { setMyinfo, setYear, setMonth, setDate, setGender, setMyOrder,
        setWishList, orderType, orderEnd, orderStart, setMyReview,setLastPid
    } = useContext(MypageContext);
const { isLoggedIn } = useContext(AuthContext);

    const getMyinfo = async () => {
        const id = localStorage.getItem('user_id');
        const result = await axios.post('http://15.165.205.38:9000/mypage/getMyinfo', { 'id': id });
        if (result.data.birth && result.data.gender) {
            setMyinfo(result.data);
            const year = result.data.birth.slice(0, 4);
            const month = result.data.birth.slice(5, 7);
            const date = result.data.birth.slice(8, 10);
            setYear(year);
            setMonth(month);
            setDate(date);
            if (result.data.gender === 'F') {
                setGender('F');
            } else if (result.data.gender === 'M') {
                setGender('M');
            }
        } else if (!result.data.birth && result.data.gender) {
            setMyinfo(result.data);
            setYear('');
            setMonth('');
            setDate('');
            if (result.data.gender === 'F') {
                setGender('F');
            } else if (result.data.gender === 'M') {
                setGender('M');
            }
        } else if (!result.data.birth && !result.data.gender) {
            setMyinfo(result.data);
            setYear('');
            setMonth('');
            setDate('');
            setGender('');
        }
        return result.data;
    }

    const getMyOrder = async () => {
        const id = localStorage.getItem('user_id');
        const result = await axios.post('http://15.165.205.38:9000/mypage/getMyOrder', { 'id': id });
        const data = result.data;
        if (orderType === '전체') {
            setMyOrder(data);
        }
        else if (orderType === '전체' && orderEnd !== '') {
            const allFilter = data.filter((item) =>
                orderStart <= item.odate && item.odate <= orderEnd)
            setMyOrder(allFilter);
        }
        else if (orderType !== '전체' && orderEnd !== '') {
            const filterData = data.filter((item) => item.delivery_status === orderType);
            const doubleFilter = filterData.filter((item) =>
                orderStart <= item.odate && item.odate <= orderEnd)
            setMyOrder(doubleFilter);
        }
    }

    // 위시리스트 번호 가져온 후 상품정보 가져오기
    const getWishNumber = async () => {
        const id = localStorage.getItem('user_id');
        const result = await axios.post('http://15.165.205.38:9000/mypage/getWishNumber', { 'id': id });
        if (result.data.wish !== null && isLoggedIn === true) {
            const list = result.data.wish;
            // setWishList(list);
            const wishListData = await Promise.all(
                list.map(async (item) => {
                    const res = await axios.post('http://15.165.205.38:9000/mypage/getWishInfo', { pid: item });
                    return res.data;
                })
            );
            setWishList(wishListData);
        } else {
            setWishList([]);
        }
    }

    const getReview = async(type) => {
        const id = localStorage.getItem('user_id');
        const result = await axios.post('http://15.165.205.38:9000/mypage/getReview', { 'id': id ,'type':type});
        setMyReview(result.data);
    }





    const getLastPid = () =>{
        axios.post('http://15.165.205.38:9000/uploads/getLastPid')
                .then(res => {
                        // console.log('skdhk',res.data);                        
                        setLastPid(res.data);                        
                })
                .catch(error => {
                    console.log(error);
                });
    }

    return { getMyinfo, getMyOrder, getWishNumber, getReview,getLastPid };
}