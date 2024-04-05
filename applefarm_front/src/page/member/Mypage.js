import { useState } from "react";
import "./member.css";
import SideMenu from "../../component/SideMenu";
import { Route, Routes, useNavigate } from "react-router-dom";
import Address from "./Address";
import MemberWish from "./MemberWish";
import MemberInfo from "./MemberInfo";
import Swal from "sweetalert2";
import DetailOrder from "./DetailOrder";

//로그인 정보 가져오기
const Mypage = (props) => {
  const token = window.localStorage.getItem("token"); //로그인 정보가 token 에 들어있음.
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.isLogin;
  const navigate = useNavigate();
  if (!isLogin) {
    Swal.fire("로그인 후 이용 가능합니다.")
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  }
  const [myInfoMenu, setMyInfoMenu] = useState([
    { url: "loginInfo", text: "로그인 정보", active: false },
    { url: "sellerGrade", text: "판매자 등급", active: false },
    { url: "memberAccountNumber", text: "판매 정산 계좌", active: false },
    { url: "address", text: "주소록", active: false },
    { url: "viewMyPost", text: "내가 쓴 글", active: false },
  ]);

  const [myShoppingMenu, setMyShoppingMenu] = useState([
    { url: "purchaseHistory", text: "구매내역", active: false },
    { url: "salesHistory", text: "판매내역", active: false },
    { url: "refundHistory", text: "환불내역", active: false },
    { url: "wish", text: "좋아요", active: false },
  ]);

  return (
    <div className="mypage-wrap">
      <div className="mypage-sideMenu">
        <div className="mypage-title">마이페이지</div>
        <div className="sideMenu-wrap">
          <div className="sideMenu-title">내 정보</div>
          <SideMenu myInfoMenu={myInfoMenu} setMyInfoMenu={setMyInfoMenu} />
          <div className="sideMenu-title">쇼핑 정보</div>
          <SideMenu
            myShoppingMenu={myShoppingMenu}
            setMyShoppingMenu={setMyShoppingMenu}
          />
        </div>
      </div>
      <div className="mypage-content">
        <Routes>
          <Route path="/address" element={<Address />}></Route>
          <Route path="/wish" element={<MemberWish />}></Route>
          <Route path="/loginInfo" element={<MemberInfo isLogin={isLogin} />} />
          <Route path="/detailOrder/:productNo" element={<DetailOrder />} />
        </Routes>
      </div>
    </div>
  );
};

export default Mypage;
