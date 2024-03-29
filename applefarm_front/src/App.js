import Header from "./page/common/Header";
import Footer from "./page/common/Footer";
import "./page/common/default.css";
import { Routes, Route } from "react-router-dom";
import Ref from "./page/common/Ref";
import Mypage from "./page/member/Mypage";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="container">
        <section className="inner_wrap">
          <Routes>
            <Route path="/ref" element={<Ref />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
