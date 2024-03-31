import AdminStat from "./AdminStat";
import AdminRefund from "./AdminRefund";
import { Route, Routes } from "react-router-dom";
import SideMenu from "../../component/SideMenu";
import { useState } from "react";
import "./admin.css";
import BoardList from "../board/BoardList";

const AdminMain = () => {
  const [adminMenu, setAdminMenu] = useState([
    { url: "dashboard", text: "대시보드", active: false },
    { url: "manageMember", text: "회원관리", active: false },
    { url: "memberAccountNumber", text: "내정보", active: false },
    { url: "manageBoard", text: "게시물관리", active: false },
    { url: "manageProduct", text: "상품관리", active: false },
    { url: "managePurchase", text: "구매관리", active: false },
    { url: "manageRefund", text: "환불관리", active: false },
    { url: "manageReport", text: "신고관리", active: false },
    { url: "messageBox", text: "쪽지함", active: false },
  ]);

  return (
    <div className="admin-wrap">
      <div className="admin-sideMenu">
        <div className="admin-title">관리자 메뉴</div>
        <div className="sideMenu-wrap">
          <SideMenu myInfoMenu={adminMenu} setMyInfoMenu={setAdminMenu} />
        </div>
      </div>
      <div className="admin-section-wrap">
        <Routes>
          {/* <Route path="/adminStat" element={<BoardList />} /> */}
          {/* <Route path="/adminMember" element={<BoardList />} /> */}
          {/* <Route path="/memberAccountNumber" element={<t />} /> */}
          <Route path="/manageBoard" element={<BoardList />} />
          {/* <Route path="/adminProduct" element={<AdminProduct />} /> */}
          {/* <Route path="/adminPurchase" element={<AdminPurchase />} /> */}
          <Route path="/manageRefund" element={<AdminRefund />} />
          {/* <Route path="/adminReport" element={<AdminReport />} /> */}
          {/* <Route path="/adminChat" element={<AdminChat />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
