import Header from "./page/common/Header";
import Footer from "./page/common/Footer";
import "./page/common/default.css";
import { Routes, Route } from "react-router-dom";
import Ref from "./page/common/Ref";
import Mypage from "./page/member/Mypage";
import MemberWish from "./page/member/MemberWish";
import BoardMain from "./page/board/BoardMain";
import Join from "./page/member/Join";
import AdminMain from "./page/admin/AdminMain";
import ProductMain from "./page/product/ProductMain";
import Login from "./page/member/Login";
import QualitySelectFrm from "./page/product/QualitySelectFrm";
import { useState } from "react";
import MemberInfo from "./page/member/MemberInfo";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false); //로그인값 , 로그인이 성공했을 때 바껴야 함.

  const [token, setToken] = useState(""); //토큰 값
  const [expiredTime, setExpiredTime] = useState(""); //만료시간

  const login = (accessToken) => {
    //로그인 성공 시 받은 accessToken을 token state에 저장
    setToken(accessToken);
    //로그인 성공한 순간을 기준으로 1시간 뒤에 만료시간임 -> 그 데이터를 저장해둠
    const tokenExpired = new Date(new Date().getTime() + 60 * 60 * 1000);
    setExpiredTime(tokenExpired);
    //토큰이랑 만료시간을 객체로 묶은 후 문자열로 변환해서 localStorage에 저장
    const obj = { accessToken, tokenExpired: tokenExpired.toISOString }; //엑세스 토큰은 문자열이라 상관 없지만 토근만료는 객체형태임 -> 문자열 형태로 바꿔줌

    //로컬스저장소는 문자열만 저장이 가능하므로 묶은 객체도 문자열로 변환
    const member = JSON.stringify(obj);
    window.localStorage.setItem("member", member);
    //axios 헤더에 토큰값 자동설정
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    setIsLogin(true);
  };

  return (
    <div className="wrap">
      <Header isLogin={isLogin} /> {/*여기는 isLogin 값*/}
      <main className="container">
        <section className="inner-wrap">
          <Routes>
            <Route path="/ref" element={<Ref />} />
            <Route path="/mypage/*" element={<Mypage />} />
            {/* isLogin={isLogin} 추가 필요 - 삭제 예정*/}
            <Route path="/board/*" element={<BoardMain />} />
            <Route path="/join" element={<Join />} />
            <Route path="/admin/*" element={<AdminMain />} />
            <Route path="/login" element={<Login login={login} />} />
            {/*제품별 메인을 아래처럼 컴포넌트 하나로 처리 불가능하다면 별 두개로 바꾸고...*/}
            <Route path="/product" element={<ProductMain />} />
            <Route path="/QualitySelectFrm" element={<QualitySelectFrm />} />
            <Route path="/mypage/loginInfo" element={<MemberInfo />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
