import Header from "./page/common/Header";
import Footer from "./page/common/Footer";
import "./page/common/default.css";
import { Routes, Route } from "react-router-dom";
import Ref from "./page/common/Ref";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="container">
        <section className="inner_wrap">
          <Routes>
            <Route path="/ref" element={<Ref />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
