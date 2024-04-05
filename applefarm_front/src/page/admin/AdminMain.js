import AdminStat from "./AdminStat";
import AdminRefund from "./AdminRefund";
import { Route, Routes } from "react-router-dom";
import SideMenu from "../../component/SideMenu";
import { useState } from "react";
import "./admin.css";
import AdminMember from "./AdminMember";
import AdminDashboard from "./AdminDashboard";
import AdminReport from "./AdminReport";
import AdminProduct from "./AdminProduct";

const AdminMain = () => {
  const [adminMenu, setAdminMenu] = useState([
    { url: "dashboard", text: "대시보드", active: false },
    { url: "manageMember", text: "회원관리", active: false },
    { url: "manageProduct", text: "상품관리", active: false },
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
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manageMember" element={<AdminMember />} />
          <Route path="/manageProduct" element={<AdminProduct />} />
          <Route path="/manageRefund" element={<AdminRefund />} />
          <Route path="/manageReport" element={<AdminReport />} />
          {/* <Route path="/adminChat" element={<AdminChat />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
