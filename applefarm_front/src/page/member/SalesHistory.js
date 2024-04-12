import Tab from "./Tab";
import { useState } from "react";

const SalesHistory = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState(["판매입찰", "진행중", "완료"]);

  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">판매내역</h3>
      <div className="sales-history-content">
        <Tab
          tabMenu={tabMenu}
          setTabMenu={setTabMenu}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === 0 ? "판매입찰" : currentTab === 1 ? "진행중" : "완료"}
      </div>
    </div>
  );
};

export default SalesHistory;
