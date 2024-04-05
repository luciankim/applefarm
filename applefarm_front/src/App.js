import Header from "./page/common/Header";
import Footer from "./page/common/Footer";
import "./page/common/default.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Ref from "./page/common/Ref";
import Mypage from "./page/member/Mypage";
import MemberWish from "./page/member/MemberWish";
import BoardMain from "./page/board/BoardMain";
import Join from "./page/member/Join";
import AdminMain from "./page/admin/AdminMain";
import Login from "./page/member/Login";
import QualitySelectFrm from "./page/product/ProductQualityInsert";
import { useEffect, useState } from "react";
import MemberInfo from "./page/member/MemberInfo";
import Product from "./page/product/Product";
import axios from "axios";
import Payment from "./page/member/Payment";
import Nav from "./page/common/Nav";
import CompletePayment from "./page/member/CompletePayment";
import Swal from "sweetalert2";

function App() {
  const navigate = useNavigate();
  //스토리지에 저장된 데이터를 꺼내서 객체형식으로 변환
  const obj = JSON.parse(window.localStorage.getItem("member"));
  const [isLogin, setIsLogin] = useState(obj ? true : false); //로그인상태를 체크하는 state
  const [token, setToken] = useState(obj ? obj.accessToken : ""); //토큰값
  const [expiredTime, setExpiredTime] = useState(
    obj ? new Date(obj.tokenExpired) : ""
  ); //만료시간
  if (obj) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  const login = (accessToken) => {
    //로그인 성공 시 받은 accessToken을 token state에 저장
    setToken(accessToken);
    //로그인 성공한 순간을 기준으로 1시간 뒤에 만료시간임 -> 그데이터를 저장
    const tokenExpired = new Date(new Date().getTime() + 60 * 60 * 1000);
    setExpiredTime(tokenExpired);
    //토큰이랑, 만료시간을 객체로 묶은 후 문자열로 변환해서 localStorage에 저장
    const obj = { accessToken, tokenExpired: tokenExpired.toISOString() };
    //localStorage에는 문자열만 저장이 가능하므로 묶은 객체도 문자열로 변환
    const member = JSON.stringify(obj);
    //로컬스토리지에 데이터 저장
    window.localStorage.setItem("member", member);
    //axios헤더에 토큰값 자동설정
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    setIsLogin(true);

    const remainingTime = tokenExpired.getTime() - new Date().getTime();
    console.log(remainingTime);
    setTimeout(logout, remainingTime);
  };
  const logout = () => {
    //로그인할때 변경한 사항을 모두 원래대로 복원
    setToken("");
    setExpiredTime("");
    window.localStorage.removeItem("member");
    axios.defaults.headers.common["Authorization"] = null;
    setIsLogin(false);
  };
  //페이지가 로드되면,새로고침되면
  useEffect(() => {
    if (isLogin) {
      //로그인이 되어있으면
      //저장해 둔 만료시간을 꺼내서 현재시간과 비교한 후 종료함수 설정
      const remainingTime = expiredTime.getTime() - new Date().getTime();
      setTimeout(logout, remainingTime);
    }
  }, []);

  //박성완 - Nav.js 정보
  /*
  const [table, setTable] = useState("IPHONE_TBL");
  const [navProductLine, setNavProductLine] = useState("iPhone");
  const [navProductGen, setNavProductGen] = useState("iPhone 15 Series");
  */
  /*
  const table = "IPHONE_TBL"; //반드시 대문자로 받을것!!
  const navProductLine = "iPhone";
  const navProductGen = "iPhone 15 Series"; //없을 경우 ""로 받을것!!
  */

  return (
    <div className="wrap">
      <header>
        <Header isLogin={isLogin} logout={logout} /> {/*여기는 isLogin 값*/}
      </header>
      <main className="container">
        <Nav
        /*
          table={table}
          setTable={setTable}
          navProductLine={navProductLine}
          setNavProductLine={setNavProductLine}
          navProductGen={navProductGen}
          setNavProductGen={setNavProductGen}
          */
        />
        <section className="inner-wrap">
          <Routes>
            <Route path="/ref" element={<Ref />} />
            <Route path="/mypage/*" element={<Mypage isLogin={isLogin} />} />
            {/* isLogin={isLogin} 추가 필요 - 삭제 예정*/}
            <Route path="/board/*" element={<BoardMain />} />
            <Route path="/join" element={<Join />} />
            <Route path="/admin/*" element={<AdminMain />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route
              path="/purchase/:productNo"
              element={<Payment isLogin={isLogin} />}
            />
            <Route
              path="/completePayment/:productNo"
              element={<CompletePayment isLogin={isLogin} />}
            />
            {/*setIsLogin을 줘야 값이 변경되니까*/}
            <Route
              path="/product/*"
              element={
                <Product
                /*
                  table={table}
                  navProductLine={navProductLine}
                  navProductGen={navProductGen}
                  */
                />
              }
            />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
