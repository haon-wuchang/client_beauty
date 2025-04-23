import React ,{ useRef, useState }from 'react';
import { useNavigate, useParams, useLocation  } from 'react-router-dom';
import { validationIdFind, validationPwdFind } from '../utils/funcinitialize.js';
import axios from 'axios';

export default function UserInfoFind() {
    const { finfo } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};
    const names = ['name','phone1','phone2','phone3'];
    const nameKor = ['아이디','휴대전화','휴대전화','휴대전화','현재 비밀번호', '새 비밀번호', '비밀번호 확인'];
    const pwds = ['id','password', 'newPassword', 'newCpassword'];
    const pwdKor = ['아이디디','현재 비밀번호', '새 비밀번호', '비밀번호 확인'];

    const initFormFata = names.reduce((acc, name)=>{
      acc[name] ='';
      return acc;
    },{});
    const labels = names.reduce((acc, name, idx)=>{
      acc[name] = nameKor[idx];
      return acc;
    },{})
    const initPwdFormFata = pwds.reduce((acc, pwd)=>{
      acc[pwd] ='';
      return acc;
    },{});
    const pwdLabels = pwds.reduce((acc, pwd, idx)=>{
      acc[pwd] = pwdKor[idx];
      return acc;
    },{})
    const [ formData, setFormData ] = useState(initFormFata);
    const [ pwdFormData, setPwdFormData ] = useState(initPwdFormFata);

    const refs = {
          nameRef: useRef(null),
          phone1Ref: useRef(null),
          phone2Ref: useRef(null),
          phone3Ref: useRef(null),
          iddRef: useRef(null),
          passwordRef: useRef(null),
          newPasswordRef: useRef(null),
          newCpasswordRef: useRef(null)
      };

  const handleChangeForm = (e) => {
    const {name, value } = e.target;
   
    if (!name) return;
    if(finfo === 'fid'){
      setFormData({...formData, [name]: value})
    }else if(finfo === 'fpwd'){
      setPwdFormData({...pwdFormData, [name]: value})
    }  
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(finfo === 'fid'){
      const idFindRefs = {
        nameRef: refs.nameRef, phone1Ref: refs.phone1Ref, phone2Ref: refs.phone2Ref, phone3Ref: refs.phone3Ref,
      };

      if(validationIdFind(names, idFindRefs, labels)){
        axios.post('http://15.165.205.38:9000/signup/find/id', formData)
        .then((res)=>{
            if(res.data[0] && res.data[0].cnt === 1 ){
              navigate('/signup/find/findeId', {state:{userId:res.data[0].id}});
            }else{
              alert('존재하지 않는 회원입니다.');
            }})
            .catch((error)=>console.log(error))   
      }
    }else if(finfo === 'fpwd'){
       const pwdFindRefs = {
        passwordRef: refs.passwordRef,
        newPasswordRef: refs.newPasswordRef,
        newCpasswordRef: refs.newCpasswordRef,
      };

      if (validationPwdFind(pwds, pwdFindRefs, pwdLabels)) {
        if (pwdFormData.newPassword !== pwdFormData.newCpassword) {
          alert('비밀번호가 일치하지 않습니다.');
          refs.newCpasswordRef.current.focus();
          return;
        }

        axios
          .post('http://15.165.205.38:9000/signup/find/pwd', pwdFormData)
          .then((res) => {
            if (res.data === 1) {
              alert('비밀번호가 정상적으로 변경되었습니다.');
              navigate('/login');
            } else {
              alert('회원정보가 일치하지 않습니다. 다시 입력해주세요.');
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <>
    {finfo === 'fid' && (
    <div className='id-find-box'>
      <div className='userid-find-content'>
        <div className='userid-find-title'>아이디 찾기
          <p>· 가입하신 방법에 따라 아이디 찾기가 가능합니다.</p>
          <p>· 법인사업자 회원 또는 외국인 회원의 경우 법인명과 법인번호 또는 이름과 등록번호를 입력해주세요.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='userid-find-box'>
            <div>
              <p>아이디 찾기</p>
              <div className='userid-find-li name'>
                <label>이름</label>
                <input type="text" name='name' 
                       ref={refs.nameRef}
                       onChange={handleChangeForm}
                       value={formData.name}
                       autoComplete="off"/>
              </div>
              <div className='userid-find-li phone'>
                <label>휴대폰 번호로 찾기</label>
                <input type="text" name="phone1" 
                       maxLength={3}
                       ref={refs.phone1Ref} 
                       onChange={handleChangeForm}
                       value={formData.phone1}
                       autoComplete="off"/>
                &nbsp;<span> - </span>&nbsp;
                <input type="text" name="phone2" 
                       maxLength={4}
                       ref={refs.phone2Ref} 
                       onChange={handleChangeForm}
                       value={formData.phone2}
                       autoComplete="off"/>
                &nbsp;<span> - </span>&nbsp;
                <input type="text" name="phone3" 
                       maxLength={4}
                       ref={refs.phone3Ref} 
                       onChange={handleChangeForm}
                       value={formData.phone3}
                       autoComplete="off"/>
              </div>
            </div>
            <button type='submit'>확인</button>
          </div>
        </form>
      </div>
    </div>
    )}
      { finfo === 'findeId' && (
        <div className='id-find-box'>
        <div className='userid-find-content'>
          <div className='userid-find-title'>아이디 찾기
            <p>· 가입하신 방법에 따라 아이디 찾기가 가능합니다.</p>
            <p>· 법인사업자 회원 또는 외국인 회원의 경우 법인명과 법인번호 또는 이름과 등록번호를 입력해주세요.</p>
          </div>
          <div className='userid-find-box'>
              <div>
                <h2>아이디 찾기 결과</h2>
                <p className='find-id-result'>회원님의 아이디는<strong>"{userId}"</strong>입니다.</p>
                <button onClick={()=>{navigate('/login')}}>Login</button>
              </div>  
          </div>  
        </div>  
        </div>  
      )}
    { finfo === 'fpwd' && (
       <div className='id-find-box'>
       <div className='userid-find-content'>
         <div className='userid-find-title'>비밀번호 변경</div>
          <form onSubmit={handleSubmit}>
            <div className='userid-find-box'>
              <div>
                <p>비밀번호 변경</p>
                <div className='userid-find-li id'>
                  <label>아이디</label>
                  <input type="text" name='id' 
                        ref={refs.iddRef}
                        onChange={handleChangeForm}
                        value={formData.id}
                        autoComplete="off"/>
                </div>
                <div className='userid-find-li password'>
                  <label>현재 비밀번호</label>
                  <input type="password" name='password' 
                        ref={refs.passwordRef}
                        onChange={handleChangeForm}
                        value={formData.password}
                        autoComplete="off"/>
                </div>
                <div className='userid-find-li password'>
                  <label>변경할 비밀번호</label>
                  <input type="password" name='newPassword' 
                        ref={refs.newPasswordRef}
                        onChange={handleChangeForm}
                        value={formData.newPassword}
                        autoComplete="off"/>
                </div>
                <div className='userid-find-li password'>
                  <label>비밀번호 확인</label>
                  <input type="password" name='newCpassword' 
                        ref={refs.newCpasswordRef}
                        onChange={handleChangeForm}
                        value={formData.newCpassword}
                        autoComplete="off"/>
                </div>
              </div>
              <button type='submit'>확인</button>
            </div>
         </form> 
       </div>  
       </div>  
    )}
    </>
  );
}


