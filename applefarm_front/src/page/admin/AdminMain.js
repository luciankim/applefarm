import AdminRefund from "./AdminRefund";
import { Route, Routes } from "react-router-dom";
import SideMenu from "../../component/SideMenu";
import { useState } from "react";
import "./admin.css";
import AdminMember from "./AdminMember";
import AdminDashboard from "./AdminDashboard";
import AdminReport from "./AdminReport";
import AdminProduct from "./AdminProduct";

import AdminChatRoomList from "./AdminChatRoomList";
import { useEffect } from "react";
import axios from "axios";

const AdminMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  // const isLogin = props.isLogin;
  // const logout = props.logout;
  // const navigate = useNavigate();
  // if (!isLogin && ) {
  //   Swal.fire("로그인 후 이용 가능합니다.").then(() => {
  //     navigate("/");
  //   });
  // }
  const [adminMenu, setAdminMenu] = useState([
    { url: "manageMember", text: "회원관리", active: false },
    { url: "manageProduct", text: "상품관리", active: false },
    { url: "manageRefund", text: "환불관리", active: false },
    { url: "manageReport", text: "신고관리", active: false },
  ]);

  const [member, setMember] = useState({});
  useEffect(() => {
    axios
      .get(backServer + "/member")
      .then((res) => {
        console.log(res.data.data);
        setMember(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
        </Routes>
      </div>
      {/* 챗봇 */}
      <button className="chat-btn" onClick={handleOpen}>
        <svg
          width="40"
          height="40"
          fill="#0092E4"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          id="github"
        >
          <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z" />
        </svg>
      </button>
      {modalOpen && (
        <AdminChatRoomList setModalOpen={setModalOpen} member={member} />
      )}
    </div>
  );
};

export default AdminMain;
