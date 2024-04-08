import { useState } from "react";
import Tab from "./Tab";
import dayjs, { Dayjs } from "dayjs";
const PurchaseHistory = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [tabMenu, setTabMenu] = useState([
    { name: "구매입찰", content: <PurchaseBid /> },
    { name: "진행중", content: <PurchaseOngoing /> },
    { name: "종료", content: <PurchaseEnd /> },
  ]);

  const [tradeList, setTradeList] = useState([]);

  //처음 기본값 세팅 => startDate:2개월전 / endDate:오늘 / 최근 2개월 조회 활성화
  const [startDate, setStartDate] = useState(dayjs().subtract(2, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const filterStartDate = startDate.format("YYYY/MM/DD");
  const filterEndDate = endDate.format("YYYY/MM/DD");
  const [activeButton, setActiveButton] = useState("twoMonth");

  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">구매내역</h3>
      <div className="purchase-history-content">
        <Tab
          tabMenu={tabMenu}
          setTabMenu={setTabMenu}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
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
