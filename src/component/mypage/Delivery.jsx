import React, { useState, useRef } from 'react';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useMypage } from '../../hooks/useMypage.js';
import { useContext } from 'react';
import { MypageContext } from '../../context/MypageContext.js';
import { useEffect } from 'react';

export default function Delivery() {
    const {myinfo } = useContext(MypageContext);
    const { getMyinfo } = useMypage();
    const [open, setOpen] = useState(false);
    const [deliData, setDeliData] = useState({});
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false); 
    const handleModal = () => {
        setOpen(!open);
    }
    useEffect(() => {
        getMyinfo();
    }, [handleModal]);

    const handleChecked1 = (e) => { setIsChecked1(e.target.checked); setIsChecked2(false); }
    const handleChecked2 = (e) => { setIsChecked2(e.target.checked);setIsChecked1(false); }    

    const refs = {
        'nameRef': useRef(null),
        'phoneRef': useRef(null),
        'zipcodeRef': useRef(null),
        'addressRef': useRef(null),
        'extra_addressRef': useRef(null),
    }
    const deliveryData = (e) => {
        const { name, value } = e.target;
        setDeliData({ ...deliData, [name]: value });
    }
    /** 주소검색 버튼Toggle */
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222",
    };
    const postCodeStyle = {
        width: "400px",
        height: "500px",
    };
    const completeHandler = (data) => {
        setDeliData({ ...deliData, zipcode: data.zonecode, address: data.address });
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
            setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
            setIsOpen(false);
        }
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//

    const nameMsgRef = useRef(null);
    const phoneMsgRef = useRef(null);
    const addressMsgRef = useRef(null);
    const [error, setError] = useState({});

    const deliValidate = () => {
        if (refs.nameRef.current.value === '') {
            nameMsgRef.current.style.setProperty('color', 'red');
            setError({ ...error, 'name': '수령인을 입력해주세요' })
            refs.nameRef.current.focus();
            return false;
        } else if (refs.phoneRef.current.value === '') {
            setError({ ...error, 'phone': '휴대폰번호를 입력해주세요' })
            phoneMsgRef.current.style.setProperty('color', 'red');
            refs.phoneRef.current.focus();
            return false;
        } else if (refs.zipcodeRef.current.value === '') {
            setError({ ...error, 'address': '주소를 선택해주세요' })
            addressMsgRef.current.style.setProperty('color', 'red');
            refs.zipcodeRef.current.focus();
            return false;
        } else if (refs.addressRef.current.value === '') {
            setError({ ...error, 'address': '주소를 선택해주세요' })
            addressMsgRef.current.style.setProperty('color', 'red');
            refs.addressRef.current.focus();
            return false;
        }
        return true;
    }

    const handleDelivery = () => {
        if (deliValidate()) {
            const id = localStorage.getItem('user_id');
            axios.post('http://15.165.205.38:9000/mypage/addDelivery', { 'id': id, 'deliData': deliData })
                .then(res => {
                    if (res.data.reslt === 1) {
                        getMyinfo();
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('배송지추가 중 에러가 발생하였습니다. 다시 시도해주세요.');
                });
        }
    }
    const addressC = myinfo.addtional_address && myinfo.addtional_address[0].indexOf('!');  // - 있는 위치 찾기
    const extraC = myinfo.addtional_address && myinfo.addtional_address[0].indexOf('=');  
    const nameC = myinfo.addtional_address && myinfo.addtional_address[0].indexOf('+');  
    const phoneC =myinfo.addtional_address &&  myinfo.addtional_address[0].indexOf('~');  
    const zipcodeF =myinfo.addtional_address &&  myinfo.addtional_address[0].slice(0, addressC-1);
    const addressF = myinfo.addtional_address && myinfo.addtional_address[0].slice(addressC + 1, extraC);
    const extraF =myinfo.addtional_address &&  myinfo.addtional_address[0].slice(extraC + 1, nameC);
    const nameF = myinfo.addtional_address && myinfo.addtional_address[0].slice(nameC + 1, phoneC);
    const phoneF = myinfo.addtional_address && myinfo.addtional_address[0].slice(phoneC + 1, myinfo.addtional_address[0].length);
    
const ChangeOriginDelivery = async() => {
    const id = localStorage.getItem('user_id');
    if(isChecked2){
        alert('기본배송지가 변경되었습니다.');
        setIsChecked2(false);
        const deliData2 = {
            'name':myinfo.addtional_address[0].slice(nameC + 1, phoneC),
            'phone':myinfo.addtional_address[0].slice(phoneC + 1, myinfo.addtional_address[0].length),
            'zipcode': myinfo.addtional_address[0].slice(0, 5),
            'address': myinfo.addtional_address[0].slice(addressC + 1, extraC),
            'extra_address': myinfo.addtional_address[0].slice(extraC + 1, nameC)
        };
        const adf = {
            'name':myinfo.name,
            'phone':myinfo.phone,
            'zipcode': String(myinfo.zipcode),
            'address':myinfo.address ,
            'extra_address': myinfo.extra_address
            };

        await axios.post('http://15.165.205.38:9000/mypage/updateMainDelivery', { deliData2, 'id': id })
        .then(res => {
            getMyinfo();
        })
        .catch(err => console.log(err));      
            
        await axios.post('http://15.165.205.38:9000/mypage/addDelivery',{ 'id': id, 'deliData': adf })
        .then(res => {
            getMyinfo();          
        })
        .catch(err => console.log(err));      
    }
}

const deliveryDelete = () => {
    const id = localStorage.getItem('user_id');
    axios.post('http://15.165.205.38:9000/mypage/deleteDelivery', { 'id': id })
        .then(res => {
            getMyinfo();
        })
        .catch(err => console.log(err));
}

    return (
        <div className='mypage-delivery-all'>
            {open && <div className='delivery-write-form'>
                <ul>
                    <li>
                        <label htmlFor="">수령인</label>
                        <input type="text" name='name'
                            ref={refs.nameRef}
                            onChange={deliveryData} />
                    </li>
                    <p ref={nameMsgRef}>{error.name}</p>
                    <li>
                        <label htmlFor="">휴대폰번호</label>
                        <input type="text" name='phone'
                            ref={refs.phoneRef}
                            onChange={deliveryData}
                        />
                    </li>
                    <p ref={phoneMsgRef}>{error.phone}</p>
                    <li>
                        <label htmlFor="">주소</label>
                        <div>
                            <div>
                                <input type="text" name='zipcode'
                                    onChange={deliveryData}
                                    ref={refs.zipcodeRef}
                                    value={deliData.zipcode ? deliData.zipcode : ''}
                                />
                                <button onClick={() => handleToggle()}>주소검색</button>
                            </div>
                            {isOpen &&
                                <div>
                                    <DaumPostcode
                                        className="postmodal"
                                        theme={themeObj}
                                        style={postCodeStyle}
                                        onComplete={completeHandler}
                                        onClose={closeHandler}
                                    />
                                </div>
                            }
                            <input type="text" name='address'
                                ref={refs.addressRef}
                                onChange={deliveryData}
                                value={deliData.address ? deliData.address : ''}
                            />
                            <input type="text" name='extra_address'
                                ref={refs.extra_addressRef}
                                onChange={deliveryData}
                            />
                            <p ref={addressMsgRef}>{error.address}</p>
                        </div>
                    </li>
                </ul>
                <div className='mypage-delivery-form-check'>
                    <input type="checkbox" />
                    <span onClick={ChangeOriginDelivery}>기본배송지 지정</span>
                </div>
                <div className='mypage-delivery-write-btns'>
                    <button onClick={() => {
                        handleModal()
                        handleDelivery()
                    }}>저장</button>
                    <button onClick={() => handleModal()}>취소</button>
                </div>
            </div>}
            <div className='mypage-update-info-title mypage-title'>배송지 관리</div>
            <div className='mypage-delivery-table'>
                <table>
                    <tr>
                        <td></td>
                        <td>수령인</td>
                        <td>휴대전화</td>
                        <td>주소</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" checked={isChecked1} onChange={handleChecked1}/>
                            <span>기본배송지</span>
                        </td>
                        <td>{myinfo.name}</td>
                        <td>{myinfo.phone}</td>
                        <td>
                            <span>{myinfo.zipcode} </span>
                            <span>{myinfo.address} </span>
                            <span>{myinfo.extra_address}</span>
                        </td>
                    </tr>
                    {myinfo.addtional_address &&
                        <tr>
                            <td>
                                <input type="checkbox" checked={isChecked2} onChange={handleChecked2} />
                            </td>
                            <td>{nameF}</td>
                            <td>{phoneF}</td>
                            <td>
                                <span>{zipcodeF} </span>
                                <span>{addressF} </span>
                                <span>{extraF}</span>
                                <button onClick={deliveryDelete}>배송지 삭제</button>
                            </td>
                        </tr>
                    }
                </table>
                <div className='mypage-delivery-btns'>
                    <button onClick={ChangeOriginDelivery}>기본배송지 지정</button>                    
                    <button onClick={() => handleModal()}>배송지 추가</button>
                </div>
            </div>
            <div className='mypage-delivery-desc'>
                <div>배송주소록 유의사항</div>
                <ul>
                    <li>배송 주소록은 최대 3개까지 등록할 수 있으며, 별도로 등록하지 않을 경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.</li>
                    <li>자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된 주소록은 업데이트 대상에서 제외됩니다.</li>
                    <li>기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로 설정하시면 기본 배송지가 변경됩니다.</li>
                </ul>
            </div>
        </div>

    );
}

