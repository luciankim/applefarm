import { useEffect, useState } from "react";
import Tab from "./Tab";
import dayjs, { Dayjs } from "dayjs";
import { BidModal, DelModal, ProductStatus } from "./Modal";
import axios from "axios";
import Pagination from "../../component/Pagination";
import { Link, useNavigate } from "react-router-dom";
const PurchaseHistory = () => {
  //처음 기본값 세팅 => startDate:2개월전 / endDate:오늘 / 최근 2개월 조회 활성화
  const [startDate, setStartDate] = useState(dayjs().subtract(2, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const filterStartDate = startDate.format("YYYY-MM-DD");
  const filterEndDate = endDate.format("YYYY-MM-DD");
  const [activeButton, setActiveButton] = useState("twoMonth");
  const [currentTab, setCurrentTab] = useState(0);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageinfo] = useState({});
  const [tabMenu, setTabMenu] = useState(["구매입찰", "진행중", "종료"]);

  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">구매내역</h3>
      <div className="purchase-history-content-wrap">
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
        {currentTab === 0 ? (
          <PurchaseBid
            reqPage={reqPage}
            setReqPage={setReqPage}
            startDate={startDate}
            endDate={endDate}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            setPageinfo={setPageinfo}
          />
        ) : currentTab === 1 ? (
          <PurchaseOngoing />
        ) : currentTab === 2 ? (
          <PurchaseEnd />
        ) : (
          ""
        )}
        {pageInfo.totalPage === 0 ? (
          ""
        ) : (
          <div className="">
            <Pagination
              pageInfo={pageInfo}
              reqPage={reqPage}
              setReqPage={setReqPage}
            />
          </div>
        )}
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
    setPageinfo,
  } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [status, setStatus] = useState(true);
  const statusList = [
    { name: "전체", color: "black" },
    { name: "입찰중", color: "black" },
    { name: "입찰성공", color: "#0267f3" },
    { name: "품절", color: "#ff3d00" },
  ];
  const [currentStatus, setCurrentSataus] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [bidList, setBidList] = useState([]);

  const statusFunc = () => {
    setModalOpen(true);
  };
  /*
  useEffect(() => {
    //console.log(reqPage);
    //console.log(filterStartDate);
    //console.log(filterEndDate);
  }, [reqPage, endDate, startDate]);
*/
  useEffect(() => {
    axios
      .get(
        backServer +
          "/trade/bid/" +
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
        if (res.data.message === "success") {
          setPageinfo(res.data.data.pi);
          setBidList(res.data.data.bidList);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [reqPage, currentStatus, startDate, endDate, status]);
  return (
    <div className="purchase-history-content">
      <table>
        <thead>
          <tr>
            <td colSpan={2}>
              <div
                className="history-product-status-btn-box"
                onClick={statusFunc}
              >
                <button>{statusList[currentStatus].name}</button>
                <span className="material-icons">keyboard_arrow_down</span>
              </div>
            </td>
            <td>희망최고가</td>
            <td>구매희망가</td>
            <td>상태</td>
          </tr>
        </thead>
        <tbody>
          {bidList.length === 0 ? (
            <tr className="non-list">
              <td colSpan={5}>
                <div>입찰 내역이 없습니다.</div>
              </td>
            </tr>
          ) : (
            bidList.map((item, index) => {
              return (
                <BidItem
                  key={"bid" + index}
                  bid={item}
                  setStatus={setStatus}
                  status={status}
                  reqPage={reqPage}
                  setReqPage={setReqPage}
                  bidList={bidList}
                ></BidItem>
              );
            })
          )}
        </tbody>
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
const StatusBar = () => {
  return (
    <div className="purchase-history-content">
      <table>
        <thead>
          <tr>
            <td colSpan={2}>
              <div
                className="history-product-status-btn-box"
                onClick={statusFunc}
              >
                <button>{statusList[currentStatus].name}</button>
                <span className="material-icons">keyboard_arrow_down</span>
              </div>
            </td>
            <td>희망최고가</td>
            <td>구매희망가</td>
            <td>상태</td>
          </tr>
        </thead>
        <tbody>
          {bidList.length === 0 ? (
            <tr className="non-list">
              <td colSpan={5}>
                <div>입찰 내역이 없습니다.</div>
              </td>
            </tr>
          ) : (
            bidList.map((item, index) => {
              return (
                <BidItem
                  key={"bid" + index}
                  bid={item}
                  setStatus={setStatus}
                  status={status}
                  reqPage={reqPage}
                  setReqPage={setReqPage}
                  bidList={bidList}
                ></BidItem>
              );
            })
          )}
        </tbody>
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
const BidItem = (props) => {
  const { bid, status, setStatus, reqPage, setReqPage, bidList } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [delModalOpen, setDelModalOpen] = useState(false);
  const navigate = useNavigate();
  const delModalFunc = () => {
    setDelModalOpen(true);
  };
  const delBid = () => {
    //입찰 취소
    axios
      .delete(
        backServer +
          "/trade/bid/" +
          bid.bidNo +
          "/" +
          bid.productNo +
          "/" +
          bid.tradeBook
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setDelModalOpen(false);
          setStatus(!status);
          //console.log("list : " + bidList.length);
          //console.log("req:" + reqPage);
          if (reqPage > 1 && bidList.length === 1) {
            setReqPage(reqPage - 1);
          }
        } else {
          alert("서버에 에러가 발생했습니다. 잠시 후 시도해 주세요.");
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  //구매 페이지 이동
  const purchase = () => {
    navigate("/purchase/" + bid.productNo + "/" + "y");
  };
  //입찰가격 변경
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [newBidprice, setNewBidPrice] = useState();
  const bidModal = () => {
    setBidModalOpen(true);
  };
  const changeBid = () => {
    const obj = {
      bidNo: bid.bidNo,
      bidPrice: newBidprice,
    };
    axios
      .patch(backServer + "/trade/bid", obj)
      .then((res) => {
        //console.log(res.data);
        if (res.data.message === "success") {
          setBidModalOpen(false);
          setStatus(!status);
          setNewBidPrice("");
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  return (
    <tr>
      <td className="purcase-date-wrap">
        <div className="purchase-date">{bid.bidDate}</div>
        <Link to={"/product/" + bid.productNo}>
          <div
            className={
              bid.tradeStatus === 0
                ? "member-like-img-box"
                : "member-like-img-box  sold-out-img-box"
            }
          >
            <div>
              <img
                src={bid.productThumbnail}
                className={
                  bid.tradeStatus === 0 ? "like-img" : "sold-out-first-img"
                }
              />
            </div>
            {bid.tradeStatus === 0 ? (
              ""
            ) : (
              <div>
                <img src="/image/soldout.png" className="sold-out-img"></img>
              </div>
            )}
          </div>
        </Link>
      </td>
      <td>
        <Link to={"/product/" + bid.productNo}>
          {bid.tradeBook === 1 ? (
            <div className="trade-book-status sm-f">결제대기</div>
          ) : (
            ""
          )}
          {bid.productSummary}
        </Link>
      </td>
      <td>{bid.maxPrice.toLocaleString()}원</td>
      <td className={bid.tradeBook === 1 ? "trade-book-status" : ""}>
        {bid.bidPrice.toLocaleString()}원
      </td>
      <td>
        {bid.tradeStatus === 1 && bid.tradeBook === 0 ? (
          <>
            <span className="sold-out-color">품절</span>
            <button onClick={delModalFunc}>취소</button>
          </>
        ) : bid.tradeBook === 1 ? (
          <>
            <button className="go-purchase" onClick={purchase}>
              결제하기
            </button>
            <button onClick={delModalFunc}>취소</button>
          </>
        ) : (
          <>
            <button onClick={bidModal}>변경</button>
            <button onClick={delModalFunc}>취소</button>
          </>
        )}
        <>
          {delModalOpen && (
            <DelModal
              setModalOpen={setDelModalOpen}
              clickEvent={delBid}
              text="Are you sure you want to cancel your bid?"
              icon="delete_forever"
            />
          )}
          {bidModalOpen && (
            <BidModal
              setModalOpen={setBidModalOpen}
              clickEvent={changeBid}
              bidPrice={bid.bidPrice}
              productPrice={bid.productPrice}
              setNewBidPrice={setNewBidPrice}
              newBidprice={newBidprice}
              productNo={bid.productNo}
            />
          )}
        </>
      </td>
    </tr>
  );
};
const PurchaseOngoing = () => {
  return <div>진행중</div>;
};
const PurchaseEnd = () => {
  return <div>종료</div>;
};

export default PurchaseHistory;
