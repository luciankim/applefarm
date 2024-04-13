import axios from "axios";
import Tab from "./Tab";
import { useEffect, useState } from "react";

const SalesHistory = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const member = props.member;

  const memberNo = member.memberNo;

  const [salesProduct, setSalesProduct] = useState([]); //판매한 상품리스트
  const [allProduct, setAllProduct] = useState([]); //전체 판매하는 상품 리스트
  const [hopeBidPrice, setHopeBidPrice] = useState([]); //최고 구매희망가

  const [currentTab, setCurrentTab] = useState(0);
  const [tabMenu, setTabMenu] = useState(["판매입찰", "진행중", "완료"]);

  useEffect(() => {
    //판매한 상품 리스트(진행중인것만..)
    axios
      .post(backServer + "/member/getSalesHistory/" + memberNo)

      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setSalesProduct(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
    // 판매하는 전체 상품 리스트
    axios
      .post(backServer + "/member/allSalesList/" + memberNo)
      .then((res) => {
        console.log(res.data);
        setAllProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res.data);
      });

    //구매 희망가(전체 판매 리스트)
    axios
      .post(backServer + "/member/getHopeBidPrice/" + memberNo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [memberNo, backServer]);

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
            <div>판매입찰</div>
            {allProduct.map((product, index) => {
              return (
                <>
                  <table>
                    <thead>
                      <tr>
                        <td>
                          {new Date(product.productDate).toLocaleDateString(
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
                          />
                        </td>
                        <td>{product.productSummary}</td>
                        <td>{product.productPrice}원</td>
                      </tr>
                    </thead>
                  </table>
                </>
              );
            })}
          </>
        ) : currentTab === 1 ? (
          <>
            "진행중"
            <div>내역</div>
            {salesProduct.map((product, index) => {
              return (
                <>
                  <img className="salesImg" src={product.productThumbnail} />
                  <div>
                    {new Date(product.productDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <div>{product.productSummary}</div>
                  <div>{product.productPrice}</div>
                </>
              );
            })}
          </>
        ) : (
          "완료"
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
