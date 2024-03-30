import Header from "./page/common/Header";
import Footer from "./page/common/Footer";
import "./page/common/default.css";
import { Routes, Route } from "react-router-dom";
import Ref from "./page/common/Ref";
import Mypage from "./page/member/Mypage";
import MemberWish from "./page/member/MemberWish";
import BoardMain from "./page/board/BoardMain";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="container">
        <section className="inner-wrap">
          <Routes>
            <Route path="/ref" element={<Ref />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/member/wish" element={<MemberWish />} />
            {/* isLogin={isLogin} 추가 필요 - 삭제 예정*/}
            <Route path="/board/*" element={<BoardMain />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
