import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0); // 페이지 이동 시 맨 위로 스크롤
    }, [pathname]);
  
    return null;
}

