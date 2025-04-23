import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext.js';
import { useContext } from 'react';

export default function Login() {
    const {setIsLoggedIn} = useContext(AuthContext);
    const [formData, setFormData] = useState({ 'id': '', 'pwd': '' });
    const navigate = useNavigate();
    const [error, setError] = useState({'id':'', 'pwd':''});
    
    const idRef = useRef(null);
    const pwdRef = useRef(null);
    const idMsgRef = useRef(null);
    const pwdMsgRef = useRef(null);

    const handleLogin = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const validate = () => {         
        if (idRef.current.value === '') {
            setError({...error, 'id':'아이디를 입력해주세요'});
            idMsgRef.current.style.setProperty('color', 'red');
            idRef.current.focus();             
            return false;
        }else if (pwdRef.current.value === '') {
            setError({...error, 'pwd':'비밀번호를 입력해주세요'});
            pwdMsgRef.current.style.setProperty('color', 'red');
            pwdRef.current.focus();
            return false;
        }     
        return true;
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            idMsgRef.current.style.setProperty('color', 'white');
            pwdMsgRef.current.style.setProperty('color', 'white');
            axios.post('http://15.165.205.38:9000/login',formData)
                .then(res => {
                    console.log('ddd',res.data.result);
                    if(res.data.result === 1){
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('user_id',formData.id); 
                        setIsLoggedIn(true);
                        navigate('/');
                    }else{
                        alert('존재하지않는 아이디입니다. 회원가입을 먼저 진행해주세요');
                        idRef.current.value = '';
                        idMsgRef.current.style.setProperty('color', 'white');
                        pwdRef.current.value = '';
                        pwdMsgRef.current.style.setProperty('color', 'white');
                        idRef.current.focus();
                        navigate('/signup');
                    }
                })
                .catch(error => {
                    alert('로그인에 실패하였습니다. 다시 시도해주세요.'); 
                    console.log(error)});
        }
    }

    /* 네이버 API연동 로그인 */
    const NaverLogin = () => {
        const naver_client_id = "nd3jd_Q53Vfna4fdLlgx";
        const callbackUrl = "http://localhost:3000/signup/redirect/naver"; // 네이버 개발자 센터에 등록한 URL
        const state = Math.random().toString(36).substring(2, 15); // 랜덤 state 생성
        const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_id}&state=${state}&redirect_uri=${callbackUrl}`;
        
        const width = 500;
        const height = 600;
        const left = (window.screen.width - width) /2;
        const top = (window.screen.height  - height) /2;

        window.open(
            NAVER_AUTH_URL,
            'naverLogin',
            `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes`
        );
    };
    /* 카카오 API연동 로그인 */
    const kakaoLogin = () =>{
        const Rest_api_key = '3f5c49e05800584ba496c54e74152ab3';
        const redirect_uri = 'http://localhost:3000/signup/redirect/kakao';
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

        const width = 500;
        const height = 600;
        const left = (window.screen.width - width) /2 ;
        const top = (window.screen.height - height) /2;

        window.open(
            kakaoURL,
            'kakaoLogin',
            `width=${width},height=${height},left=${left},top=${top},resizeable=no, scrollbars=yes`
        )
    };

    useEffect(()=>{
        const handleMessage = (e) =>{
            if(e.data?.type === 'NAVER_LOGIN_SUCCESS' || e.data?.type === 'KAKAO_LOGIN_SUCCESS'){
                const {name, mobile, email} = e.data.payload;
                navigate('/signup',{state: {name, mobile, email, join_type:'sns' }})
            }
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    },[navigate]);

    return (
        <div className='login-box'>
            <div className='login-box-left'>
                <img src="/images/loginImage.jpg" alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='login-box-right'>
                    <h3>Sign In</h3>
                    <div className='login-box-right-top'>
                        <input
                            type="text"
                            name='id'
                            ref={idRef}
                            placeholder='아이디'
                            onChange={handleLogin}
                        />
                        <span ref={idMsgRef}>{error.id}</span>
                        <input
                            type="password"
                            name='pwd'
                            ref={pwdRef}
                            placeholder='비밀번호'
                            onChange={handleLogin}
                        />
                        <span ref={pwdMsgRef}>{error.pwd}</span>
                    </div>
                    <button className='login-btn login-btn1' type='submit'>Sign In</button>
                    <div className='login-cut'>————————————<span>or</span>————————————</div>
                    <div className='login-box-right-middle'>
                        <button type='button' className='login-btn login-btn2' onClick={NaverLogin}>
                            <SiNaver className='login-box-right-middle-logo1' />
                            <span>NAVER Account</span>
                        </button>
                        <button type='button' className='login-btn login-btn3' onClick={kakaoLogin}>
                            <RiKakaoTalkFill className='login-box-right-middle-logo2' />
                            <span>Kakao Account</span>
                        </button>
                    </div>
                    <div className='login-cut'>————————————<span>or</span>————————————</div>
                    <div>
                        <button className='login-btn login-btn4' type='button'
                            onClick={() => { navigate('/signup') }}
                        >New Account</button>
                    </div>
                    <div className='login-bottom-box'>
                        <ul>
                            <li>
                                <span className='userinfo-find-btn' onClick={()=>navigate('/signup/find/fid')}>아이디(이메일) </span>
                                <span>또는 </span>
                                <span className='userinfo-find-btn' onClick={()=>navigate('/signup/find/fpwd')}>비밀번호</span>
                                <span>를 잊으셨나요?</span>
                            </li>
                            <li>
                                <span>비회원으로 주문하신 경우, </span>
                                <span className='userinfo-find-btn' onClick={()=>navigate('/')}>주문조회 </span>
                                <span>해주세요.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div >
    );
}

