import { useEffect, useState } from "react";
import Tab from "./Tab";
import dayjs, { Dayjs } from "dayjs";
import { ProductStatus } from "./Modal";
import axios from "axios";
const PurchaseHistory = () => {
  //처음 기본값 세팅 => startDate:2개월전 / endDate:오늘 / 최근 2개월 조회 활성화
  const [startDate, setStartDate] = useState(dayjs().subtract(2, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const filterStartDate = startDate.format("YYYY/MM/DD");
  const filterEndDate = endDate.format("YYYY/MM/DD");
  const [activeButton, setActiveButton] = useState("twoMonth");

  const [currentTab, setCurrentTab] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [tabMenu, setTabMenu] = useState([
    {
      name: "구매입찰",
      content: (
        <PurchaseBid
          reqPage={reqPage}
          setReqPage={setReqPage}
          startDate={startDate}
          endDate={endDate}
          filterStartDate={filterStartDate}
          filterEndDate={filterEndDate}
        />
      ),
    },
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
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          setReqPage={setReqPage}
        />
      </div>
    </div>
  );
};
const PurchaseBid = (props) => {
  const {
    reqPage,
    setReqPage,
    startDate,
    endDate,
    filterStartDate,
    filterEndDate,
  } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const statusList = [
    { name: "전체", color: "black" },
    { name: "입찰중", color: "black" },
    { name: "품절", color: "red" },
  ];
  const [currentStatus, setCurrentSataus] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [bidList, setBidList] = useState([]);
  const statusFunc = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    axios
      .get(
        backServer +
          "/member/bid/" +
          currentStatus +
          "/" +
          reqPage +
          "/" +
          filterStartDate +
          "/" +
          filterEndDate
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [reqPage, currentStatus, startDate, endDate]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <div className="history-product-status-btn-box">
                <button onClick={statusFunc}>
                  {statusList[currentStatus].name}
                </button>
                <span className="material-icons">keyboard_arrow_down</span>
              </div>
            </td>
            <td></td>
            <td>희망최고가</td>
            <td>구매희망가</td>
            <td>상태</td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {modalOpen && (
        <ProductStatus
          setModalOpen={setModalOpen}
          statusList={statusList}
          currentStatus={currentStatus}
          setCurrentSataus={setCurrentSataus}
        />
      )}
    </div>
  );
};
const PurchaseOngoing = () => {
  return <div>진행중</div>;
};
const PurchaseEnd = () => {
  return <div>종료</div>;
};

export default PurchaseHistory;
