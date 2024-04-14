import { useEffect, useState } from "react";
import Tab from "./Tab";
import dayjs, { Dayjs } from "dayjs";
import {
  BidModal,
  DelModal,
  ProductStatus,
  RefundModal,
  ReviewModal,
  SuccessModal,
} from "./Modal";
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
  const [currentStatus, setCurrentStatus] = useState(0);

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
          setCurrentStatus={setCurrentStatus}
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
        ) : (
          <PurchaseOngoing
            reqPage={reqPage}
            setReqPage={setReqPage}
            startDate={startDate}
            endDate={endDate}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            setPageinfo={setPageinfo}
            currentTab={currentTab}
            setCurrentStatus={setCurrentStatus}
            currentStatus={currentStatus}
          />
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
//thead(상태선택바)
const StatusBar = (props) => {
  //const [currentStatus, setCurrentStatus] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const statusFunc = () => {
    setModalOpen(true);
  };
  const { statusList, currentStatus, setCurrentStatus, complete } = props;
  return (
    <>
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
            {modalOpen && (
              <ProductStatus
                setModalOpen={setModalOpen}
                statusList={statusList}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
              />
            )}
          </td>
          {complete === "1" ? (
            <>
              <td>거래금액</td>
            </>
          ) : (
            <>
              <td>희망최고가</td>
              <td>구매희망가</td>
            </>
          )}
          <td>상태</td>
        </tr>
      </thead>
    </>
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
  const [currentStatus, setCurrentStatus] = useState(0);
  const [bidList, setBidList] = useState([]);

  useEffect(() => {
    setReqPage(1);
  }, [currentStatus]);

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
        <StatusBar
          statusList={statusList}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
        />
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
        } else {
          alert("서버에 에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
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
        {bid.tradeBook === 1 ? (
          <span className="trade-book-status sm-f">결제대기</span>
        ) : (
          ""
        )}
        <Link to={"/product/" + bid.productNo}>
          <div>{bid.productSummary}</div>
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
              <div className="two_text">결제하기</div>
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

const PurchaseOngoing = (props) => {
  const {
    reqPage,
    setReqPage,
    startDate,
    endDate,
    filterStartDate,
    filterEndDate,
    setPageinfo,
    currentTab,
    currentStatus,
    setCurrentStatus,
  } = props;

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [status, setStatus] = useState(true);
  const [tradeList, setTradeList] = useState([]);

  const statusList1 = [
    { name: "전체", color: "black" },
    { name: "결제완료", color: "black" },
    { name: "배송중", color: "black" },
  ];
  const statusList2 = [
    { name: "전체", color: "black" },
    { name: "배송완료", color: "black" },
    { name: "구매확정", color: "#0267f3" },
    { name: "환불", color: "#ff3d00" },
  ];
  //tab=1: 결제된 상품=>결제완료, 판매자가 송장등록시=>배송중(배송상태 조회)
  //tab=2: 배송완료(구매확정, 환불신청), 구매확정(후기작성), 환불
  useEffect(() => {
    axios
      .get(
        backServer +
          "/trade/purchase/" +
          currentTab +
          "/" +
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
          setTradeList(res.data.data.tradeList);
          setPageinfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [reqPage, currentStatus, startDate, endDate, currentTab, status]);
  return (
    <div className="purchase-history-content">
      <table>
        <StatusBar
          statusList={currentTab === 1 ? statusList1 : statusList2}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          complete="1"
        />
        <tbody>
          {tradeList.length === 0 ? (
            <tr className="non-list">
              <td colSpan={5}>
                <div>거래 내역이 없습니다.</div>
              </td>
            </tr>
          ) : (
            tradeList.map((item, index) => {
              return (
                <TradeItem
                  key={"trade" + index}
                  trade={item}
                  tradeList={tradeList}
                  status={status}
                  setStatus={setStatus}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
const TradeItem = (props) => {
  const { trade, status, setStatus, reqPage, setReqPage, tradeList } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [successModal, setSuccessModal] = useState(false);
  const [okModalOpen, setOkModalOpen] = useState(false);
  const okModalFunc = () => {
    setOkModalOpen(true);
  };

  const okPurchase = () => {
    //구매확정
    const obj = { tradeNo: trade.tradeNo };
    axios
      .patch(backServer + "/trade/purchaseConfirm", obj)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          console.log(status);
          setStatus(!status);
          setOkModalOpen(false);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };
  //후기작성
  const [successText, setSuccessText] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const reviewModalFunc = () => {
    setReviewModalOpen(true);
  };
  //환불신청
  const [refModalOpen, setRefModalOpen] = useState(false);
  const refModalFunc = () => {
    setRefModalOpen(true);
  };
  const openWindow = () => {
    window.open(
      "http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=" +
        trade.invoiceNumber,
      "택배조회",
      "width=700, height=500"
    );
    {
      /*http://nplus.doortodoor.co.kr/web/detail.jsp?slipno= + 운송장 번호
      https://link.tracker.delivery/track?client_id=3o2asob3vhbhc152ccv43v6uuq&carrier_id=kr.cjlogistics&tracking_number="+운송장번호
     */
    }
  };
  return (
    <tr>
      <td className="purcase-date-wrap">
        <div className="purchase-date">{trade.tradeDate}</div>
        <Link to={"/product/" + trade.productNo}>
          <div className="member-like-img-box">
            <div>
              <img src={trade.productThumbnail} className="like-img" />
            </div>
          </div>
        </Link>
      </td>
      <td>
        <Link to={"/mypage/detailOrder/" + trade.productNo}>
          {trade.productSummary}
        </Link>
      </td>
      <td>{trade.tradePrice.toLocaleString()}원</td>
      <td>
        <div>
          <span className="openInvice" onClick={openWindow}>
            {trade.invoiceNumber}
          </span>
        </div>
        <div
          className={
            trade.tradeState === "구매확정"
              ? "lsr-cb"
              : trade.tradeState === "환불"
              ? "lsr-cr"
              : ""
          }
        >
          {trade.tradeState}
        </div>
        {trade.tradeState === "배송완료" ? (
          <>
            <button onClick={okModalFunc}>구매확정</button>
            <button onClick={refModalFunc}>환불신청</button>
          </>
        ) : trade.tradeState === "구매확정" ? (
          trade.review !== 1 ? (
            <button onClick={reviewModalFunc}>후기작성</button>
          ) : (
            <button disabled={true}>후기작성완료</button>
          )
        ) : (
          ""
        )}
        <>
          {okModalOpen && (
            <DelModal
              setModalOpen={setOkModalOpen}
              clickEvent={okPurchase}
              icon="verified"
              text="구매를 확정하시겠습니까?"
            />
          )}
          {reviewModalOpen && (
            <ReviewModal
              status={status}
              setStatus={setStatus}
              setModalOpen={setReviewModalOpen}
              setSuccessModal={setSuccessModal}
              trade={trade}
              setSuccessText={setSuccessText}
            />
          )}
          {successModal && (
            <SuccessModal setModalOpen={setSuccessModal} text={successText} />
          )}
          {refModalOpen && (
            <RefundModal
              setModalOpen={setRefModalOpen}
              status={status}
              setStatus={setStatus}
              setSuccessModal={setSuccessModal}
              trade={trade}
              setSuccessText={setSuccessText}
            />
          )}
        </>
      </td>
    </tr>
  );
};
export default PurchaseHistory;
