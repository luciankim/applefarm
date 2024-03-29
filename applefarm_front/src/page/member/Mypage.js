import { useState } from "react";
import "./member.css";
import SideMenu from "../../component/SideMenu";

//로그인 정보 가져오기
const Mypage = () => {
  const [myInfoMenu, setMyInfoMenu] = useState([
    { url: "loginInfo", text: "로그인 정보", active: false },
    { url: "sellerGrade", text: "판매자 등급", active: false },
    { url: "memberAccountNumber", text: "판매 정산 계좌", active: false },
    { url: "addressList", text: "주소록", active: false },
    { url: "viewMyPost", text: "내가 쓴 글", active: false },
  ]);

  const [myShoppingMenu, setMyShoppingMenu] = useState([
    { url: "purchaseHistory", text: "구매내역", active: false },
    { url: "salesHistory", text: "판매내역", active: false },
    { url: "refundHistory", text: "환불내역", active: false },
  ]);

  return (
    <div className="mypage-sideMenu">
      <div className="mypage-title">마이페이지</div>
      <div className="sideMenu-title">내 정보</div>
      <SideMenu myInfoMenu={myInfoMenu} setMyInfoMenu={setMyInfoMenu} />
      <div className="sideMenu-title">쇼핑 정보</div>
      <SideMenu
        myShoppingMenu={myShoppingMenu}
        setMyShoppingMenu={setMyShoppingMenu}
      />
    </div>
  );
};

export default Mypage;
