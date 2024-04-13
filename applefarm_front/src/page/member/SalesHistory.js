import axios from "axios";
import Tab from "./Tab";
import { useEffect, useState } from "react";
import React from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

const SalesHistory = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const member = props.member;
  const memberNo = member.memberNo;

  const [product, setProduct] = useState([]); // 판매한 상품리스트
  const [productNo, setProductNo] = useState(null); // 변경할 상품번호

  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState(["판매입찰", "진행중", "완료"]);

  const [displayProducts, setDisplayProducts] = useState([]); //화면에 보여지는 상품 리스트
  const [visibleCount, setVisibleCount] = useState(2); //초기에 보여주는 항목 수 셋팅

  const [modalAllSalesIsOpen, setModalAllSalesIsOpen] = useState(false); //모달 열기/닫기
  const [modalChangeSalesIsOpen, setModalChangeSalesIsOpen] = useState(false); //모달 열기/닫기
  const [modalDeleteSalesIsOpen, setModalDeleteSalesIsOpen] = useState(false); //모달 열기/닫기

  const [changePrice, setChangePrice] = useState(""); //변경할 판매가

  const changeSalesPrice = (e) => {
    setChangePrice(e.target.value);
  };

  const selectProductNo = (productNo) => {
    setProductNo(productNo);
    openModalChangeSales();
  };

  const selectProductNo2 = (productNo) => {
    setProductNo(productNo);
    openModalDeleteSales();
  };

  const submitChangePrice = () => {
    const obj = { changePrice: changePrice, productNo: productNo };
    console.log(changePrice, productNo);

    axios
      .patch(backServer + "/member/changeSalesPrice", obj)
      .then((res) => {
        if (res.data.message === "success") {
          setProduct((prevProducts) =>
            prevProducts.map((p) =>
              p.productNo === productNo
                ? { ...p, productPrice: changePrice } //해당하는 상품만 랜더링 다시 돌게
                : p
            )
          );
          Swal.fire("변경이 완료되었습니다.");
          closeModalChangeSales();
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  const deleteSalesProduct = () => {
    console.log(productNo);
    axios
      .delete(backServer + "/member/deleteSalesProduct/" + productNo)
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire("판매 취소가 완료되었습니다.");
          closeModalDeleteSales();
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  const showMoreItems = () => {
    setVisibleCount((prevValue) => prevValue + 4); //현재 표시되는 항목 수를 4개 증가
  };

  // 모달 열기
  const openModalAllSales = () => {
    setModalAllSalesIsOpen(true);
  };

  //모달 닫기
  const closeModalAllSales = () => {
    setModalAllSalesIsOpen(false);
  };

  // 모달 열기
  const openModalChangeSales = () => {
    setModalChangeSalesIsOpen(true);
  };

  //모달 닫기
  const closeModalChangeSales = () => {
    setModalChangeSalesIsOpen(false);
    setChangePrice("");
  };

  // 모달 열기
  const openModalDeleteSales = () => {
    setModalDeleteSalesIsOpen(true);
  };

  //모달 닫기
  const closeModalDeleteSales = () => {
    setModalDeleteSalesIsOpen(false);
  };

  //모달 스타일
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "1000", //오버레이 z-index
    },
    content: {
      padding: "39px",
      width: "30%",
      height: "35%",
      margin: "12% auto",
      borderRadius: "15px",
      zIndex: "1001", //모달 컨텐츠 z-index
      position: "relative", //모달 컨텐츠 포지션,이게 있어야 zIndex 사용
    },
  };

  useEffect(() => {
    axios
      .post(backServer + "/member/getSalesHistory/" + memberNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setProduct(res.data.data);
          setDisplayProducts(res.data.data.slice(0, visibleCount));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [memberNo, backServer, visibleCount]);

  //visibleCount가 변경될 때마다 displayProducts 업데이트
  useEffect(() => {
    setDisplayProducts(product.slice(0, visibleCount));
  }, [product, visibleCount]);

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
        {currentTab === 0 ? (
          <>
            <table className="salesHistory-content">
              <thead>
                <tr className="salesHistory-title">
                  <td className="allSales-btn">
                    <button onClick={openModalAllSales}>
                      <span>전체</span>
                      <span className="material-icons arrow-icon">
                        arrow_right
                      </span>
                    </button>
                  </td>
                  <td></td>
                  <td className="sales-title">최고입찰가</td>
                  <td className="sales-title">판매가</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {displayProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="salesDate">
                        {new Date(product.tradeDate).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          className="salesImg"
                          src={product.productThumbnail}
                          alt="Product"
                        />
                      </td>
                      <td className="sales-info">{product.productSummary}</td>
                      <td className="sales-info">{product.maxBidPrice}원</td>
                      <td className="sales-info">{product.productPrice}원</td>
                      <td className="sales-info">{product.tradeState}</td>
                      <td className="sales-info sales-btn">
                        <button
                          onClick={() => selectProductNo(product.productNo)}
                        >
                          변경
                        </button>
                        <button
                          onClick={() => selectProductNo2(product.productNo)}
                        >
                          취소
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
                <tr className="sales-more-btn">
                  {visibleCount < product.length && (
                    <button onClick={showMoreItems}>더보기</button>
                  )}
                </tr>
              </tbody>
            </table>
          </>
        ) : currentTab === 1 ? (
          <>"진행중"</>
        ) : (
          "완료"
        )}
        <Modal
          isOpen={modalAllSalesIsOpen}
          onRequestClose={closeModalAllSales}
          style={modalStyle}
        >
          <p>안녕</p>
        </Modal>
        <Modal
          isOpen={modalChangeSalesIsOpen}
          onRequestClose={closeModalChangeSales}
          style={modalStyle}
        >
          <div className="sales-change-title">판매가 변경</div>
          <div className="sales-change-box">
            <div className="sales-change-text">판매가</div>
            <input
              type="number"
              value={changePrice}
              setData={setChangePrice}
              onChange={changeSalesPrice}
              className="sales-price-input"
              placeholder="변경할 판매가를 입력하세요."
            />
            <span>원</span>
          </div>
          <div className="sales-change-btn-box">
            <button onClick={submitChangePrice}>변경</button>
            <button onClick={closeModalChangeSales}>닫기</button>
          </div>
        </Modal>
        <Modal
          isOpen={modalDeleteSalesIsOpen}
          onRequestClose={closeModalDeleteSales}
          style={modalStyle}
        >
          <div className="sales-delete-wrap">
            <div className="sales-delete-title">판매를 취소하시겠습니까?</div>
            <div className="sales-delete-btn-box">
              <button onClick={deleteSalesProduct}>취소</button>
              <button onClick={closeModalDeleteSales}>닫기</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SalesHistory;
