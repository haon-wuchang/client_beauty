import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from "antd";
import { validationSignup, handleIdCheck } from '../utils/funcinitialize.js';
import { initSignup } from '../utils/funcValidate.js';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const { names, labels, initFormData } = initSignup();
    const [ formData, setFormData ] = useState(initFormData);
    const refs = {
        idRef: useRef(null),
        passwordRef: useRef(null),
        cpwdRef: useRef(null),
        nameRef: useRef(null),
        phone1Ref: useRef("default"),
        phone2Ref: useRef(null),
        phone3Ref: useRef(null),
        emailRef: useRef(null),
        emailDomainRef: useRef("default") 
    };
    const [ idCheckResult, setIdCheckResult] = useState('default');
    const [ passwordCheck, setPasswordCheck] = useState(null);
    const [ cpwdCheck, setCpwdCheck] = useState(null);
    const [ checkedItems, setCheckedItems ] = useState([]);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalContent, setModalContent ] = useState('');
    const dataList =[
        {   id:0
            , text:'이용약관에 동의하십니까? (필수)'
            , content: `제1조(목적)
                    이 약관은 주식회사 구다이글로벌이 운영하는 조선미녀(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
                    ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」
                    제2조(정의)
                    ① “몰”이란 주식회사 구다이글로벌이 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                    ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                    ③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
                    ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
                    제3조 (약관 등의 명시와 설명 및 개정)
                    ① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 조선미녀의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
                    ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                    ③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                    ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.이 경우 "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                    ⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
                    ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.`
        },
        {   id:1
            , text:'개인정보 수집 및 이용에 동의하십니까?(필수)'
        },
        {   id:2
            , text:'이메일 수신을 동의하십니까?(필수)'
        }
    ];

    /* sns 연동 회원가입 */
    useEffect(()=>{
        if(location.state?.join_type === 'sns'){
            const { name, mobile, email} = location.state;
            console.log('name>>>',name);
            console.log('mobile>>>',mobile);
            
            const [phone1, phone2, phone3] = (mobile ?? '').split('-');

            setFormData(prev =>({...prev, name: name ?? '',
                                          phone1 : phone1 ?? 'default',
                                          phone2 : phone2 ?? '',
                                          phone3 : phone3 ?? '',
                                          email : email?.split('@')[0] ?? '',
                                          emailDomain: email?.split('@')[1] ?? 'default'}))
                                }
    },[location.state]);
    console.log('formData>>>',formData);
    useEffect(()=>{
        if(idCheckResult === 'complete'){
            setIdCheckResult("default"); 
        }
    },[formData.id]);


    /* 폼 입력 정보 */
    const handleChangeForm= (e) =>{
        const { name, value } = e.target;
        const newFormData = {...formData, [name]:value};
        const pvalue = Number(e.target.value);
        setFormData({...formData, [name]: value});
       
        if(name === 'password'){
            const isVaild = (value.length >= 8 && value.length <= 15);
            setPasswordCheck(isVaild);
        }else if(name ==='cpwd'){
            setCpwdCheck(newFormData.password === value);
        }else if(name ==='phone2'|| name ==='phone3' ){
            if(/\D/.test(value)){
                alert('숫자만 입력가능합니다.');
                e.target.value = '';
                setFormData((prev)=>({...prev, [name]:''}));
                return
            }
        }
    };


    /* 체크박스 개별 체크 */
    const handleCheckedItem = (checked, id) => {
        if(checked){
            setCheckedItems(prev => [...prev,id]);
        }else{
            setCheckedItems(checkedItems.filter(item => item !==id));
        }
    };
    /* 체크박스 All 체크 */
    const handleAllClick = (checked) => {
        if(checked){
            const idArray = [];
            dataList.forEach((item)=>idArray.push(item.id));
            setCheckedItems(idArray);
        }else{
            setCheckedItems([]);
        }
    };
    /* 이용약관 모달창 */
    const openModal = (content) =>{
        setModalContent(content);
        setModalOpen(true);
    };

    /* form 버튼 클릭 이벤트  */
    const handleSumbit = (e) =>{
        e.preventDefault();
        if(validationSignup(names, refs, labels)){
            if(idCheckResult === 'default'){
                alert('아이디 중복확인을 진행해주세요');
                return false;
            }else if(checkedItems.length !== 3){
                console.log('checkedItems >>>',checkedItems);
                alert('약관에 모두 동의해주세요.');
            }else{
                console.log('유효성체크 formData ->',formData);
                axios.post('http://15.165.205.38:9000/signup/submit', formData)
                     .then((res)=>{
                        if(res.data === 1 ){
                            alert('회원가입이 완료되었습니다.');
                            navigate('/login');
                        }
                     })
                     .catch((error)=>console.log(error))   
                
            }
        }
    };

    return (
        <form onSubmit={handleSumbit}>
            <div className='signup-box signup-content'>
                <h5>New Account</h5>
                <ul>
                    <li>
                        <label>아이디<span>·</span></label>
                        <input type="text" name='id'
                                ref={refs.idRef}     
                                onChange={handleChangeForm}
                                autoComplete="off"/>
                        <button type='button'
                                onClick={()=>{handleIdCheck(refs.idRef, refs.passwordRef, setIdCheckResult)}}>중복확인</button>
                        <p>6자 이상으로 입력해주세요</p>
                    </li>
                    <li>
                        <label>비밀번호 <span>·</span></label>
                        <input type="password" name='password'
                               ref={refs.passwordRef}
                               onChange={handleChangeForm} />
                        <p className={passwordCheck === null || passwordCheck === true ?"" : "pwd-error" }>8~15자 사이로 입력해주세요.</p>
                    </li>
                    <li>
                        <label>비밀번호 확인 <span>·</span></label>
                        <input type="password" name='cpwd'
                               ref={refs.cpwdRef} 
                               onChange={handleChangeForm}/>
                        <p className={cpwdCheck === null || cpwdCheck === true? "cpwd-text" : "pwd-error"}>비밀번호가 일치하지 않습니다.</p>       
                    </li>
                    <li>
                        <label>이름 <span>·</span></label>
                        <input type="text" name='name' 
                               ref={refs.nameRef}
                               onChange={handleChangeForm}
                               value={formData.name}
                               autoComplete="off"/>
                    </li>
                    <li className='phone-info'>
                        <label>휴대전화 <span>·</span></label>
                        <div>
                            <select name="phone1" className='phone' 
                                    ref={refs.phone1Ref} 
                                    onChange={handleChangeForm}
                                    value={formData.phone1}>
                                <option value="default">선택</option>
                                <option value="010">010</option>
                                <option value="011">011</option>
                            </select>
                            <span className="dash"> - </span>
                            <input type="text" name="phone2" className='phone phone2' 
                                   maxLength={4}
                                   ref={refs.phone2Ref} 
                                   onChange={handleChangeForm}
                                   value={formData.phone2}
                                   autoComplete="off" />
                            <span className="dash"> - </span>
                            <input type="text" name="phone3" className='phone phone3' 
                                   maxLength={4}
                                   ref={refs.phone3Ref} 
                                   onChange={handleChangeForm}
                                   value={formData.phone3}
                                   autoComplete="off"/>
                        </div>
                    </li>
                    <li className='signup-email-line'>
                        <label>이메일 <span>·</span></label>
                        <div>
                            <input type="text" name='email' 
                                   ref={refs.emailRef}
                                   onChange={handleChangeForm}
                                   value={formData.email}
                                   autoComplete="off"/>
                            <span>@</span>
                            <select name="emailDomain" 
                                    ref={refs.emailDomainRef}
                                    onChange={handleChangeForm}
                                    value={formData.emailDomain}>
                                <option value="default">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                    </li>
                </ul>
                
                <div className='signup-check-box'>
                    <ul>
                        <li className='checkbox-change'>
                            <input type="checkbox" 
                                   onChange={(e)=>handleAllClick(e.target.checked)}
                                   checked={checkedItems.length === dataList.length? true: false}
                                />
                            <span>모두동의</span>
                        </li>
                        {dataList && dataList.map((dataItem, idx)=>(
                             <li key={idx} className='checkbox-change'>
                                <input type="checkbox" 
                                       name={`select-${dataItem.id}`}
                                       onChange={(e)=>handleCheckedItem(e.target.checked, dataItem.id)}
                                       checked={checkedItems.includes(dataItem.id) ? true: false }/>
                                <span style={{ textDecoration: dataItem.content ? "underline" : "none", cursor:dataItem.content ? "pointer": "default"}}
                                      onClick={()=> dataItem.content && openModal(dataItem.content)}>
                                    {dataItem.text}
                                </span>
                            </li>
                            ))
                        }
                        <li>· 할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다.</li>
                        <li>· 단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이 발송됩니다.</li>
                        <li>· 선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후 회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수 있습니다.</li>
                    </ul>
                </div>
                <Modal className='signup-ant' title="약관내용" open={modalOpen} onCancel={()=> setModalOpen(false)} footer={null}>
                    <p>{modalContent}</p>
                </Modal>
                <button className='signup-btn'>Sign up</button>
            </div>
        </form>
    );
}

