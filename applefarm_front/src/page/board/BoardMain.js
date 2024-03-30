import "./board.css";
import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import SideMenu from "../../component/SideMenu";
import BoardWrite from "./BoardWrite";
const BoardMain = (props) => {
  const isLogin = props.isLogin;
  return (
    <div className="inner-section-wrap">
      <Routes>
        <Route path="/list" element={<BoardList isLogin={isLogin} />} />
        <Route path="/write" element={<BoardWrite />} />
      </Routes>
    </div>
  );
};

export default BoardMain;
