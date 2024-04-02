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
import Login from "./page/member/Login";
import QualitySelectFrm from "./page/product/ProductQualityInsert";
import { useState } from "react";
import MemberInfo from "./page/member/MemberInfo";
import Product from "./page/product/Product";

function App() {
  const [isLogin, setIsLogin] = useState(false); //로그인값 , 로그인이 성공했을 때 바껴야 함.

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
            <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
            {/*setIsLogin을 줘야 값이 변경되니까*/}
            {/*제품별 메인을 아래처럼 컴포넌트 하나로 처리 불가능하다면 별 두개로 바꾸고...*/}
            <Route path="/product/*" element={<Product />} />
            <Route path="/mypage/loginInfo" element={<MemberInfo />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
