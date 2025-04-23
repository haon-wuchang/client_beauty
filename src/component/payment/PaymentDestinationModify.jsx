import React, { useContext, useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import { useOrder } from '../../hooks/useOrder.js';
import { OrderContext } from '../../context/orderContext.js';
import { IoIosClose } from "react-icons/io";

export default function PaymentDestinationModify({setModalOpen}) {
    const { member } = useContext(OrderContext);
    const { updateDelivery } = useOrder();
    const id = localStorage.getItem("user_id");

    // 배송지 변경 시 초기 데이터
    const initForm = {
        "id": id,
        "name": member.name,
        "zipcode": "",
        "address": "",
        "extra": "",
        "phone": member.phone,
        "email": member.email
    };

    // 배송지 변경 폼 체크
    const refs = {
        'nameRef' : useRef(null),
        'zipcodeRef' : useRef(null),
        'addressRef' : useRef(null),
        'extraRef' : useRef(null),
        'phoneRef' : useRef(null),
        'emailRef' : useRef(null)
    }

    const [isOpen, setIsOpen] = useState(false); // 주소 검색창 관리
    const [formData, setFormData] = useState(initForm); // 배송지 수정 데이터 관리
    const [errMsg, setErrMsg] = useState({
                                            name: false,
                                            zipcode: false,
                                            address: false,
                                            extra: false,
                                            phone: false,
                                            email: false
                                        });
    // console.log("폼데이터 --> ", formData);

    //---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
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
        setFormData({ ...formData, "zipcode": data.zonecode, "address": data.address });
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
            setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
            setIsOpen(false);
        }
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//

    /* 닫기 버튼 클릭 이벤트 */
    const clickClose = () => {
        setModalOpen(false);
        setIsOpen(false);
    }

    /* 주소검색 클릭 이벤트 */
    const clickSearch = () => {
        setIsOpen(!isOpen);
    }

    /* 배송지 변경 유효성 체크 */
    const validateModify = () => {
        const fields = ["nameRef", "zipcodeRef", "addressRef", "extraRef", "phoneRef", "emailRef"];
        
        for (const field of fields) {
            const ref = refs[field].current;
            if (!ref.value.trim()) {
                ref.focus();
                return false;
            }
        }
        return true;
    }

    /* 변경 버튼 클릭 이벤트 */
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(validateModify()) {
            const result = await updateDelivery(formData);
            if (result === 1) {
                alert("배송지가 변경되었습니다!");
                setModalOpen(false);
            }
        }
    }

    /* 폼 입력값 변화 이벤트 */
    const handleChage = (value, field) => {
        if (value === '') {
            setErrMsg({ ...errMsg, [field]: true });
        } else {
            setErrMsg({ ...errMsg, [field]: false });
            setFormData({ ...formData, [field]: value });
        }
    }

    return (
        <div className='destination-modify-container'>
            <div className='box-top'>
                <span>배송지 수정</span>
                <span onClick={clickClose}><IoIosClose /></span>
            </div>
            <form className='box-form' onSubmit={handleSubmit}>
                <ul className='box-form-list'>
                    <li>
                        <label>받는 사람 <span>*</span></label>
                        <input 
                            type="text" 
                            defaultValue={member.name}
                            ref={refs.nameRef} 
                            onChange={(e) => handleChage(e.target.value, "name")}
                        />
                    </li>
                    { errMsg.name && <p className='error-msg'>이름을 입력해주세요.</p> }
                    <li className='box-form-address'>
                        <label>주소 <span>*</span></label>
                        <div>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder='우편번호' 
                                    ref={refs.zipcodeRef}
                                    value={formData.zipcode ? formData.zipcode : ""}
                                    onChange={(e) => handleChage(e.target.value, "zipcode")}
                                />
                                <button type='button'
                                        onClick={clickSearch}
                                >
                                    주소검색
                                </button>
                                { isOpen &&
                                    <div>
                                        <DaumPostcode
                                            className="modify-form-postmodal"
                                            theme={themeObj}
                                            style={postCodeStyle}
                                            onComplete={completeHandler}
                                            onClose={closeHandler}
                                        />
                                    </div>
                                }
                            </div>
                            <input 
                                type="text" 
                                placeholder='기본주소'
                                ref={refs.addressRef}
                                value={formData.address ? formData.address : ""}
                                onChange={(e) => handleChage(e.target.value, "address")}
                            />
                            <input 
                                type="text" 
                                placeholder='나머지 주소' 
                                ref={refs.extraRef}
                                onChange={(e) => handleChage(e.target.value, "extra")}
                            />
                        </div>
                    </li>
                    { errMsg.zipcode && <p className='error-msg'>주소를 입력해주세요.</p> }
                    { errMsg.address && <p className='error-msg'>주소를 입력해주세요.</p> }
                    { errMsg.extra && <p className='error-msg'>상세주소를 입력해주세요.</p> }
                    <li>
                        <label>휴대전화 <span>*</span></label>
                        <input
                            type="text" 
                            defaultValue={member.phone} 
                            ref={refs.phoneRef}
                            placeholder='13자리로 입력해주세요. ex)010-0000-0000'
                            onChange={(e) => handleChage(e.target.value, "phone")}
                        />
                    </li>
                    { errMsg.phone && <p className='error-msg'>휴대전화번호를 입력해주세요.</p> }
                    <li>
                        <label>이메일 <span>*</span></label>
                        <input
                            type="text" 
                            defaultValue={member.email} 
                            ref={refs.emailRef}
                            onChange={(e) => handleChage(e.target.value, "email")}
                        />
                    </li>
                    { errMsg.email && <p className='error-msg'>이메일을 입력해주세요.</p> }
                    <li>
                        <button type='button' onClick={() => setModalOpen(false)}>취소</button>
                        <button type='submit'>변경</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}