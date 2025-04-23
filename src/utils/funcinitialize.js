import axios from'axios';


/***************************
 *  회원가입 validation 체크  
***************************/
export const validationSignup = (names, refs, labels) =>{
  const refEntries = Object.entries(refs);
 
  for(let i=0; i< refEntries.length; i++){
    const [name, ref] = refEntries[i];
    
    if(name === 'emailDomainRef'){
      if(ref.current.value ==='default'){
        alert('이메일 도메인주소를 선택해주세요');
        ref.current.focus();
        return false;
      }
    }else if(name === 'phone1Ref' ){
      if(ref.current.value === 'default'){
        alert('핸드폰번호를 입력해주세요');
        ref.current.focus();
        return false;
      }
    }else{
      if(!ref.current.value){
        const labelName = labels[names[i]];
        alert(`${labelName} 입력해주세요`);
        ref.current.focus();
        return false;
      }
    }
  }
  return true;
} 

/***************************
 *  회원가입 아이디 중복확인  
***************************/
export const handleIdCheck = (idRef, pwdRef, setIdCheckResult) =>{
  if(idRef.current.value ===''){
    idRef.current.focus();
    return false;
  }else{
    axios.post('http://15.165.205.38:9000/signup/idCheck', {'id':idRef.current.value})
         .then((res)=>{
          if(res.data[0].cnt ===1 ){
            alert('이미 사용중인 아이디입니다. 아이디를 다시 입력해주세요.');
            idRef.current.focus();
            return false;
          }else{
            alert('사용가능한 아이디입니다.');
            setIdCheckResult("complete");
            pwdRef.current.focus();
            return false;
          }
         })
         .catch((error)=>console.log(error))
  }
}

/***************************
 *  회원 아이디 찾기 유효성 검사
***************************/
export const validationIdFind = (names, refs, labels) =>{
  const refEntries = Object.entries(refs);
 
  for(let i=0; i< refEntries.length; i++){
    const [name, ref] = refEntries[i];
   
    if(!ref.current.value){
      const labelName = labels[names[i]];
      alert(`${labelName} 입력해주세요`);
      ref.current.focus();
      return false;
    }
  } 
  return true;
};

/***************************
 *  회원 비밀번호 찾기 유효성 검사
***************************/
export const validationPwdFind = (pwds, refs, pwdLabels) =>{
  const refEntries = Object.entries(refs);
 
  for(let i=0; i< refEntries.length; i++){
    const [pwd, ref] = refEntries[i];
   
    if(!ref.current.value){
      const labelName = pwdLabels[pwds[i]];
      alert(`${labelName} 입력해주세요`);
      ref.current.focus();
      return false;
    }
  } 
  return true;
};