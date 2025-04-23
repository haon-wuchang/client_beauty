import axios from 'axios';
import React, { useEffect, useRef } from 'react';

export default function RedirectPage() {
  const calledRef = useRef(false); 
  
  useEffect(()=>{
    const fetchUserInfo = async() =>{
      if (calledRef.current) return;
      calledRef.current = true;

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const pathname = window.location.pathname;

      let provider = null;

      if(pathname.includes('naver')){
        provider = 'naver';
      }else if(pathname.includes('kakao')){
        provider = 'kakao';
      }

      if(!provider || !code){
        console.log('SNS 로그인: provider 또는 code 없음');
        window.close();
        return;
      }

      try {
        const payload = provider==='naver'?{code, state} : {code};
        const res = await axios.post(`http://15.165.205.38:9000/signup/${provider}/callback`, payload);
        const data = res.data;

        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
              type: provider.toUpperCase() + '_LOGIN_SUCCESS',
              payload: data
            }, "http://localhost:3000");
            console.log('[RedirectPage] postMessage 전송됨:', data);  
            window.close();
          }  
      } catch (error) {
        console.log('SNS 회원가입 실패', error);
        window.close(); 
      }
    };
    fetchUserInfo();
  },[]);
  return null;
}

