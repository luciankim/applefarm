import Tab from "./Tab";
import { useState } from "react";

const SalesHistory = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState([
    { name: "판매입찰", content: <SalesBid /> },
    { name: "진행중", content: <SalesOngoing /> },
    { name: "종료", content: <SalesEnd /> },
  ]);

  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">판매내역</h3>
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
const SalesBid = () => {
  return <div>판매입찰</div>;
};
const SalesOngoing = () => {
  return <div>진행중</div>;
};
const SalesEnd = () => {
  return <div>종료</div>;
};

export default SalesHistory;
