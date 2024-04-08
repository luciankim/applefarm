import { useState } from "react";
import Tab from "./Tab";

const PurchaseHistory = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState([
    { name: "구매입찰", content: <PurchaseBid /> },
    { name: "진행중", content: <PurchaseOngoing /> },
    { name: "종료", content: <PurchaseEnd /> },
  ]);

  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">구매내역</h3>
      <div className="purchase-history-content">
        <Tab
          tabMenu={tabMenu}
          setTabMenu={setTabMenu}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </div>
  );
};
const PurchaseBid = () => {
  return <div>구매입찰</div>;
};
const PurchaseOngoing = () => {
  return <div>진행중</div>;
};
const PurchaseEnd = () => {
  return <div>종료</div>;
};
export default PurchaseHistory;
