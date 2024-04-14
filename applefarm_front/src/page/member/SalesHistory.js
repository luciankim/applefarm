import axios from "axios";
import Tab from "./Tab";
import { useEffect, useState } from "react";
import React from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";

const SalesHistory = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [activeButton, setActiveButton] = useState();

  const member = props.member;
  const memberNo = member.memberNo;

  const [products, setProducts] = useState([]); // 판매한 상품 리스트
  const [productNo, setProductNo] = useState(null); // 변경할 상품 번호

  const [currentTab, setCurrentTab] = useState(0); // 현재 탭
  const [tabMenu, setTabMenu] = useState(["판매입찰", "진행중", "완료"]);

  const [displayProducts, setDisplayProducts] = useState([]); // 화면에 보여질 상품 리스트
  const [visibleCount, setVisibleCount] = useState(1); // 초기에 보여줄 상품 수

  const [modalAllSalesIsOpen, setModalAllSalesIsOpen] = useState(false);
  const [modalAllSalesIsOpen2, setModalAllSalesIsOpen2] = useState(false);
  const [modalAllSalesIsOpen3, setModalAllSalesIsOpen3] = useState(false);
  const [modalChangeSalesIsOpen, setModalChangeSalesIsOpen] = useState(false);
  const [modalDeleteSalesIsOpen, setModalDeleteSalesIsOpen] = useState(false);
  const [modalRegisterInvoice, setModalRegisterInvoice] = useState(false);

  const [changePrice, setChangePrice] = useState(""); // 변경할 판매가
  const [selectFilter, setSelectFilter] = useState("전체"); // 선택된 필터

  const [invoiceNumber, setInvoiceNumber] = useState("");

  // 필터링된 상품 리스트
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const filtered = products.filter((product) => {
      const productDate = dayjs(product.productDate); // 제품의 `productDate` 필드를 가정
      return (
        productDate.isAfter(startDate) &&
        productDate.isBefore(endDate.add(1, "day"))
      );
    });
    setFilteredProducts(filtered);
  }, [startDate, endDate, products]);

  //탭 이동시 더보기 리셋
  const handleTabChange = (newTab) => {
    setVisibleCount(1); // 탭을 변경할 때마다 visibleCount를 1로 리셋
    setCurrentTab(newTab);
    setSelectFilter("전체");
  };

  // 필터 변경 및 상품 필터링
  const filterProduct = (filter) => {
    setSelectFilter(filter);
    setVisibleCount(1); // 더보기 전의 초기 상태로 리셋
    const newFilteredProducts = products.filter(
      (product) => filter === "전체" || product.tradeState === filter
    );
    setFilteredProducts(newFilteredProducts);
    setDisplayProducts(newFilteredProducts.slice(0, visibleCount));
    closeModalAllSales();
    closeModalAllSales2();
    closeModalAllSales3();
  };

  // 상품 변경 가격 설정
  const changeSalesPrice = (e) => {
    setChangePrice(e.target.value);
  };
  //송장 번호 set
  const changetInvoiceNumber = (e) => {
    setInvoiceNumber(e.target.value);
  };
  //상품 번호 선택 (변경)
  const selectProductNo = (productNo) => {
    setProductNo(productNo);
    openModalChangeSales();
  };

  //상품 번호 선택 (삭제)
  const selectProductNo2 = (productNo) => {
    setProductNo(productNo);
    openModalDeleteSales();
  };

  //가격 변경 요청
  const submitChangePrice = () => {
    const obj = { changePrice, productNo };
    if (!changePrice || changePrice === 0) {
      Swal.fire("입력값을 확인하세요.");
      return;
    }
    axios
      .patch(backServer + "/member/changeSalesPrice", obj)
      .then((res) => {
        if (res.data.message === "success") {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.productNo === productNo
                ? { ...p, productPrice: changePrice }
                : p
            )
          );
          Swal.fire("변경이 완료되었습니다.");
          closeModalChangeSales();
        }
      })
      .catch(console.error);
  };
  //송장등록(업데이트)
  const registerInvoiceNum = () => {
    console.log(productNo);
    const obj = { productNo: productNo, invoiceNumber: invoiceNumber };
    if (!invoiceNumber || invoiceNumber === 0) {
      Swal.fire("입력값을 확인하세요.");
      return;
    }
    axios
      .patch(backServer + "/member/updateInvoiceNum", obj)
      .then((res) => {
        if (res.data.message === "success") {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.productNo === productNo ? { ...p, tradeState: "배송중" } : p
            )
          );
          Swal.fire("송장등록이 완료되었습니다.");
          closeModalRegisterInvoice();
        }
      })
      .catch((res) => {});
  };

  //상품 삭제
  const deleteSalesProduct = () => {
    axios
      .delete(backServer + "/member/deleteSalesProduct/" + productNo)
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire("판매 취소가 완료되었습니다.");
          closeModalDeleteSales();
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products.filter((product) => {
        const productDate = dayjs(product.productDate);
        const dateInRange =
          productDate.isAfter(startDate) &&
          productDate.isBefore(endDate.add(1, "day"));
        if (!dateInRange) return false;

        switch (currentTab) {
          case 0:
            return (
              selectFilter === "전체" || product.tradeState === selectFilter
            );
          case 1:
            return (
              ["예약중", "결제완료", "배송중"].includes(product.tradeState) &&
              (selectFilter === "전체" || product.tradeState === selectFilter)
            );
          case 2:
            return (
              ["배송완료", "환불", "구매확정"].includes(product.tradeState) &&
              (selectFilter === "전체" || product.tradeState === selectFilter)
            );
          default:
            return false;
        }
      });

      setFilteredProducts(filtered);
      setDisplayProducts(filtered.slice(0, visibleCount));
    };

    filterProducts();
  }, [startDate, endDate, products, currentTab, selectFilter, visibleCount]);

  // 더보기 기능은 상품 목록 업데이트를 위해 visibleCount만 변경합니다.
  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  //모달 열기/닫기 함수들
  const openModalAllSales = () => setModalAllSalesIsOpen(true);
  const closeModalAllSales = () => setModalAllSalesIsOpen(false);
  const openModalAllSales2 = () => setModalAllSalesIsOpen2(true);
  const closeModalAllSales2 = () => setModalAllSalesIsOpen2(false);
  const openModalAllSales3 = () => setModalAllSalesIsOpen3(true);
  const closeModalAllSales3 = () => setModalAllSalesIsOpen3(false);
  const openModalChangeSales = () => setModalChangeSalesIsOpen(true);
  const closeModalChangeSales = () => {
    setModalChangeSalesIsOpen(false);
    setChangePrice("");
  };
  const openModalDeleteSales = () => setModalDeleteSalesIsOpen(true);
  const closeModalDeleteSales = () => setModalDeleteSalesIsOpen(false);
  const openModalRegisterInvoice = () => setModalRegisterInvoice(true);
  const closeModalRegisterInvoice = () => {
    setModalRegisterInvoice(false);
    setInvoiceNumber("");
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

  //초기 상품 데이터 로딩
  useEffect(() => {
    axios
      .post(backServer + "/member/getSalesHistory/" + memberNo)
      .then((res) => {
        if (res.data.message === "success") {
          setProducts(res.data.data);
          setFilteredProducts(res.data.data); // 초기 필터링된 리스트 설정
          setDisplayProducts(res.data.data.slice(0, visibleCount));
        }
      })
      .catch(console.error);
  }, [memberNo, backServer, visibleCount]);

  //상품 배송 조회
  const trackShipment = (productNo) => {
    setProductNo(productNo);
  };

  //예약 확인
  const checkReservation = (productNo) => {
    setProductNo(productNo);
  };

  //송장 등록
  const registerInvoice = (productNo) => {
    setProductNo(productNo);
    openModalRegisterInvoice();
  };

  //환불 내역 조회
  const viewRefundDetails = (productNo) => {
    setProductNo(productNo);
    console.log(productNo);
  };

  //필터링에 따라 화면 변경
  const changeTradeState = (product) => {
    switch (product.tradeState) {
      case "구매확정":
        return <td className="sales-info sales-btn"></td>;
      case "배송완료":
        return <td className="sales-info sales-btn"></td>;
      case "배송중":
        return (
          <td className="sales-info sales-btn">
            <button onClick={() => trackShipment(product.productNo)}>
              배송조회
            </button>
          </td>
        );
      case "예약중":
        return (
          <td className="sales-info sales-btn">
            <button onClick={() => checkReservation(product.productNo)}>
              예약확인
            </button>
          </td>
        );
      case "결제완료":
        return (
          <td className="sales-info sales-btn">
            <button onClick={() => registerInvoice(product.productNo)}>
              송장등록
            </button>
          </td>
        );
      case "환불":
        return (
          <td className="sales-info sales-btn">
            <button onClick={() => viewRefundDetails(product.productNo)}>
              환불내역
            </button>
          </td>
        );
      default:
        return (
          <td className="sales-info sales-btn">
            <button onClick={() => selectProductNo(product.productNo)}>
              변경
            </button>
            <button onClick={() => selectProductNo2(product.productNo)}>
              취소
            </button>
          </td>
        );
    }
  };

  //컴포넌트 반환 (렌더링)
  return (
    <div className="mypage-current-wrap">
      <h3 className="mypage-current-title">판매내역</h3>
      <div className="sales-history-content">
        <Tab
          tabMenu={tabMenu}
          setCurrentTab={handleTabChange}
          currentTab={currentTab}
          startDate={startDate}
          endDate={endDate}
          activeButton={activeButton}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setActiveButton={setActiveButton}
        />
        {currentTab === 0 ? (
          <table className="salesHistory-content">
            <thead>
              <tr className="salesHistory-title">
                <td className="allSales-btn">
                  <button onClick={openModalAllSales}>
                    <span>{selectFilter}</span>
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
                      {dayjs(product.productDate).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link
                        className="sales-link"
                        to={`/mypage/salesProductDetails/${product.productNo}`}
                      >
                        <img
                          className="salesImg"
                          src={product.productThumbnail}
                          alt="Product"
                        />
                      </Link>
                    </td>

                    <td className="sales-info">
                      <Link
                        className="sales-link"
                        to={`/mypage/salesProductDetails/${product.productNo}`}
                      >
                        {product.productSummary}
                      </Link>
                    </td>

                    <td className="sales-info">{product.maxBidPrice}원</td>
                    <td className="sales-info">{product.productPrice}원</td>

                    <td className="sales-info">{product.tradeState}</td>

                    {changeTradeState(product)}
                  </tr>
                </React.Fragment>
              ))}
              <tr className="sales-more-btn">
                {visibleCount < filteredProducts.length && (
                  <button onClick={showMoreItems}>더보기</button>
                )}
              </tr>
            </tbody>
          </table>
        ) : currentTab === 1 ? (
          <>
            <table className="salesHistory-content">
              <thead>
                <tr className="salesHistory-title">
                  <td className="allSales-btn">
                    <button onClick={openModalAllSales2}>
                      <span>{selectFilter}</span>
                      <span className="material-icons arrow-icon">
                        arrow_right
                      </span>
                    </button>
                  </td>
                  <td></td>
                  <td className="sales-title"></td>
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
                        {dayjs(product.productDate).format("YYYY-MM-DD")}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          className="sales-link"
                          to={`/mypage/salesProductDetails/${product.productNo}`}
                        >
                          <img
                            className="salesImg"
                            src={product.productThumbnail}
                            alt="Product"
                          />
                        </Link>
                      </td>

                      <td className="sales-info">
                        <Link
                          className="sales-link"
                          to={`/mypage/salesProductDetails/${product.productNo}`}
                        >
                          {product.productSummary}
                        </Link>
                      </td>
                      <td className="sales-info"></td>
                      <td className="sales-info">{product.productPrice}원</td>

                      <td className="sales-info">{product.tradeState}</td>

                      {changeTradeState(product)}
                    </tr>
                  </React.Fragment>
                ))}
                <tr className="sales-more-btn">
                  {visibleCount < filteredProducts.length && (
                    <button onClick={showMoreItems}>더보기</button>
                  )}
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <table className="salesHistory-content">
              <thead>
                <tr className="salesHistory-title">
                  <td className="allSales-btn">
                    <button onClick={openModalAllSales3}>
                      <span>{selectFilter}</span>
                      <span className="material-icons arrow-icon">
                        arrow_right
                      </span>
                    </button>
                  </td>
                  <td></td>
                  <td className="sales-title"></td>
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
                        {dayjs(product.productDate).format("YYYY-MM-DD")}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          className="sales-link"
                          to={`/mypage/salesProductDetails/${product.productNo}`}
                        >
                          <img
                            className="salesImg"
                            src={product.productThumbnail}
                            alt="Product"
                          />
                        </Link>
                      </td>

                      <td className="sales-info">
                        <Link
                          className="sales-link"
                          to={`/mypage/salesProductDetails/${product.productNo}`}
                        >
                          {product.productSummary}
                        </Link>
                      </td>
                      <td className="sales-info"></td>
                      <td className="sales-info">{product.productPrice}원</td>

                      <td className="sales-info">{product.tradeState}</td>

                      {changeTradeState(product)}
                    </tr>
                  </React.Fragment>
                ))}
                <tr className="sales-more-btn">
                  {visibleCount < filteredProducts.length && (
                    <button onClick={showMoreItems}>더보기</button>
                  )}
                </tr>
              </tbody>
            </table>
          </>
        )}
        <Modal
          isOpen={modalRegisterInvoice}
          onRequestClose={closeModalRegisterInvoice}
          style={modalStyle}
        >
          <div className="invoice-title">송장등록</div>
          <div className="invoice-wrap">
            <div className="sales-change-text">송장번호</div>
            <input
              type="number"
              value={invoiceNumber}
              setData={setInvoiceNumber}
              onChange={changetInvoiceNumber}
              className="sales-price-input"
              placeholder="등록할 송장번호를 입력하세요."
            />
          </div>
          <div className="sales-change-btn-box">
            <button onClick={registerInvoiceNum}>등록</button>
            <button
              className="sales-close-btn2"
              onClick={closeModalRegisterInvoice}
            >
              닫기
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={modalAllSalesIsOpen}
          onRequestClose={closeModalAllSales}
          style={modalStyle}
        >
          <div className="filter-btn-wrap">
            <div className="filter-box1">
              <button onClick={() => filterProduct("전체")}>전체</button>
              <button onClick={() => filterProduct("예약중")}>예약중</button>
              <button onClick={() => filterProduct("배송중")}>배송중</button>
            </div>
            <div className="filter-box2">
              <button onClick={() => filterProduct("결제완료")}>
                결제완료
              </button>
              <button onClick={() => filterProduct("배송완료")}>
                배송완료
              </button>
              <button onClick={() => filterProduct("환불")}>환불</button>
              <button onClick={() => filterProduct("구매확정")}>
                구매확정
              </button>
            </div>
            <div>
              <button className="sales-close-btn" onClick={closeModalAllSales}>
                닫기
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={modalAllSalesIsOpen3}
          onRequestClose={closeModalAllSales3}
          style={modalStyle}
        >
          <div className="filter-btn-wrap">
            <div className="filter-box1">
              <button onClick={() => filterProduct("전체")}>전체</button>
              <button onClick={() => filterProduct("배송완료")}>
                배송완료
              </button>
            </div>
            <div className="filter-box2">
              <button onClick={() => filterProduct("환불")}>환불</button>
              <button onClick={() => filterProduct("구매확정")}>
                구매확정
              </button>
            </div>
            <div>
              <button className="sales-close-btn" onClick={closeModalAllSales3}>
                닫기
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={modalAllSalesIsOpen2}
          onRequestClose={closeModalAllSales2}
          style={modalStyle}
        >
          <div className="filter-btn-wrap">
            <div className="filter-box1">
              <button onClick={() => filterProduct("전체")}>전체</button>
              <button onClick={() => filterProduct("결제완료")}>
                결제완료
              </button>
            </div>
            <div className="filter-box2">
              <button onClick={() => filterProduct("예약중")}>예약중</button>
              <button onClick={() => filterProduct("배송중")}>배송중</button>
            </div>

            <div>
              <button className="sales-close-btn" onClick={closeModalAllSales2}>
                닫기
              </button>
            </div>
          </div>
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
              onChange={changeSalesPrice}
              className="sales-price-input"
              placeholder="변경할 판매가를 입력하세요."
            />
            <span>원</span>
          </div>
          <div className="sales-change-btn-box">
            <button onClick={submitChangePrice}>변경</button>
            <button
              className="sales-close-btn2"
              onClick={closeModalChangeSales}
            >
              닫기
            </button>
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
              <button
                className="sales-close-btn2"
                onClick={closeModalDeleteSales}
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SalesHistory;
