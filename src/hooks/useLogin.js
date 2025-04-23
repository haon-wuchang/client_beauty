import  { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext.js';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    /* 헤더-로그아웃,마이페이지-로그아웃, 마이페이지-회원탈퇴 시 로그아웃 전역 관리 */
    const handleLogin = async (type, text) => {
        if (text === 'logout') {
            const handleLog = window.confirm("로그아웃 하시겠습니까?");
            if (handleLog) {
                setIsLoggedIn(type);
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                navigate('/');
            } else {
                navigate('/');
            }
        } else if (text === 'delete') {
            setIsLoggedIn(type);
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            navigate('/');
        }
    }


    return { handleLogin };
}