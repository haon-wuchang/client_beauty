import React, { useContext } from 'react';
import { useState, useRef, useEffect } from 'react';
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';
import { useMypage } from '../../hooks/useMypage.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import { useLogin } from '../../hooks/useLogin.js';

export default function UpdateMypage({ myinfo, births, Checked }) {
    const { isLoggedIn } = useContext(AuthContext);
    const { getMyinfo } = useMypage();    
    const navigate = useNavigate();
        const {handleLogin} = useLogin();

    useEffect(() => {
        // console.log(" 마이페이지 컴포넌트에서 isLoggedIn 상태 변경 감지:", isLoggedIn);
    }, [isLoggedIn]);

    const [updateData, setUpdateData] = useState({});  
    /** 주소검색 버튼Toggle */
    const [isOpen, setIsOpen] = useState(false);
    /** 주소 검색 버튼 */
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const [btnChangeClick, setBtnChangeClick] = useState({
        'pwd': false,
        'name': false,
        'zipcode': false,
        'address': false,
        'extra': false,
        'phone': false,
        'email': false,
        'male': false,
        'female': false,
        'year': false,
        'month': false,
        'date': false
    });
    const pwdMsgRef = useRef(null);
    const refs = {
        'pwdRef': useRef(null),
        'cpwdRef': useRef(null),
        'nameRef': useRef(null),
        'zipcodeRef': useRef(null),
        'addressRef': useRef(null),
        'extra_addressRef': useRef(null),
        'phoneRef': useRef(null),
        'emailRef': useRef(null),
        'maleRef': useRef(null),
        'femaleRef': useRef(null),
        'yearRef': useRef(null),
        'monthRef': useRef(null),
        'dateRef': useRef(null),
    }
    // 버튼 클릭 핸들러
    const handle = (type) => {
        setBtnChangeClick(prev => ({ 
            ...prev,
            [type]: !prev[type] 
        }));
    };
    const handleChangeInputData = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    }
    //---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222",
    };
    const postCodeStyle = {
        width: "500px",
        height: "500px",
    };

    const completeHandler = (data) => {
        setUpdateData({ ...updateData, zipcode: data.zonecode, address: data.address });
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
            setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
            setIsOpen(false);
        }
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//

    const pwdValidate = () => {
        if (refs.pwdRef.current.value !== refs.cpwdRef.current.value) {
            pwdMsgRef.current.style.setProperty('color', 'red');
            refs.cpwdRef.current.value = '';
            return false;
        } else {
            refs.cpwdRef.current.value = '';
            pwdMsgRef.current.style.setProperty('color', 'white');
            alert('good');
            return true;
        }
    }
    const handleUpdateInfo = (colName, value) => {
        const id = localStorage.getItem('user_id');
        if (colName === 'pwd') {
            if (pwdValidate()) {
                axios.post('http://15.165.205.38:9000/mypage/updateInfo', { 'id': id, 'colName': colName, 'value': value })
                    .then(res => {
                        if (res.data.result === 1) {
                            getMyinfo();
                        } else {
                            alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.');
                    });
            }
        } else {
            axios.post('http://15.165.205.38:9000/mypage/updateInfo', { 'id': id, 'colName': colName, 'value': value })
                .then(res => {
                    if (res.data.result === 1) {
                        getMyinfo();
                    } else {
                        alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.')
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.');
                });
        }
    }
    const handleUpdateInfoAdd = () => {
        const id = localStorage.getItem('user_id');
        const est = refs.yearRef.current.value.concat('-', refs.monthRef.current.value, '-', refs.dateRef.current.value);
        axios.post('http://15.165.205.38:9000/mypage/updateInfo', { 'id': id, 'colName': 'birth', 'value': est })
            .then(res => {
                if (res.data.result === 1) {
                    getMyinfo();
                } else {
                    alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.')
                }
            })
            .catch(error => {
                console.log(error);
                alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.');
            });
    }
    const handleChecked = (e, type) => {
        if (type === 'M') {
            Checked.setIsChecked1(e.target.checked);
            Checked.setIsChecked2(false);
        } else if (type === 'F') {
            Checked.setIsChecked2(e.target.checked);
            Checked.setIsChecked1(false);
        }
    }

    const deleteMyAllInfo = () => {
        const handleDeleteInfo = window.confirm("회원탈퇴를 하시겠습니까?");
        if (handleDeleteInfo) {
            const id = localStorage.getItem('user_id');
             axios.post('http://15.165.205.38:9000/mypage/deleteUser', { 'id': id })
                .then(res => {                    
                    res.data.result === 1 && handleLogin(false,'delete');                        
                })
                .catch(error => {
                    console.log(error);
                    alert('회원정보 수정 중 에러가 발생하였습니다. 다시 시도해주세요.');
                });
        } else {
            navigate('/mypage');
        }
    }


    return (
        <div className='mypage-update-info-all'>
            <div className='mypage-update-info-title'>회원 정보 수정</div>
            <div className='mypage-desc'>
                <p>	저희 쇼핑몰을 이용해 주셔서 감사합니다.
                    <span>{myinfo.name}님</span>은 <span>[{myinfo.membership}]</span> 회원이십니다.</p>
                <p><span>10,000원 이상</span>구매시 <span>1%</span>를 추가적립 받으실 수 있습니다.</p>
            </div>
            <div className='mypage-update-info-tablebox'>
                <table className='mypage-update-info-table'>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password"
                            value={btnChangeClick.pwd ? null : (
                                updateData.pwd === undefined ? myinfo.password : updateData.pwd
                            )}
                            onChange={btnChangeClick.pwd === true ? handleChangeInputData : null}
                            ref={refs.pwdRef}
                            className={btnChangeClick.pwd ? 'update-info-active' : 'update-info-success'} />
                            {btnChangeClick.pwd ?
                                <button type='button' onClick={() => {
                                    handle('pwd')
                                    handleUpdateInfo("password", refs.pwdRef.current.value)
                                }}>완료</button> :
                                <button type='button' onClick={() => {
                                    handle('pwd')
                                }}
                                > 수정</button>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호확인</td>
                        <td><input type="password" ref={refs.cpwdRef}
                            className={btnChangeClick.pwd ? 'update-info-active' : 'update-info-success'}
                        /><span ref={pwdMsgRef}>비밀번호가 일치하지 않습니다. 다시 입력해주세요</span>
                        </td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td>
                            <input type="text"
                                value={btnChangeClick.name ? null : (
                                    updateData.name === undefined ? myinfo.name : updateData.name
                                )}
                                onChange={btnChangeClick.name === true ? handleChangeInputData : null}
                                ref={refs.nameRef}
                                className={btnChangeClick.name ? 'update-info-active' : 'update-info-success'} />
                            {btnChangeClick.name ?
                                <button type='button' onClick={() => {
                                    handle('name')
                                    handleUpdateInfo("name", refs.nameRef.current.value)
                                }}>완료</button> :
                                <button type='button' onClick={() => {
                                    handle('name')
                                }}
                                > 수정</button>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>
                            <li>
                                <input type="text" name='zipcode'
                                    value={
                                        updateData.zipcode === undefined ? myinfo.zipcode : updateData.zipcode
                                    }
                                    onChange={btnChangeClick.address ? handleChangeInputData : null}
                                    ref={refs.zipcodeRef}
                                    className={btnChangeClick.address ? 'update-info-active' : 'update-info-success'} />
                                <button onClick={() => handleToggle()}>주소검색</button>
                                {btnChangeClick.address ?
                                    <button type='button' onClick={() => {
                                        handle('address')
                                        handleUpdateInfo('zipcode', refs.zipcodeRef.current.value)
                                        handleUpdateInfo('address', refs.addressRef.current.value)
                                        handleUpdateInfo('extra_address', refs.extra_addressRef.current.value)
                                    }}>완료</button> :
                                    <button type='button' onClick={() => {
                                        handle('address')
                                    }}> 수정</button>}
                            </li>
                            <li>
                                <input type="text" name='address'
                                    value={
                                        updateData.address === undefined ? myinfo.address : updateData.address
                                    }
                                    onChange={btnChangeClick.address ? handleChangeInputData : null}
                                    ref={refs.addressRef}
                                    className={btnChangeClick.address ? 'update-info-active' : 'update-info-success'} />
                            </li>
                            <li>
                                <input type="text" name='extra'
                                    value={btnChangeClick.extra ? null : (
                                        updateData.extra === undefined ? myinfo.extra_address : updateData.extra
                                    )}
                                    onChange={btnChangeClick.address ? handleChangeInputData : null}
                                    ref={refs.extra_addressRef}
                                    className={btnChangeClick.address ? 'update-info-active' : 'update-info-success'} />
                            </li>
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
                        </td>
                    </tr>
                    <tr>
                        <td>휴대전화</td>
                        <td>
                            <input type="tel"
                                value={btnChangeClick.phone ? null : (
                                    updateData.phone === undefined ? myinfo.phone : updateData.phone
                                )}
                                onChange={btnChangeClick.phone === true ? handleChangeInputData : null}
                                ref={refs.phoneRef}
                                className={btnChangeClick.phone ? 'update-info-active' : 'update-info-success'} />
                            {btnChangeClick.phone ?
                                <button type='button' onClick={() => {
                                    handle('phone')
                                    handleUpdateInfo("phone", refs.phoneRef.current.value)
                                }}>완료</button> :
                                <button type='button' onClick={() => {
                                    handle('phone')
                                }}
                                > 수정</button>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>
                            <input type="text"
                                value={btnChangeClick.email ? null : (
                                    updateData.email === undefined ? myinfo.email : updateData.email
                                )}
                                onChange={btnChangeClick.email === true ? handleChangeInputData : null}
                                ref={refs.emailRef}
                                className={btnChangeClick.email ? 'update-info-active' : 'update-info-success'} />
                            {btnChangeClick.email ?
                                <button type='button' onClick={() => {
                                    handle('email')
                                    handleUpdateInfo("email", refs.emailRef.current.value)
                                }}>완료</button> :
                                <button type='button' onClick={() => {
                                    handle('email')
                                }}
                                > 수정</button>
                            }
                        </td>
                    </tr>
                </table>
            </div>
            <div className='mypage-update-info-add-tablebox'>
                <div>추가정보</div>
                <div>
                    <table className='mypage-update-info-table2'>
                        <tr>
                            <td>성별</td>
                            <td>
                                <input type="checkbox"
                                    checked={births.gender && births.gender === 'M' ? true : (
                                        !births.gender && false)}
                                    ref={refs.maleRef}
                                    onChange={(e) => { handleChecked(e, 'M') }}
                                    onClick={() => { handleUpdateInfo('gender', 'M') }}
                                />
                                <span>남자</span>
                                <input type="checkbox"
                                    checked={births.gender && births.gender === 'F' ? true : (
                                        !births.gender && false)}
                                    ref={refs.femaleRef}
                                    onChange={(e) => { handleChecked(e, 'F') }}
                                    onClick={() => { handleUpdateInfo('gender', 'F') }}
                                />
                                <span>여자</span>
                            </td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td>
                                <input type="number" name="year"
                                    value={births.year !== '' ? births.year : updateData.year}
                                    ref={refs.yearRef}
                                    className={btnChangeClick.year ? 'update-info-active' : 'update-info-success'}
                                    onChange={btnChangeClick.year === true ? handleChangeInputData : null} />
                                <span>년</span>
                                <input type="number" name='month'
                                    value={births.month !== '' ? births.month : updateData.month}
                                    onChange={btnChangeClick.year === true ? handleChangeInputData : null}
                                    className={btnChangeClick.year ? 'update-info-active' : 'update-info-success'}
                                    ref={refs.monthRef} />
                                <span>월</span>
                                <input type="number" name='date'
                                    value={births.date !== '' ? births.date : updateData.date}
                                    onChange={btnChangeClick.year === true ? handleChangeInputData : null}
                                    className={btnChangeClick.year ? 'update-info-active' : 'update-info-success'}
                                    ref={refs.dateRef} />
                                <span>일</span>
                                {btnChangeClick.year ?
                                    <button type='button' onClick={() => {
                                        handle('year')
                                        handleUpdateInfoAdd()
                                    }}>완료</button> :
                                    <button type='button' onClick={() => {
                                        handle('year')
                                    }}
                                    > 수정</button>
                                }
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='mypage-update-info-btns'>
                <div>
                    <button type='button' onClick={deleteMyAllInfo}>회원탈퇴</button>
                </div>
            </div>
        </div>
    );
}

