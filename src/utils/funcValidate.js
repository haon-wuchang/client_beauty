import React, { useRef } from "react";


/*****************************
 * Signup 컴포넌트 초기화 작업 
 *****************************/
export const initSignup = () => {
  const names = ['id','pwd','cpwd','name','phone1','phone2','phone3','email'];
  const nameKor = ['아이디를','비밀번호를','비밀번호 확인을','이름을','휴대전화를','휴대전화를','휴대전화를','이메일을'];
 
  const initFormData = names.reduce((acc, name)=>{
    acc[name] = '';
    return acc;
  },{});

  const labels =names.reduce((acc, name, idx)=>{
    acc[name] = nameKor[idx];
    return acc;
  },{});

  return {names, labels, initFormData};
};


